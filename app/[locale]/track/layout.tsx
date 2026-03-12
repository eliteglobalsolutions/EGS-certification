import type { Metadata } from 'next';
import { resolveLocale } from '@/lib/i18n/locale';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);

  if (locale === 'zh') {
    return buildPageMetadata({
      locale,
      path: '/track',
      title: '订单查询｜文件认证进度跟踪｜EGS Verification',
      description: '输入订单号查看客户可见状态、预计时效和最近更新。',
      keywords: ['订单查询', '认证进度查询', '海牙认证 进度', '文件认证 跟踪'],
    });
  }

  return buildPageMetadata({
    locale,
    path: '/track',
    title: 'Track Order | Apostille & Legalisation Status | EGS Verification',
    description: 'Track your order with code lookup. View status milestones, estimated timeline, and latest update.',
    keywords: ['track apostille order', 'legalisation status', 'order status document authentication'],
  });
}

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return children;
}
