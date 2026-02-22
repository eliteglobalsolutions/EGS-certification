import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <main>
          <div className="card">
            <h1>EGS 文件交付系统</h1>
            <p className="small">全流程线上自助：支付后自动建单、查询、补件、交付。</p>
            <nav>
              <Link href="/order/track">订单查询</Link> | <Link href="/order/upload">上传补充材料</Link> |{' '}
              <Link href="/admin/orders">管理后台</Link>
            </nav>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
