import { redirect } from 'next/navigation';

export default async function LegacyOrderSuccessRedirect({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (Array.isArray(value)) {
      value.forEach((v) => qs.append(key, v));
    } else if (typeof value === 'string') {
      qs.set(key, value);
    }
  }
  const suffix = qs.toString() ? `?${qs.toString()}` : '';
  redirect(`/${locale}/portal/success${suffix}`);
}
