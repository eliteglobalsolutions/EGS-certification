import crypto from 'crypto';
import type { Locale } from '@/lib/i18n/dictionaries';

export const TOS_VERSION = '2026-03-01';
export const PRIVACY_VERSION = '2026-03-01';
export const AUTH_VERSION = '2026-03-01';

const LEGAL_CONTENT = {
  en: {
    tos: `TERMS OF SERVICE
Elite Global Solutions

Effective Date: 01/03/2026

Parties and Legal Status

1.1 These Terms of Service ("Terms") govern the provision of services by Elite Global Solutions ("EGS", "we", "us", "our") to the customer ("Customer", "you").

1.2 EGS is an independent administrative document coordination service provider operating in New South Wales, Australia.

1.3 EGS:

(a) is not a law firm;
(b) is not a public notary;
(c) is not a government authority;
(d) does not provide legal advice or legal representation;
(e) does not certify documents under its own authority;
(f) does not act as an agent of any government body.

1.4 EGS acts solely as an administrative intermediary facilitating document submission, logistics coordination, and communication with relevant third-party authorities where authorised by the Customer.

Acceptance of Terms

2.1 By placing an order, uploading documents, making payment, or otherwise using the platform, the Customer agrees to be legally bound by these Terms.

2.2 Electronic acceptance (including tick-box confirmation and digital signature) constitutes legally binding agreement.

Scope of Services

3.1 EGS provides administrative coordination services relating to document authentication, apostille, legalization, certification, translation coordination, and related processes.

3.2 All governmental determinations, approvals, refusals, or processing decisions are made independently by relevant authorities.

3.3 EGS does not influence, control, or guarantee any governmental or third-party decision.

No Guarantee

4.1 EGS does not guarantee:

(a) approval or acceptance of any document;
(b) processing timeframes;
(c) regulatory continuity;
(d) outcome of any submission;
(e) uninterrupted platform availability.

4.2 Customer acknowledges that regulatory frameworks, procedural requirements, and processing standards may change without notice.

Customer Representations and Warranties

The Customer represents and warrants that:

(a) all documents submitted are genuine and lawfully obtained;
(b) all information supplied is accurate, complete, and not misleading;
(c) the Customer has lawful authority to submit the documents;
(d) no fraudulent, unlawful, or deceptive conduct exists.

5.1 Provision of false, misleading, altered, or forged documents constitutes material breach and may result in immediate termination and referral to authorities.

Online Platform Usage Compliance

Customer agrees to:

(a) maintain confidentiality of login credentials;
(b) refrain from impersonation or identity misuse;
(c) not upload forged, altered, or unlawfully obtained documents;
(d) not interfere with platform security or operations;
(e) comply with all applicable laws.

EGS may suspend or terminate access where misuse is reasonably suspected.

Physical Document Handling and Risk Allocation

7.1 Courier and Postal Dispatch

Where documents are dispatched via courier or postal services:

(a) risk of loss or damage transfers upon handover to the carrier;
(b) EGS acts solely as logistics coordinator;
(c) Customer is responsible for insurance unless expressly arranged otherwise in writing.

7.2 In-Person Pickup or Drop-Off

Risk transfers upon physical handover to the Customer or designated carrier.

7.3 EGS is not liable for:

(a) courier delays;
(b) customs intervention;
(c) postal loss;
(d) governmental seizure;
(e) events beyond reasonable control.

Fees and Payment

8.1 Service fees cover administrative handling unless otherwise specified.

8.2 Government, notary, translation, courier, and third-party fees may apply separately.

8.3 Once processing has commenced, service fees are generally non-refundable except as required under Australian Consumer Law.

Chargeback and Payment Disputes

9.1 Customer agrees to first raise any dispute in writing before initiating a chargeback.

9.2 If a chargeback is initiated after services have commenced, EGS may recover:

(a) administrative costs;
(b) chargeback fees;
(c) payment processor penalties;
(d) reasonable collection costs.

9.3 EGS may rely upon service logs, consent records, IP records, metadata, and communications in responding to payment disputes.

Nothing in this clause limits statutory rights under Australian Consumer Law.

Digital Evidence and Record Keeping

10.1 Customer acknowledges that electronic records maintained in the ordinary course of business constitute prima facie evidence of transactions and acceptance.

Such records include but are not limited to:

(a) server logs;
(b) IP address records;
(c) timestamped consent records;
(d) uploaded file metadata;
(e) payment confirmations;
(f) email and communication logs.

Limitation of Liability

11.1 To the maximum extent permitted by law, EGS's total aggregate liability arising from or in connection with any service is limited to the service fee paid for the relevant order.

11.2 EGS is not liable for:

(a) indirect or consequential loss;
(b) economic loss;
(c) reputational loss;
(d) loss caused by third-party decisions;
(e) regulatory or governmental refusal.

11.3 This clause is subject to Australian Consumer Law.

Indemnity

12.1 Customer indemnifies and holds harmless EGS against any claim, liability, penalty, cost, or damage arising from:

(a) breach of these Terms;
(b) submission of fraudulent or unlawful documents;
(c) misrepresentation;
(d) third-party claims arising from Customer-provided materials.

Force Majeure

EGS is not liable for delay or failure resulting from events beyond reasonable control, including but not limited to:

- government shutdowns
- regulatory changes
- pandemics
- postal or courier disruptions
- natural disasters
- cyber incidents
- civil unrest

Australian Consumer Law

Our services come with guarantees that cannot be excluded under the Australian Consumer Law.

For major failures, you are entitled:

- to cancel your service contract;
- to a refund for the unused portion;
- to compensation for reasonably foreseeable loss.

Nothing in these Terms excludes, restricts, or modifies statutory rights.

Dispute Resolution

15.1 Internal Resolution

Customer must first submit a written complaint with supporting documentation.

15.2 Arbitration

If unresolved within 30 days, either party may refer the dispute to confidential arbitration in New South Wales under applicable commercial arbitration legislation.

Arbitration shall:

(a) be conducted in English;
(b) be before a single arbitrator;
(c) take place in Sydney unless otherwise agreed;
(d) remain confidential except as required by law.

Nothing prevents urgent relief from a competent court.

Regulatory Cooperation

EGS may disclose information where required by law, court order, or lawful regulatory request.

Governing Law and Jurisdiction

These Terms are governed by the laws of New South Wales, Australia.

Subject to arbitration provisions, the courts of New South Wales have exclusive jurisdiction.

Severability

If any provision is found invalid or unenforceable, the remainder of these Terms remains in full force.

Entire Agreement

These Terms constitute the entire agreement between EGS and the Customer and supersede prior communications.`,
    privacy: `PRIVACY POLICY
Effective Date: 01/03/2026

Introduction

This Privacy Policy explains how EGS Certification Pty Ltd ("we", "us", "our") collects, holds, uses, discloses, and protects personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).

This Policy applies to personal information collected through our website, online platforms, order forms, communications, and in connection with the provision of document authentication, apostille coordination, certification support, translation coordination, and related administrative services.

What is Personal Information?

"Personal information" has the meaning given under the Privacy Act 1988 (Cth). It includes information or an opinion about an identified individual, or an individual who is reasonably identifiable.

Personal Information We Collect

We collect personal information reasonably necessary to provide our services. The categories of personal information we may collect include:

3.1 Identity Information
Full name, former names, date of birth, nationality, passport number, driver licence number, and other government-issued identification details required for identity verification.

3.2 Contact Information
Email address, telephone number, residential address, mailing address, and delivery address.

3.3 Document and Service Information
Details relating to documents submitted for processing, including birth certificates, marriage certificates, academic records, police checks, corporate documents, powers of attorney, and other official records.
We may collect scanned copies or digital images of identification documents and official certificates.

3.4 Order and Transaction Information
Order reference numbers, destination country, service level, billing details, transaction identifiers, payment status, and related communications.

3.5 Account Information
Login credentials (if applicable), encrypted password data, account preferences, and order history.

3.6 Payment Information
Payments are processed via third-party payment providers (such as Stripe or PayPal). We do not store full credit card numbers. We may retain transaction identifiers, billing names, and confirmation of payment.

3.7 Communications
Correspondence between you and us, including email communications, enquiry forms, uploaded files, and customer support interactions.

3.8 Technical and Usage Information
IP address, browser type, device information, operating system, access timestamps, referring URLs, cookies, and analytics data relating to website usage.

3.9 Authorisation and Consent Records
Declarations, tick-box confirmations, authorisation forms, and records of consent permitting us to act on your behalf with relevant authorities.

Sensitive Information

Certain documents may contain sensitive information as defined under the Privacy Act, including criminal record information or health information.

We will only collect sensitive information where:

(a) you have provided consent; and
(b) the collection is reasonably necessary for providing our services or required by law.

How We Collect Personal Information

We collect personal information directly from you when you:

- submit an order via our website;
- upload documents;
- complete enquiry or contact forms;
- communicate with us electronically; or
- provide information for identity verification.

We may also receive personal information from third parties where authorised by you, including government departments, courts, registries, legal representatives, or service providers.

Purpose of Collection

We collect and use personal information for the following purposes:

- to provide and administer our services;
- to verify identity;
- to process document authentication and related services;
- to communicate with relevant government authorities, registries, or consulates where authorised;
- to process payments;
- to respond to enquiries and provide customer support;
- to comply with legal and regulatory obligations;
- to manage risk, prevent fraud, and resolve disputes.
- where you submit files by email, to ingest those files into our secure processing systems for service delivery, audit, and compliance.

Disclosure of Personal Information

We may disclose personal information to:

- government departments, registries, courts, and consulates where required for service delivery;
- third-party service providers including payment processors, IT service providers, hosting providers, and document handling partners;
- professional advisers including legal and accounting advisers;
- regulatory authorities where required by law.

Some third-party providers may be located outside Australia. Where we disclose personal information overseas, we take reasonable steps to ensure that the recipient handles the information in a manner consistent with the Australian Privacy Principles.

Data Security

We take reasonable steps to protect personal information from misuse, interference, loss, unauthorised access, modification, or disclosure. These measures include:

- secure hosting environments;
- encryption of data in transit where applicable;
- restricted internal access controls;
- secure document handling procedures.

However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.

Retention of Personal Information

We retain personal information only for as long as reasonably necessary to fulfil the purposes for which it was collected, including to satisfy legal, accounting, regulatory, or reporting obligations.

Unless a longer period is required by law, personal information will ordinarily be retained for a maximum period of seven (7) years from the completion of the relevant service or transaction.

Where personal information is no longer required, we take reasonable steps to securely destroy or de-identify the information.

Access and Correction

You may request access to the personal information we hold about you and request correction of any inaccurate or incomplete information.

Requests should be made in writing to the contact details provided below. We will respond within a reasonable timeframe and may require identity verification before releasing information.

Cookies and Website Analytics

Our website may use cookies and analytics tools to improve functionality and user experience. Cookies may collect technical and usage information but do not ordinarily identify individuals directly.

You may disable cookies through your browser settings, although some website features may not function properly.

Direct Marketing

We may use your contact information to send service-related communications. We will only send marketing communications where permitted by law and you may opt out at any time.

Complaints

If you believe we have breached the Australian Privacy Principles, you may contact us using the details below. We will investigate your complaint and respond within a reasonable timeframe.

If you are not satisfied with our response, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC).

Contact Details

EGS Certification Pty Ltd
ACN 679 782 284
Address: PO Box 97, Edgecliff NSW 2027, Australia
Email: info@eliteglobalsolutions.co
Phone: 1300 990 666

Updates to this Policy

We may update this Privacy Policy from time to time. The latest version will be published on our website with the effective date.`,
    auth: `AUTHORIZATION & CONSENT DEED
Elite Global Solutions

Effective Date: [Auto-Generated Upon Acceptance]

This Deed is made by the Customer in favour of Elite Global Solutions ("EGS").

Nature of Instrument

1.1 This document is executed as a Deed.
1.2 It is binding upon the Customer immediately upon digital acceptance.
1.3 Consideration is acknowledged by the Customer's access to the EGS platform and administrative services.

Irrevocable Authorisation

2.1 The Customer irrevocably authorises EGS to:

(a) receive, review, store, and administratively process submitted documents;
(b) coordinate submission of documents to notaries, registries, government departments, consulates, legalization authorities, or other competent bodies;
(c) communicate with such authorities for administrative purposes;
(d) engage third-party providers (including courier and translation services) where reasonably required;
(e) remit third-party fees where authorised.

2.2 This authorisation is limited strictly to administrative coordination.
2.3 Nothing in this Deed creates a solicitor-client relationship or fiduciary obligation.

Independent Third-Party Decisions

The Customer acknowledges:

(a) all substantive determinations are made independently by relevant authorities;
(b) EGS does not influence, guarantee, or control any outcome;
(c) processing frameworks may change without notice.

Declarations and Warranties

The Customer warrants that:

(a) all documents are genuine and lawfully obtained;
(b) all information supplied is accurate and complete;
(c) the Customer has lawful authority to submit the documents;
(d) no forged, altered, fraudulent, or misleading material has been provided.

Breach of this clause constitutes material breach and may result in termination and referral to authorities.

Consent to Digital Evidence

5.1 The Customer consents to EGS maintaining electronic records in the ordinary course of business.

5.2 The Customer agrees that the following constitute prima facie evidence in any proceeding:

- IP address records
- timestamped consent logs
- metadata of uploaded files
- server logs
- payment processor confirmations
- email and communication records

5.3 The Customer waives objection solely on the basis that such evidence is electronic.

Risk Acknowledgment

The Customer acknowledges:

(a) EGS is not liable for third-party refusals or delays;
(b) courier or postal risk transfers upon handover to carrier;
(c) governmental intervention or regulatory change is beyond EGS control.

Indemnity

The Customer indemnifies EGS against any loss, penalty, or liability arising from:

(a) submission of fraudulent or unlawful documents;
(b) misrepresentation;
(c) third-party claims resulting from Customer materials.

Digital Execution

8.1 This Deed may be executed electronically.
8.2 Tick-box acceptance, digital signature, or payment submission constitutes execution.
8.3 No physical signature is required.

Governing Law

This Deed is governed by the laws of New South Wales, Australia.

Executed as a Deed by digital acceptance.`,
    acl_notice:
      'Our services come with guarantees that cannot be excluded under the Australian Consumer Law. For major failures with the service, you are entitled: (a) to cancel your service contract with us; and (b) to a refund for the unused portion, or to compensation for its reduced value. You are also entitled to be compensated for any other reasonably foreseeable loss or damage. If the failure does not amount to a major failure, you are entitled to have problems with the service rectified in a reasonable time and, if this is not done, to cancel your contract and obtain a refund for the unused portion of the contract.',
  },
  zh: {
    tos: `服务条款
Elite Global Solutions
------------------------------

当事方与法律地位

本《服务条款》（"条款"）适用于 Elite Global Solutions（"EGS"、"我们"）向客户（"客户"、"您"）提供的服务。

EGS 是在澳大利亚新南威尔士州运营的独立行政文件协调服务提供方。

EGS：
- 不是律师事务所；
- 不是公证机构；
- 不是政府机关；
- 不提供法律意见或法律代理；
- 不以自身名义进行官方认证。

EGS 仅作为行政协调中介，协助文件提交并与相关第三方机构进行流程协调。

服务范围

EGS 提供与文件认证、Apostille、领事认证、证明及相关流程有关的行政协调服务。

一切政府机关决定均由相关主管机构独立作出。

不作保证

EGS 不保证：
- 任何文件一定获批或被接受；
- 任何固定处理时效；
- 监管政策持续不变；
- 任何提交结果。

客户确认，监管框架可能在无预先通知的情况下发生变化。

客户陈述与保证

客户保证：
- 所有文件真实且合法取得；
- 所提供信息准确完整；
- 客户有合法权利提交相关文件；
- 不存在欺诈、误导或违法行为。

提供虚假或误导性信息构成重大违约。

线上平台使用合规

客户同意：
- 维护登录凭证保密；
- 不冒充他人或滥用身份；
- 不上传伪造、篡改或非法取得文件；
- 不干扰平台安全或运营。

如合理怀疑存在滥用行为，EGS 可暂停或终止访问。

纸质文件处理与风险分配

通过快递或邮政寄送文件时：
- 文件灭失或损坏风险于交付承运人时转移；
- EGS 仅为物流协调方；
- 除非另有约定，包装与保险由客户负责。

到店自取服务中，风险于实物交付时转移。

对于快递延误、海关干预或超出合理控制范围的事件，EGS 不承担责任。

费用与付款

除非另有说明，服务费覆盖行政处理。政府、公证、翻译及快递费用可能另行收取。

一旦处理开始，服务费原则上不予退还，法律另有规定（包括澳大利亚消费者法）除外。

拒付与支付争议

客户同意，在未先向 EGS 提出书面争议前发起拒付，可能构成违约。

若服务已开始后发起拒付，EGS 可追偿行政成本、拒付手续费及合理追收费用。

EGS 可依赖服务日志、同意记录、IP 记录及沟通记录回应支付争议。

本条款不限制客户在澳大利亚消费者法下的法定权利。

电子证据与记录保存

客户确认，在正常业务过程中形成的电子记录，包括但不限于：
- 服务器日志；
- IP 记录；
- 带时间戳的同意记录；
- 上传文件元数据；
- 支付处理商确认记录；
- 邮件及沟通日志

构成交易与接受事实的初步证据。

对本条款的电子接受具有法律约束力。

责任限制

在法律允许的最大范围内，EGS 的责任限于相关订单已支付的服务费金额。

EGS 不对因第三方决定导致的间接、后果性、经济性或声誉性损失承担责任。

本条受澳大利亚消费者法约束。

澳大利亚消费者法

我们的服务附带澳大利亚消费者法下不可排除的保障。
对于重大服务失败，您有权：
- 取消与我们的服务合同；并且
- 对未使用部分获得退款，或对其价值降低获得补偿。
您亦有权就任何可合理预见的其他损失或损害获得补偿。

本条款不排除、限制或修改您在澳大利亚消费者法下的权利。

争议解决与仲裁

12.1 内部解决
客户应先提交附支持材料的书面投诉。

12.2 仲裁
若 30 日内未解决，任一方可依据适用商事仲裁法律，将争议提交新南威尔士州保密仲裁。

仲裁应：
- 使用英文进行；
- 由一名独任仲裁员审理；
- 除非另有约定，在悉尼进行；
- 除法律要求外保持保密。

任何一方均可向有管辖权法院申请紧急救济。

本条不限制法定消费者权利。

监管合作

如法律、法院命令或合法监管请求要求，EGS 可披露信息。

适用法律

本条款受澳大利亚新南威尔士州法律管辖。`,
    privacy: `隐私政策

引言

EGS 遵守《1988年隐私法》（联邦）。

收集信息

EGS 可能收集身份证明文件、联系方式、地址信息、订单记录及沟通日志。

用途

信息用于身份核验、服务处理、合规管理及记录保存。
如您通过邮箱提交文件，我们可能将该等文件转入安全处理系统，用于履约、审计与合规留存。

披露

在完成服务所必需时，信息可能披露给公证机构、政府机关、使领馆、翻译服务商、快递服务商及海外接收方。

EGS 不出售个人数据。

合规披露

为防止欺诈、监管申报或依法执法需要时，信息可能被披露。

安全

EGS 实施合理的技术与组织安全措施。

保存期限

信息仅在法律与行政需要范围内保留。

访问与投诉

客户可书面申请访问、更正信息或提出隐私投诉。`,
    auth: `授权与同意声明

客户下单即表示：

- 授权 EGS 协调文件提交并与相关机构沟通；
- 接受决定由第三方机构作出且超出 EGS 控制；
- 声明文件真实且合法取得；
- 同意电子记录保存及日志作为证据使用；
- 确认对本条款的电子接受具有法律约束力。`,
    acl_notice:
      '根据澳大利亚消费者法（ACL），本服务包含不可被排除的消费者保障。若服务构成重大失败，你有权：(a) 取消与我们的服务合同；并且 (b) 就未使用部分获得退款，或就其价值降低获得补偿。你也有权就任何可合理预见的其他损失或损害获得补偿。若该失败不构成重大失败，你有权要求我们在合理时间内修复问题；若未在合理时间内完成，你有权取消合同并就未使用部分获得退款。',
  },
} as const;

export function getLegalContent(locale: Locale) {
  return LEGAL_CONTENT[locale];
}

export function sha256(content: string): string {
  return crypto.createHash('sha256').update(content, 'utf8').digest('hex');
}
