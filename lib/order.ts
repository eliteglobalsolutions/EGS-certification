import { generateOrderNo } from './format';
import { CERT_OPTIONS, findDestination, resolveRoute } from './catalog';
import {
  getOrderBasePrice,
  getOrderEstimatedWindow,
  inferOrderDocumentProfile,
} from './order-profile';

export type CheckoutPayload = {
  locale: string;
  destinationCountry: string;
  destinationCode?: string;
  issuingCountry?: string;
  routeOverride: 'auto' | 'hague' | 'non';
  serviceLevel: 'standard' | 'express';
  docCategory: 'personal' | 'company';
  documentType: string;
  combineIntoOneNotarialSet?: boolean;
  combinedDocumentNames?: string[];
  combinedDocumentCount?: number;
  documentQuantity: number;
  pages: number;
  submissionMethod?: 'upload' | 'mail_po_box';
  deliveryMethod: 'domestic' | 'intl_dhl';
  latestScannedCopyDeadline?: string;
  certificateType?: string;
  certificateQuantity?: number;
  email: string;
};

export function generateOrderCode(): string {
  return generateOrderNo();
}

function basePricePerDoc(
  route: 'hague' | 'non' | null,
  docCategory: 'personal' | 'company',
  documentType: string,
  issuingCountry?: string,
  serviceLevel?: 'standard' | 'express',
): number {
  // Country-specific overrides are applied first where available.
  if (!route) return 0;
  const profile = inferOrderDocumentProfile(docCategory, documentType);
  const countrySpecific = getOrderBasePrice({
    issuingCountry,
    route,
    profile,
    serviceLevel,
  });
  if (countrySpecific) {
    return countrySpecific;
  }
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

function combinedSetSurcharge(
  combineIntoOneNotarialSet: boolean | undefined,
  combinedDocumentCount: number | undefined,
): number {
  if (!combineIntoOneNotarialSet) return 0;
  const extraCount = Math.max(0, combinedDocumentCount || 0);
  return extraCount * 150;
}

function postageSurcharge(
  deliveryMethod: 'domestic' | 'intl_dhl',
): number {
  return deliveryMethod === 'domestic' ? 15 : 88;
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

  const base = basePricePerDoc(route, payload.docCategory, payload.documentType, payload.issuingCountry, payload.serviceLevel);
  // Page increase follows the original tiered pricing model.
  const pageExtra = pagesSurchargePerDoc(pageCount);
  const certificateUnit = certificateUnitPrice(payload.certificateType);
  const postageAud = postageSurcharge(payload.deliveryMethod);
  const combinedSetAud = combinedSetSurcharge(payload.combineIntoOneNotarialSet, payload.combinedDocumentCount);

  // Base price is per document copy. Adjustments include page tiers and optional certificate support.
  const subtotalAud = base * q;
  const pageAdjustmentAud = pageExtra * q;
  const certificateTotalAud = certificateUnit * Math.max(0, payload.certificateQuantity || 0);
  const serviceFeeAud = pageAdjustmentAud + certificateTotalAud + postageAud + combinedSetAud;
  const totalAud = subtotalAud + serviceFeeAud;

  const hasCertificateApplication = (payload.certificateType && payload.certificateType !== 'none')
    && Math.max(0, payload.certificateQuantity || 0) > 0;
  const isZh = payload.locale === 'zh';
  const hagueEta = isZh ? '3-7 个工作日（不含邮寄与节假日）' : '3-7 business days (excluding shipping and public holidays)';
  const nonHagueEta = isZh ? '10-20 个工作日' : '10-20 business days';

  const countryEta =
    getOrderEstimatedWindow({
      issuingCountry: payload.issuingCountry,
      route,
      profile: inferOrderDocumentProfile(payload.docCategory, payload.documentType),
      serviceLevel: payload.serviceLevel,
    });
  let estimatedDays = countryEta || (route === 'non' ? nonHagueEta : hagueEta);
  if (hasCertificateApplication && !countryEta) estimatedDays = nonHagueEta;

  return {
    subtotal: subtotalAud * 100,
    serviceFee: serviceFeeAud * 100,
    total: totalAud * 100,
    currency: 'aud',
    estimatedDays,
    resolvedRoute: route,
  };
}
