import { redirect } from 'next/navigation';

export default async function AuthorizationAliasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/authorisation`);
}
