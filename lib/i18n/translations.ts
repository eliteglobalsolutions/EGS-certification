export type Locale = 'en' | 'zh';
export type Dict = Record<string, string>;

export const translations: Record<Locale, Dict> = {
  en: {
    brand: 'EGS Certification', home: 'Home', startOrder: 'Start Order', uploadRequirements: 'Upload & Requirements', trackOrder: 'Track Order', help: 'Help',
    tagline: 'Structured online document certification flow with predictable updates.', disclaimerTitle: 'Service compliance disclaimer',
    disclaimerBody: 'We provide document processing coordination services only. We are not a government agency, consulate, or notary authority. Outcomes and timing depend on third-party institutions.',
    heroTitle: 'Premium online flow for certification orders', heroBody: 'Start your order, upload files with clear requirements, and track every update in one place.', heroCta: 'Get a quote',
    step1: 'Step 1 · Service details', step2: 'Step 2 · Upload files', step3: 'Step 3 · Review & pay', next: 'Next', back: 'Back', restoreDraft: 'Draft restored',
    country: 'Destination country', documentType: 'Document type', speed: 'Processing speed', standard: 'Standard', express: 'Express', whatNext: 'What happens next',
    uploadHint: 'Drag & drop files, click to upload, or use mobile camera capture.', trackHint: 'Lookup by order number and access token to see status timeline and logs.',
    orderNotFound: 'Order not found.', findOrderTips: 'Check your receipt email for order number and access token.', payNow: 'Pay with Stripe', timeline: 'Status timeline', updateLog: 'Update log',
    downloads: 'Downloads', actionRequired: 'Action required', eta: 'Estimated timeline', faqTitle: 'Help & FAQ',
  },
  zh: {
    brand: 'EGS 文件认证', home: '首页', startOrder: '开始下单', uploadRequirements: '上传与材料要求', trackOrder: '订单追踪', help: '帮助',
    tagline: '结构化线上文件认证流程，进度透明可预期。', disclaimerTitle: '服务合规声明',
    disclaimerBody: '我们仅提供文件处理与流程协调服务，不是政府机构、使领馆或公证机关。最终结果与时效取决于第三方机构处理。',
    heroTitle: '高标准线上认证下单体验', heroBody: '在一个页面完成下单、上传材料与进度追踪，关键节点清晰可见。', heroCta: '获取报价',
    step1: '第 1 步 · 服务信息', step2: '第 2 步 · 上传材料', step3: '第 3 步 · 核对并支付', next: '下一步', back: '上一步', restoreDraft: '已恢复草稿',
    country: '目标国家', documentType: '文件类型', speed: '处理速度', standard: '标准', express: '加急', whatNext: '后续流程',
    uploadHint: '支持拖拽上传、点击上传，也可使用手机拍照上传。', trackHint: '输入订单号与访问码即可查看状态时间线与日志。',
    orderNotFound: '未找到订单。', findOrderTips: '请检查收据邮件中的订单号和访问码。', payNow: '使用 Stripe 支付', timeline: '状态时间线', updateLog: '更新日志',
    downloads: '文件下载', actionRequired: '需要处理', eta: '预计时长', faqTitle: '帮助与常见问题',
  },
};
