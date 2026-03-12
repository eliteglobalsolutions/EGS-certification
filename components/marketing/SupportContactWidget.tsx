'use client';

import { useState } from 'react';

export function SupportContactWidget({ locale }: { locale: 'en' | 'zh' }) {
  const [open, setOpen] = useState(false);
  const [wechatCopied, setWechatCopied] = useState(false);
  const whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_LINK;
  const instagramLink = process.env.NEXT_PUBLIC_INSTAGRAM_LINK;
  const wechatLink = process.env.NEXT_PUBLIC_WECHAT_LINK;
  const wechatId = process.env.NEXT_PUBLIC_WECHAT_ID;
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

  const channels = [
    whatsappLink
      ? {
          label: 'WhatsApp',
          href: whatsappLink,
          description: locale === 'zh' ? '快速咨询与文件路线沟通' : 'Quick route and document questions',
        }
      : null,
    instagramLink
      ? {
          label: 'Instagram',
          href: instagramLink,
          description: locale === 'zh' ? '通过 Instagram 私信联系' : 'Reach out by direct message',
        }
      : null,
    wechatLink
      ? {
          label: 'WeChat',
          href: wechatLink,
          description: locale === 'zh' ? '微信联系与跨境文件沟通' : 'WeChat support for cross-border files',
        }
      : null,
    supportEmail
      ? {
          label: 'Email',
          href: `mailto:${supportEmail}`,
          description: supportEmail,
        }
      : null,
  ].filter(Boolean) as Array<{ label: string; href: string; description: string }>;

  const copyWechatId = async () => {
    if (!wechatId) return;
    try {
      await navigator.clipboard.writeText(wechatId);
      setWechatCopied(true);
      window.setTimeout(() => setWechatCopied(false), 1800);
    } catch {
      setWechatCopied(false);
    }
  };

  if (!channels.length && !wechatId) {
    return null;
  }

  return (
    <aside className="support-widget" aria-label={locale === 'zh' ? '联系客服' : 'Contact support'}>
      <button
        aria-controls="support-widget-panel"
        aria-expanded={open}
        className="support-widget-tab"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        {locale === 'zh' ? '联系客服' : 'Contact'}
      </button>

      <div className={`support-widget-shell ${open ? 'support-widget-shell-open' : ''}`} id="support-widget-panel">
        <div className="support-widget-head">
          <p className="kicker">{locale === 'zh' ? '联系支持' : 'Contact support'}</p>
          <h2>{locale === 'zh' ? '需要人工协助？' : 'Need help from our team?'}</h2>
          <p className="small-text">
            {locale === 'zh'
              ? '如果你想直接沟通文件路线、受理准备或订单问题，可以从下面的渠道联系。'
              : 'If you want direct help with route planning, intake preparation, or order questions, use one of the channels below.'}
          </p>
        </div>

        <div className="support-widget-actions">
          {channels.map((channel) => (
            <a className="support-widget-link" href={channel.href} key={channel.label} rel="noreferrer" target="_blank">
              <strong>{channel.label}</strong>
              <span>{channel.description}</span>
            </a>
          ))}

          {wechatId ? (
            <button className="support-widget-link support-widget-copy" onClick={copyWechatId} type="button">
              <strong>WeChat ID</strong>
              <span>{wechatCopied ? (locale === 'zh' ? '已复制到剪贴板' : 'Copied to clipboard') : wechatId}</span>
            </button>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
