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
      path: '/intake',
      title: '开始受理｜国际文件认证下单',
      description: '在线提交文件认证需求，先确认路径，再进入受理与支付流程。',
      keywords: ['开始下单 文件认证', '海牙认证 下单', '领事认证 下单', '澳洲 文件认证 下单'],
    });
  }

  return buildPageMetadata({
    locale,
    path: '/intake',
    title: 'Begin Intake | Apostille & Legalisation Order',
    description: 'Start secure intake for apostille and legalisation. Confirm route, upload files, and proceed to payment.',
    keywords: ['start apostille order', 'legalisation intake form', 'document authentication order'],
  });
}

export default function IntakeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
