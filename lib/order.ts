import { generateOrderNo } from './format';
import { CERT_OPTIONS, findDestination, resolveRoute } from './catalog';

export type CheckoutPayload = {
  locale: string;
  destinationCountry: string;
  destinationCode?: string;
  routeOverride: 'auto' | 'hague' | 'non';
  serviceLevel: 'standard' | 'express';
  docCategory: 'personal' | 'company';
  documentType: string;
  documentQuantity: number;
  pages: number;
  deliveryMethod: 'domestic' | 'intl_dhl';
  certificateType?: string;
  certificateQuantity?: number;
  email: string;
};

export function generateOrderCode(): string {
  return generateOrderNo();
}

function basePricePerDoc(route: 'hague' | 'non' | null, docCategory: 'personal' | 'company'): number {
  // Fixed base pricing by route and document category (shipping included).
  if (!route) return 0;
  if (route === 'hague') return docCategory === 'company' ? 880 : 660;
  return docCategory === 'company' ? 980 : 880;
}

function pagesSurchargePerDoc(pages: number): number {
  // Page surcharge tiers:
  // <=3 pages: 0
  // 4-15 pages: +110 AUD
  // >15 pages: +220 AUD
  if (pages <= 3) return 0;
  if (pages <= 15) return 110;
  return 220;
}

function certificateUnitPrice(certificateType?: string): number {
  const matched = CERT_OPTIONS.find((c) => c.key === certificateType);
  return matched ? matched.price : 0;
}

export function estimateOrder(payload: CheckoutPayload): {
  subtotal: number;
  serviceFee: number;
  total: number;
  currency: string;
  estimatedDays: string;
  resolvedRoute: 'hague' | 'non' | null;
} {
  // Keep quantity/pages/certificates in payload for UI and future pricing extensions.
  const q = Math.max(1, payload.documentQuantity || 1);
  const pageCount = Math.max(1, payload.pages || 1);

  const destination = findDestination(payload.destinationCode || payload.destinationCountry);
  const route = resolveRoute(destination, payload.routeOverride);

  const base = basePricePerDoc(route, payload.docCategory);
  // Page increase follows the original tiered pricing model.
  const pageExtra = pagesSurchargePerDoc(pageCount);
  void certificateUnitPrice(payload.certificateType);

  // Fixed base fee by route/category + page surcharge tiers. Shipping remains included.
  const subtotalAud = base;
  const serviceFeeAud = pageExtra;
  void q;
  const totalAud = subtotalAud + serviceFeeAud;

  const hasCertificateApplication = (payload.certificateType && payload.certificateType !== 'none')
    && Math.max(0, payload.certificateQuantity || 0) > 0;
  const isZh = payload.locale === 'zh';
  const hagueEta = isZh ? '3-7 个工作日（不含邮寄与节假日）' : '3-7 business days (excluding shipping and public holidays)';
  const nonHagueEta = isZh ? '10-20 个工作日' : '10-20 business days';

  let estimatedDays = hagueEta;
  if (route === 'non' || hasCertificateApplication) estimatedDays = nonHagueEta;

  return {
    subtotal: subtotalAud * 100,
    serviceFee: serviceFeeAud * 100,
    total: totalAud * 100,
    currency: 'aud',
    estimatedDays,
    resolvedRoute: route,
  };
}
