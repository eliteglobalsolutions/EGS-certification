import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { resolveLocale } from '@/lib/i18n/locale';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);

  return buildPageMetadata({
    locale,
    path: '/post-documents',
    title: locale === 'zh' ? '邮寄文件办理' : 'Post Your Documents',
    description:
      locale === 'zh'
        ? '了解邮寄文件办理前的 checklist、联系客服 double check 的方式，以及 EGS 的邮寄地址和联系电话。'
        : 'Checklist before posting your documents, how to double-check with EGS, and the mailing address and phone details for postal handling.',
    keywords: locale === 'zh'
      ? ['邮寄文件办理', '文件邮寄受理', 'EGS 邮寄地址', '邮寄文件给我们']
      : ['post documents to us', 'postal document handling', 'mailing address EGS', 'post your documents'],
  });
}

export default async function PostDocumentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const isZh = locale === 'zh';

  return (
    <Container>
      <Section>
        <div className="stack-lg">
          <Card className="card-main">
            <div className="stack-md">
              <p className="kicker">{isZh ? '邮寄办理' : 'Postal handling'}</p>
              <h1>{isZh ? 'Post your documents to us' : 'Post your documents to us'}</h1>
              <p className="body-text">
                {isZh
                  ? '如果你的文件需要原件处理、湿签、原件核验，或你更希望走邮寄办理，可以先按这页的 checklist 准备，再联系 EGS double check，确认后再寄出。'
                  : 'If your file needs original handling, wet-sign execution, original review, or you simply prefer postal handling, use this checklist first and contact EGS for a final double-check before posting.'}
              </p>
              <div className="actions">
                <Link className="btn btn-secondary" href={`/${locale}#route-checker`}>
                  {isZh ? 'Check My Route' : 'Check My Route'}
                </Link>
                <Link className="btn btn-primary" href={`/${locale}/intake`}>
                  {isZh ? 'Begin Intake' : 'Begin Intake'}
                </Link>
              </div>
            </div>
          </Card>

          <div className="stack-md">
            <Card className="card-sub">
              <div className="stack-sm">
                <p className="kicker">{isZh ? 'Step 1' : 'Step 1'}</p>
                <h2>{isZh ? '先确认文件和使用要求' : 'Confirm the document and use requirements first'}</h2>
                <ul className="samples-bullet-list">
                  <li>
                    {isZh
                      ? '把你要在海外使用的文件、用途国家和用途场景先整理清楚。'
                      : 'Identify the document you need to use overseas, the destination country, and the intended use.'}
                  </li>
                  <li>
                    {isZh
                      ? '请确认服务类型是 Apostille 还是 Legalisation。'
                      : 'Confirm whether the route is Apostille or Legalisation.'}
                  </li>
                  <li>
                    {isZh
                      ? '不同 notary / lawyer 的 statement 和 supporting requirements 可能不一样，不要只按旧模板寄件。'
                      : 'Notarial statements and supporting requirements can vary between notaries and lawyers, so do not rely on an old template alone.'}
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="card-sub">
              <div className="stack-sm">
                <p className="kicker">{isZh ? 'Step 2' : 'Step 2'}</p>
                <h2>{isZh ? '如需要，可先把扫描件发给我们 double check' : 'Optional: send us a scan first for a double-check'}</h2>
                <p className="small-text">
                  {isZh
                    ? '这一步是可选的，但如果你不确定路线、材料或是否适合邮寄办理，建议先把扫描件或清晰照片发给我们。我们可以先帮你 double check 路径、supporting documents，以及是否还要补护照复印件、supporting pages 或 authority pages。'
                    : 'This step is optional, but if you are unsure about the route, supporting documents, or whether postal handling is suitable, send us a scan or clear photo first. We can then help double-check the route, supporting documents, and whether a passport copy, supporting pages, or authority pages should also be included.'}
                </p>
                <ul className="samples-bullet-list">
                  <li>WhatsApp: +61 402 344 990</li>
                  <li>WeChat ID: Eliteglobalsolutions</li>
                  <li>Instagram: @Eliteglobalsolution</li>
                  <li>Email: info@eliteglobalsolutions.co</li>
                </ul>
              </div>
            </Card>

            <Card className="card-sub">
              <div className="stack-sm">
                <p className="kicker">{isZh ? 'Step 3' : 'Step 3'}</p>
                <h2>{isZh ? '把文件装好再寄出' : 'Pack the file properly before posting'}</h2>
                <ul className="samples-bullet-list">
                  <li>
                    {isZh
                      ? '把文件放入防水文件袋或 file holder，再装入邮寄包装，尽量避免运输过程中受潮、折损或边角磨损。'
                      : 'Place the file in a waterproof document sleeve or file holder before packing it for post, to reduce the risk of moisture damage, bending, or corner wear in transit.'}
                  </li>
                  <li>
                    {isZh
                      ? '包裹内建议附上姓名、邮箱、联系电话和用途说明。'
                      : 'Include your name, email, phone number, and intended use inside the parcel.'}
                  </li>
                  <li>
                    {isZh
                      ? '境内回邮通常使用 Australia Post，国际回邮通常使用 DHL。'
                      : 'Domestic return is usually handled by Australia Post and overseas return is usually handled by DHL.'}
                  </li>
                </ul>
              </div>
            </Card>
          </div>

          <Card className="card-main">
            <div className="stack-sm">
              <p className="kicker">{isZh ? 'Step 4' : 'Step 4'}</p>
              <h2>{isZh ? '邮寄时请写明以下信息' : 'Please address the parcel using the details below'}</h2>
              <div className="postal-address-block">
                <div className="postal-address-line"><strong>ELITE GLOBAL SOLUTIONS PTY LTD</strong></div>
                <div className="postal-address-line">PO Box 97</div>
                <div className="postal-address-line">Edgecliff NSW 2027</div>
                <div className="postal-address-line">Australia</div>
                <div className="postal-address-line">Phone: 1300 990 666</div>
              </div>
              <div className="stack-xs">
                <p className="small-text">
                  {isZh
                    ? '我们不接受邮寄现金，不建议寄送高价值物品。对于邮寄中的遗失、延误或第三方承运风险，我们不作保证。'
                    : 'We do not accept mailing cash and we do not recommend sending high-value items. We do not guarantee against loss, delay, or third-party carrier risk in transit.'}
                </p>
                <p className="small-text">
                  {isZh
                    ? '寄出后请保留并上传 tracking number。如果你准备寄送原件、法院文件、湿签文件或多份组合件，请先联系我们确认包装和受理方式。最终是否接受、是否还需补件，仍以实际 review 为准。'
                    : 'Keep and upload your tracking number after posting. If you are posting originals, court papers, wet-sign documents, or grouped files, contact us first to confirm packaging and handling. Final acceptance and any extra document requests remain subject to review.'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </Container>
  );
}
