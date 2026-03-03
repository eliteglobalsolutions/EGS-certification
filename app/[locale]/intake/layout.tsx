import type { Metadata } from 'next';
import { resolveLocale } from '@/lib/i18n/locale';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eliteglobalsolutions.co';

  if (locale === 'zh') {
    return {
      title: '开始受理｜国际文件认证下单｜EGS Certification',
      description: '在线提交文件认证需求，先确认路径，再进入受理与支付流程。',
      keywords: ['开始下单 文件认证', '海牙认证 下单', '领事认证 下单', '澳洲 文件认证 下单'],
      alternates: { canonical: `${siteUrl}/zh/intake` },
    };
  }

  return {
    title: 'Begin Intake | Apostille & Legalisation Order | EGS Certification',
    description: 'Start secure intake for apostille and legalisation. Confirm route, upload files, and proceed to payment.',
    keywords: ['start apostille order', 'legalisation intake form', 'document authentication order'],
    alternates: { canonical: `${siteUrl}/en/intake` },
  };
}

export default function IntakeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
