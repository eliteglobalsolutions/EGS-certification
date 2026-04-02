import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/api/',
        '/en/',
        '/zh/',
        '/portal/',
        '/cn/portal/',
        '/app/',
        '/cn/app/',
        '/order/new',
        '/order/success',
        '/order/upload',
        '/order/track',
        '/cn/order/new',
        '/cn/order/success',
        '/cn/order/upload',
        '/cn/order/track',
        '/track',
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
