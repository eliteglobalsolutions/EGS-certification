export function TickerStrip({ locale }: { locale: 'en' | 'zh' }) {
  const items = locale === 'zh'
    ? ['悉尼总部协调', '120+ 个司法管辖区', '付款前确认路径', '安全文件受理', '澳大利亚及海外文件', 'DFAT 协调办理', 'DHL 国际处理', '领事及海牙认证路径']
    : ['Sydney HQ Coordination', '120+ Jurisdictions', 'Route Confirmed Before Payment', 'Secure Document Intake', 'Australia-Issued & Overseas Documents', 'DFAT Coordination', 'DHL International Handling', 'Consular & Apostille Pathways'];

  return (
    <div className="ticker-strip" aria-hidden="true">
      <div className="ticker-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
