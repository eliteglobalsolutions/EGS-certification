import crypto from 'crypto';
import type { Locale } from '@/lib/i18n/dictionaries';

export const TOS_VERSION = '2026-03-01';
export const PRIVACY_VERSION = '2026-03-01';
export const AUTH_VERSION = '2026-03-01';

const LEGAL_CONTENT = {
  en: {
    tos: `
**Elite Global Solutions Pty Ltd**
ABN 98 679 782 284
185–187 Liverpool Street, Sydney NSW 2000, Australia
info@eliteglobalsolutions.co | eliteglobalsolutions.co

Version: 2026-03 | Effective date: 1 March 2026

---

## 1. About These Terms

1.1 These Terms of Service ("Terms") govern your access to and use of the website located at eliteglobalsolutions.co, the EGS Verification mobile application ("App"), and all related services (collectively, the "Platform") provided by Elite Global Solutions Pty Ltd ABN 98 679 782 284 ("EGS", "we", "us", "our").

1.2 By accessing the Platform, submitting an enquiry, creating an account, uploading documents, or making a payment, you agree to be bound by these Terms in full.

1.3 If you do not agree to these Terms, you must not use the Platform.

1.4 These Terms are to be read together with our Privacy Policy and the Client Authorisation Notice, each of which forms part of your agreement with us.

---

## 2. Nature of Services

2.1 EGS provides **administrative coordination services** for the authentication, apostille, and legalisation of documents ("Services"). This includes coordinating submissions to relevant government departments, notarial practitioners, consular offices, and other competent authorities on behalf of clients.

2.2 EGS is an **independent administrative intermediary only**. EGS is not a law firm, solicitor, legal practitioner, notary public, or government authority.

2.3 Nothing in these Terms, on the Platform, or in any communication from EGS constitutes legal advice. If you require legal advice, you should consult a qualified legal practitioner.

2.4 All substantive decisions regarding the acceptance, processing, or rejection of documents are made independently by the relevant government authorities, consulates, or registries. EGS does not control, influence, or guarantee any outcome.

2.5 EGS services are subject to the Australian Consumer Law ("ACL") as set out in Schedule 2 of the Competition and Consumer Act 2010 (Cth). Nothing in these Terms excludes, restricts, or modifies any right or remedy you have under the ACL.

---

## 3. Eligibility and Account Registration

3.1 You must be at least 18 years of age to use the Platform.

3.2 To access certain features of the Platform, including submitting an application, you must create a registered account. You agree to provide accurate, current, and complete information during registration and to keep your account details up to date.

3.3 You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must notify us immediately at info@eliteglobalsolutions.co if you suspect unauthorised access to your account.

3.4 We reserve the right to suspend or terminate accounts that provide false or misleading information, or where we reasonably suspect misuse of the Platform.

---

## 4. Scope of Engagement

4.1 An engagement with EGS begins upon your submission of a completed intake form and is confirmed only when EGS issues a written fee schedule and route confirmation, and payment is received in full.

4.2 No authority submission will be made until payment has been received and confirmed.

4.3 The scope of each engagement is limited to the document types, issuing jurisdiction, destination jurisdiction, and processing pathway specified in the written fee schedule. Any change to scope requires a new written confirmation and may attract additional fees.

4.4 EGS may decline to accept an engagement at its reasonable discretion, including where documents appear to be incomplete, irregular, or where the requested pathway cannot be confirmed.

---

## 5. Client Obligations

5.1 You warrant that all documents, information, and materials submitted to EGS are genuine, complete, accurate, and lawfully obtained.

5.2 You warrant that you have the legal authority to submit the documents and to authorise EGS to act on your behalf in relation to those documents.

5.3 You must not submit any document that is forged, altered, fraudulent, obtained under duress, or otherwise unlawful.

5.4 You are responsible for ensuring that the intended use of any document complies with the laws of the destination country and the requirements of the receiving authority.

5.5 EGS is not responsible for any rejection, delay, or adverse outcome arising from inaccurate, incomplete, or unlawful information provided by you.

---

## 6. Fees and Payment

6.1 All fees are set out in the written fee schedule issued by EGS following document review. The fee schedule constitutes the binding fee agreement for that engagement.

6.2 Fees include EGS coordination fees, third-party authority fees (where applicable), and courier charges as itemised in the fee schedule. No additional charges will be incurred without your prior written agreement.

6.3 All fees are quoted and payable in Australian Dollars (AUD) unless otherwise agreed in writing.

6.4 Payment is due in full prior to the commencement of authority coordination. EGS accepts payment via methods made available on the Platform from time to time.

6.5 Authority fees remitted to government bodies are non-refundable once submitted, regardless of outcome.

6.6 EGS coordination fees are refundable in the following circumstances only:
  - (a) EGS has not yet commenced coordination following payment; or
  - (b) EGS has failed to perform the agreed coordination through its own fault.

6.7 Refund requests must be submitted in writing to info@eliteglobalsolutions.co within 14 days of the relevant circumstance arising.

---

## 7. Timelines and Estimates

7.1 All turnaround times provided by EGS are estimates only and do not constitute a guarantee of delivery.

7.2 Processing timelines are subject to authority queue conditions, the availability of consular appointments, courier transit times, and other factors beyond EGS's control.

7.3 EGS will communicate any known delays as soon as reasonably practicable.

7.4 Time is not of the essence in relation to the performance of Services unless expressly agreed in writing.

---

## 8. Document Handling

8.1 EGS will handle original documents submitted by clients with reasonable care.

8.2 Risk of loss or damage to original documents passes to the courier upon handover for domestic or international dispatch.

8.3 EGS recommends that clients retain certified copies of all original documents submitted for processing.

8.4 EGS will return original documents to the address specified at intake upon completion of the engagement, unless alternative instructions are provided in writing.

8.5 Where original documents are lost or damaged while in EGS's direct custody (not in transit), EGS's liability is limited to the reasonable cost of obtaining replacement documents.

---

## 9. Limitation of Liability

9.1 To the maximum extent permitted by law, EGS's total liability to you for any claim arising out of or in connection with the Services or these Terms is limited to the total amount of EGS coordination fees paid by you in respect of the relevant engagement.

9.2 EGS is not liable for:
  - (a) any decision, refusal, or delay by a government authority, consulate, registry, or other third party;
  - (b) loss arising from inaccurate or incomplete information provided by the client;
  - (c) consequential, indirect, special, or incidental loss of any kind, including loss of income, loss of opportunity, or reputational damage;
  - (d) loss arising from circumstances beyond EGS's reasonable control, including regulatory changes, governmental action, postal or courier failure, or force majeure events.

9.3 Nothing in these Terms excludes or limits liability that cannot be excluded or limited under the ACL, including liability for death or personal injury caused by negligence, or for fraudulent misrepresentation.

---

## 10. Intellectual Property

10.1 All content on the Platform, including text, guides, process documentation, design, and software, is owned by or licensed to EGS and is protected by copyright and other intellectual property laws.

10.2 You may access and use content on the Platform for your personal, non-commercial use only. You must not reproduce, republish, redistribute, or commercialise any content without EGS's prior written consent.

10.3 You retain ownership of documents and materials you submit to EGS. By submitting materials, you grant EGS a limited licence to use those materials solely for the purpose of performing the Services.

---

## 11. Privacy

11.1 EGS collects, uses, and discloses personal information in accordance with the Privacy Policy available at eliteglobalsolutions.co/legal/privacy.

11.2 By using the Platform, you consent to EGS's collection and handling of your personal information as described in the Privacy Policy.

11.3 Where required for the processing of your matter, your personal information may be disclosed to overseas authorities, consulates, or third-party service providers. Full details are set out in the Privacy Policy.

---

## 12. Third-Party Services

12.1 The Platform may engage third-party providers including courier companies, translation services, notarial practitioners, and payment processors. EGS will exercise reasonable care in the selection of such providers.

12.2 EGS is not responsible for the acts or omissions of independent third-party providers once documents or information have been handed over to them in accordance with the engagement.

12.3 The Platform may contain links to third-party websites. EGS does not endorse and is not responsible for the content, accuracy, or practices of any third-party website.

---

## 13. Suspension and Termination

13.1 EGS may suspend or terminate your access to the Platform, or decline to proceed with an engagement, if:
  - (a) you breach any provision of these Terms;
  - (b) EGS has reason to believe that documents or information submitted are fraudulent, forged, or otherwise unlawful;
  - (c) you engage in conduct that is abusive, threatening, or disruptive toward EGS staff;
  - (d) EGS is required to do so by law or a competent authority.

13.2 Upon termination, any fees paid in respect of services not yet commenced will be refunded. Fees in respect of services already performed or third-party costs already incurred are non-refundable.

---

## 14. Disputes

14.1 If you have a complaint about the Services, please contact us in the first instance at info@eliteglobalsolutions.co. We will acknowledge your complaint within 2 business days and aim to resolve it within 10 business days.

14.2 If a dispute cannot be resolved through direct negotiation, either party may refer the dispute to mediation administered by a mutually agreed mediator in Sydney, New South Wales, before commencing any legal proceedings.

14.3 These Terms are governed by the laws of New South Wales, Australia. Each party submits to the non-exclusive jurisdiction of the courts of New South Wales.

---

## 15. Changes to These Terms

15.1 EGS may update these Terms from time to time. Material changes will be notified by posting a revised version on the Platform and updating the effective date.

15.2 Your continued use of the Platform after a change takes effect constitutes your acceptance of the revised Terms. If you do not agree to a revised version, you must cease using the Platform.

---

## 16. General

16.1 **Entire agreement.** These Terms, together with the Privacy Policy and Client Authorisation Notice, constitute the entire agreement between you and EGS in relation to the Platform and Services and supersede all prior representations, arrangements, or agreements.

16.2 **Severability.** If any provision of these Terms is found to be invalid, unlawful, or unenforceable, that provision will be severed and the remaining provisions will continue in full force and effect.

16.3 **Waiver.** A failure by EGS to exercise or enforce any right or provision of these Terms does not constitute a waiver of that right or provision.

16.4 **Assignment.** You may not assign or transfer any rights or obligations under these Terms without EGS's prior written consent. EGS may assign its rights and obligations to a related entity or successor without your consent.

16.5 **No agency.** Nothing in these Terms creates a partnership, joint venture, agency, or fiduciary relationship between you and EGS.

---

*Elite Global Solutions Pty Ltd ABN 98 679 782 284 — eliteglobalsolutions.co — info@eliteglobalsolutions.co*`,
    privacy: `
**Elite Global Solutions Pty Ltd**
ABN 98 679 782 284
185–187 Liverpool Street, Sydney NSW 2000, Australia
info@eliteglobalsolutions.co | eliteglobalsolutions.co

Version: 2026-03 | Effective date: 1 March 2026

---

## 1. Our Commitment

Elite Global Solutions Pty Ltd ABN 98 679 782 284 ("EGS", "we", "us", "our") is committed to protecting the privacy of individuals who use our website (eliteglobalsolutions.co), mobile application ("App"), and related services (collectively, the "Platform").

This Privacy Policy describes how we collect, use, hold, and disclose personal information in accordance with the *Privacy Act 1988* (Cth) and the Australian Privacy Principles ("APPs").

By using the Platform, you consent to the collection and handling of your personal information as described in this Policy.

---

## 2. What Personal Information We Collect

2.1 We may collect the following categories of personal information:

**Identity and contact information**
- Full legal name
- Email address
- Phone number
- Residential or postal address
- Country of residence
- Passport or government-issued photo identification

**Transaction and service information**
- Document type, issuing country, and destination country submitted during intake
- Order reference numbers and engagement history
- Fee schedules and payment records
- Instructions and correspondence relating to your matter

**Technical and usage information**
- IP address and device identifiers
- Browser type, operating system, and App version
- Pages visited, features accessed, and session timestamps
- Cookies and similar tracking technologies (see Section 9)

**Communications**
- Messages sent through the Platform's in-app messaging system
- Email correspondence with EGS staff
- Feedback and reviews submitted

2.2 We do not collect sensitive information (as defined under the Privacy Act) unless it is directly relevant to the services you have engaged us to perform and you have consented to its collection.

2.3 Where you provide personal information about a third party (for example, a document owner who is not the person placing the order), you confirm that you have obtained that person's consent to provide their information to us and for us to handle it in accordance with this Policy.

---

## 3. How We Collect Personal Information

3.1 We collect personal information directly from you when you:
- create an account on the Platform;
- submit an intake form or application;
- upload documents or identification;
- make a payment;
- contact us by email, phone, or through the Platform's messaging system;
- submit a review or feedback.

3.2 We may also collect information automatically through your use of the Platform via cookies, server logs, and analytics tools.

3.3 We do not collect personal information from third parties without your knowledge, except where permitted or required by law.

---

## 4. Why We Collect and Use Personal Information

4.1 We collect and use personal information for the following purposes:

**Service delivery**
- To assess your enquiry and confirm the appropriate processing pathway
- To coordinate the authentication, apostille, or legalisation of your documents with relevant authorities
- To communicate with government departments, consulates, registries, notarial practitioners, and courier providers on your behalf
- To issue fee schedules, process payments, and manage order fulfilment

**Account management**
- To create and maintain your account on the Platform
- To verify your identity where required

**Communication**
- To respond to your enquiries, provide status updates, and send notifications relating to your matter
- To send administrative communications about the Platform or your account

**Legal and compliance obligations**
- To maintain records as required by law
- To detect, investigate, and prevent fraud or unlawful conduct
- To comply with applicable laws and regulatory requirements

**Platform improvement**
- To analyse usage patterns and improve the functionality, security, and user experience of the Platform

4.2 We will not use your personal information for direct marketing purposes without your express consent. If you consent and later wish to opt out, you may do so at any time by contacting us at info@eliteglobalsolutions.co.

---

## 5. Disclosure of Personal Information

5.1 We may disclose your personal information to the following categories of recipients:

**Government authorities and official bodies**
- Where required for the processing of your matter, we may disclose your personal information and documents to the Department of Foreign Affairs and Trade (DFAT), State and Territory registries, consular offices, embassies, and other competent authorities.

**Third-party service providers**
- Courier and logistics providers (for document dispatch)
- Certified translation services (where engaged as part of your order)
- Notarial practitioners or legal practitioners (where required for document preparation)
- Payment processing providers (for secure payment handling)
- Cloud storage and IT infrastructure providers

**Professional advisers**
- Legal, accounting, or other professional advisers engaged by EGS, subject to obligations of confidentiality.

**Law enforcement and regulatory bodies**
- Where required or authorised by law, or where we are compelled to do so by a court order, subpoena, or other legal process.

5.2 We do not sell, rent, or trade your personal information to third parties for commercial purposes.

5.3 Where we engage third-party service providers, we take reasonable steps to ensure they handle personal information in a manner consistent with this Policy.

---

## 6. Overseas Disclosure

6.1 In the course of providing Services, your personal information and documents may be disclosed to recipients located outside Australia, including:
- Consular offices and government authorities in the destination country
- Courier providers operating internationally
- Cloud infrastructure providers whose servers may be located in various jurisdictions

6.2 We take reasonable steps to ensure that overseas recipients handle personal information in a manner that is consistent with the Australian Privacy Principles. However, you acknowledge that it may not always be practicable to require overseas government authorities to comply with Australian privacy standards.

6.3 By using the Platform and engaging EGS to coordinate the processing of your matter, you consent to the disclosure of your personal information to overseas recipients as described in this Section.

---

## 7. Data Security

7.1 We take reasonable technical and organisational measures to protect personal information from misuse, interference, loss, and unauthorised access, modification, or disclosure.

7.2 These measures include, where appropriate:
- Encrypted transmission of data over HTTPS
- Access controls limiting staff access to personal information on a need-to-know basis
- Secure storage of authentication credentials using industry-standard encryption
- Regular review of our security practices

7.3 While we take reasonable precautions, no system of data transmission or storage can be guaranteed to be completely secure. If you suspect that your personal information has been compromised, please contact us immediately at info@eliteglobalsolutions.co.

7.4 In the event of a data breach that is likely to result in serious harm to affected individuals, we will notify affected individuals and the Office of the Australian Information Commissioner (OAIC) in accordance with the Notifiable Data Breaches scheme under the Privacy Act.

---

## 8. Retention of Personal Information

8.1 We retain personal information for as long as is necessary to fulfil the purposes for which it was collected, or as required by law.

8.2 Engagement records, including correspondence, fee schedules, and document processing records, are generally retained for a minimum of 7 years following the completion of an engagement, in accordance with Australian record-keeping requirements.

8.3 Account information is retained for the duration of your account and for a reasonable period following account closure or inactivity, unless a longer retention period is required by law.

8.4 When personal information is no longer required, we will take reasonable steps to destroy or de-identify it securely.

---

## 9. Cookies and Tracking Technologies

9.1 The Platform uses cookies and similar technologies to enhance your experience, analyse usage, and support Platform functionality.

9.2 Cookies we use may include:
- **Essential cookies** — required for the Platform to function (for example, session authentication)
- **Analytics cookies** — to understand how users interact with the Platform (for example, Google Analytics)
- **Preference cookies** — to remember your language and display settings

9.3 You may configure your browser to refuse cookies or to alert you when cookies are being sent. If you disable certain cookies, some features of the Platform may not function as intended.

9.4 We do not use cookies for targeted advertising purposes.

---

## 10. Your Rights

10.1 Under the Privacy Act and the Australian Privacy Principles, you have the right to:

- **Access** personal information we hold about you;
- **Correct** personal information that is inaccurate, incomplete, or out of date;
- **Complain** about a breach of the Australian Privacy Principles.

10.2 To make an access or correction request, please contact us in writing at info@eliteglobalsolutions.co. We will respond within a reasonable time (generally within 30 days) and will not charge a fee for making a request, although we may charge a reasonable fee for providing access in some circumstances.

10.3 We may decline a request for access or correction in limited circumstances permitted by the Privacy Act, in which case we will provide written reasons.

---

## 11. Complaints

11.1 If you have a complaint about how we have handled your personal information, please contact our Privacy Contact at:

**Email:** info@eliteglobalsolutions.co
**Post:** Privacy Contact, Elite Global Solutions Pty Ltd, 185–187 Liverpool Street, Sydney NSW 2000

11.2 We will acknowledge your complaint within 2 business days and aim to resolve it within 30 days.

11.3 If you are not satisfied with our response, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC):

**Website:** www.oaic.gov.au
**Phone:** 1300 363 992
**Post:** GPO Box 5218, Sydney NSW 2001

---

## 12. Changes to This Policy

12.1 We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal obligations, or other factors. Material changes will be notified by posting a revised version on the Platform with an updated effective date.

12.2 Your continued use of the Platform after changes take effect constitutes your acceptance of the revised Policy.

---

## 13. Contact Us

For all privacy-related enquiries, access requests, or corrections, please contact:

**Elite Global Solutions Pty Ltd**
ABN 98 679 782 284
185–187 Liverpool Street, Sydney NSW 2000, Australia
**Email:** info@eliteglobalsolutions.co
**Website:** eliteglobalsolutions.co

---

*Elite Global Solutions Pty Ltd ABN 98 679 782 284 — eliteglobalsolutions.co — info@eliteglobalsolutions.co*`,
    auth: `
**Elite Global Solutions Pty Ltd**
ABN 98 679 782 284
185–187 Liverpool Street, Sydney NSW 2000, Australia
info@eliteglobalsolutions.co | eliteglobalsolutions.co

Version: 2026-03 | Effective date: 1 March 2026

---

## Important Notice

This Client Authorisation Notice ("Notice") sets out the terms on which you authorise Elite Global Solutions Pty Ltd ABN 98 679 782 284 ("EGS") to act on your behalf in the coordination of document authentication, apostille, and legalisation services.

**Please read this Notice carefully before proceeding.** By completing our intake process, submitting payment, or digitally accepting these terms, you confirm that you have read, understood, and agreed to the authorisations and declarations set out below.

This Notice is to be read together with the EGS Terms of Service and Privacy Policy.

---

## 1. Nature of EGS and Scope of Authorisation

1.1 EGS is an **independent administrative coordination service**. EGS is not a law firm, legal practitioner, solicitor, notary public, justice of the peace, or government authority.

1.2 EGS does not provide legal advice. Nothing in this Notice, on our Platform, or in any communication from EGS constitutes legal advice. If you require legal advice, you should seek independent legal counsel.

1.3 EGS's role is limited to coordinating the administrative processing of documents with relevant authorities on your behalf. EGS does not make any substantive determination regarding the validity, content, or legal effect of any document.

---

## 2. Your Authorisation

By proceeding with an engagement, you authorise EGS to:

2.1 receive, review, store, and process documents and personal information submitted by you for the purpose of providing the agreed Services;

2.2 coordinate the submission of your documents to any relevant authority or body required for processing, including without limitation:
- the Department of Foreign Affairs and Trade (DFAT) of Australia;
- State and Territory registry offices and issuing authorities;
- consulates, embassies, and consular sections of foreign governments located in Australia or overseas;
- legalisation and apostille authorities in the relevant jurisdiction;
- notarial practitioners or legal practitioners where required as a preparatory step;

2.3 communicate with the above authorities and bodies on your behalf for administrative coordination purposes;

2.4 engage third-party service providers where reasonably required, including:
- domestic and international courier providers;
- certified translation services;
- secure document storage and handling providers;

2.5 remit third-party authority fees, courier charges, and other disbursements on your behalf where expressly authorised in the written fee schedule.

2.6 This authorisation is strictly limited to administrative coordination. It does not authorise EGS to provide legal advice, make representations about the legal effect of any document, or take any action outside the agreed scope of the engagement.

---

## 3. Acknowledgment of EGS's Role and Limitations

You acknowledge and agree that:

3.1 all substantive decisions regarding the acceptance, processing, refusal, or certification of documents are made independently by the relevant government authorities, consulates, or other competent bodies, and EGS has no ability to influence, direct, or guarantee any such decision;

3.2 EGS does not guarantee any particular outcome, including the acceptance of documents by a receiving authority, the approval of any visa or immigration application, the recognition of any qualification, or any other downstream consequence of document processing;

3.3 processing timelines are determined by the relevant authority and are subject to change without notice; EGS's stated timeframes are estimates only;

3.4 regulatory requirements, including the requirements of the Hague Convention, consular legalisation processes, and individual authority requirements, may change from time to time; EGS will communicate known changes but is not responsible for regulatory changes that occur after confirmation of your engagement;

3.5 the laws of the destination country and the requirements of the receiving authority are the ultimate determinants of whether your documents will be accepted.

---

## 4. Your Declarations and Warranties

You declare and warrant that:

4.1 you are the lawful owner of, or have lawful authority to submit, all documents provided to EGS;

4.2 all documents submitted are genuine, unaltered, and have not been obtained by fraud, misrepresentation, or unlawful means;

4.3 all information you have provided to EGS in connection with your engagement is accurate, complete, and not misleading;

4.4 you have not knowingly provided any forged, altered, fraudulent, or otherwise unlawful document or information to EGS;

4.5 your intended use of the document complies with the laws of the destination country and the requirements of the receiving authority;

4.6 you will promptly notify EGS if any information you have provided becomes inaccurate or incomplete.

4.7 You acknowledge that a breach of any warranty in this Section 4 constitutes a material breach of your agreement with EGS, may result in immediate termination of the engagement without refund, and may be referred to relevant authorities where EGS is required or permitted by law to do so.

---

## 5. Consent to Records and Electronic Evidence

5.1 You consent to EGS maintaining electronic records of your engagement in the ordinary course of business, including records of document submissions, communications, payment transactions, access logs, and system metadata.

5.2 You agree that the following categories of electronic records constitute reliable evidence of the matters they record and may be relied upon by EGS in any dispute resolution process or legal proceeding:
- timestamped intake and acceptance logs;
- IP address and device records associated with account activity;
- metadata associated with uploaded files;
- payment processor confirmations and transaction records;
- server logs and access records;
- email, in-app message, and written communication records.

5.3 You agree not to challenge the admissibility of such records solely on the grounds that they are in electronic form.

---

## 6. Disclosure to Overseas Recipients

6.1 In the course of performing Services, EGS may disclose your personal information and documents to recipients located outside Australia, including consular authorities, government bodies, and courier providers in the relevant destination jurisdiction.

6.2 By authorising EGS to coordinate your matter, you consent to such overseas disclosure where it is necessary for the performance of the Services.

6.3 EGS will take reasonable steps to ensure that overseas recipients handle your information appropriately, but acknowledges that it may not always be practicable to require overseas government authorities to comply with Australian privacy standards.

---

## 7. Risk Acknowledgment

You acknowledge that:

7.1 EGS is not liable for any refusal, delay, or adverse determination made by a third-party authority, consulate, registry, or government body;

7.2 risk of loss or damage to original documents passes to the carrier upon handover to a courier or postal service for dispatch;

7.3 EGS's liability to you for any loss or damage while documents are in EGS's direct custody is limited to the reasonable cost of obtaining replacement documents;

7.4 circumstances beyond EGS's reasonable control — including regulatory changes, governmental action, postal or courier failure, natural disasters, and other force majeure events — may affect the delivery of Services, and EGS is not liable for delays or failures caused by such circumstances.

---

## 8. Indemnity

8.1 You agree to indemnify and hold harmless EGS, its directors, officers, employees, and contractors from and against any claim, loss, damage, penalty, fine, or liability (including reasonable legal costs) arising from or in connection with:

- (a) your submission of fraudulent, forged, altered, or otherwise unlawful documents or information;
- (b) your breach of any warranty or obligation under this Notice or the Terms of Service;
- (c) any third-party claim arising from the documents or information you have provided to EGS.

---

## 9. How This Authorisation Is Executed

9.1 This Notice may be accepted electronically. Your acceptance is constituted by any one of the following:
- ticking an acceptance checkbox on the Platform;
- completing and submitting the intake form;
- making payment for the agreed Services;
- any other written or digital confirmation that you agree to the terms of your engagement with EGS.

9.2 No physical signature is required for this Notice to be binding.

9.3 This Notice takes effect from the date of your acceptance and continues for the duration of your engagement with EGS.

---

## 10. Governing Law

This Notice is governed by the laws of New South Wales, Australia. Any dispute arising under or in connection with this Notice is subject to the non-exclusive jurisdiction of the courts of New South Wales.

---

## Contact

If you have any questions about this Notice, please contact:

**Elite Global Solutions Pty Ltd**
ABN 98 679 782 284
185–187 Liverpool Street, Sydney NSW 2000, Australia
**Email:** info@eliteglobalsolutions.co
**Website:** eliteglobalsolutions.co

---

*Elite Global Solutions Pty Ltd ABN 98 679 782 284 — eliteglobalsolutions.co — info@eliteglobalsolutions.co*`,
    acl_notice:
      'Our services come with guarantees that cannot be excluded under the Australian Consumer Law. For major failures with the service, you are entitled: (a) to cancel your service contract with us; and (b) to a refund for the unused portion, or to compensation for its reduced value. You are also entitled to be compensated for any other reasonably foreseeable loss or damage. If the failure does not amount to a major failure, you are entitled to have problems with the service rectified in a reasonable time and, if this is not done, to cancel your contract and obtain a refund for the unused portion of the contract.',
  },
  zh: {
    tos: `
**Elite Global Solutions Pty Ltd**
ABN 98 679 782 284
澳大利亚新南威尔士州悉尼市利物浦街185–187号，邮编2000
info@eliteglobalsolutions.co | eliteglobalsolutions.co

版本：2026-03 | 生效日期：2026年3月1日

---

## 1. 关于本条款

1.1 本服务条款（"本条款"）规范您访问及使用位于 eliteglobalsolutions.co 的网站、EGS Verification 手机应用程序（"App"）及相关服务（统称"平台"）的方式，上述平台均由 Elite Global Solutions Pty Ltd ABN 98 679 782 284（"EGS"、"我们"）提供。

1.2 通过访问本平台、提交咨询、创建账户、上传文件或完成付款，您即表示同意完整接受本条款的约束。

1.3 如您不同意本条款，请勿使用本平台。

1.4 本条款应与我们的《隐私政策》及《客户授权声明》一并阅读，上述文件共同构成您与我们之间的协议。

---

## 2. 服务性质

2.1 EGS 提供**行政协调服务**，涵盖文件认证、Apostille公证认证及领馆认证的协调处理（"服务"）。具体包括代表客户向相关政府部门、公证从业者、领事馆及其他主管机构提交协调申请。

2.2 EGS 仅为**独立行政中间协调机构**。EGS 不是律师事务所、律师、法律从业者、公证人或政府机构。

2.3 本条款、本平台或 EGS 的任何通讯内容均不构成法律意见。如您需要法律意见，请咨询具有资质的法律从业者。

2.4 有关文件受理、处理或拒绝的所有实质性决定，均由相关政府机构、领事馆或注册机构独立作出。EGS 无法控制、影响或保证任何结果。

2.5 EGS 的服务受澳大利亚《2010年竞争与消费者法》（联邦）附表2规定的澳大利亚消费者法（"ACL"）约束。本条款中的任何内容均不排除、限制或变更您在 ACL 下享有的任何权利或救济。

---

## 3. 资格要求与账户注册

3.1 使用本平台须年满18周岁。

3.2 访问本平台的某些功能（包括提交申请）须创建注册账户。您同意在注册时提供准确、真实、完整的信息，并保持账户信息的持续更新。

3.3 您负责维护账户凭据的保密性，并对账户下发生的所有活动承担责任。如您怀疑账户遭到未经授权的访问，须立即通过 info@eliteglobalsolutions.co 通知我们。

3.4 我们保留暂停或终止提供虚假或误导性信息账户的权利，或在合理怀疑存在平台滥用时采取相应措施。

---

## 4. 委托范围

4.1 与 EGS 的委托关系自您提交完整接收表单时开始，并仅在 EGS 出具书面费用确认单及路线确认书、且收到全额付款后正式确认。

4.2 在收到并确认付款之前，不会向任何机构提交文件。

4.3 每项委托的范围仅限于书面费用确认单所载明的文件类型、签发地管辖区、目的地管辖区及处理路径。任何范围变更须重新出具书面确认，并可能产生额外费用。

4.4 EGS 可在合理自由裁量权范围内拒绝接受委托，包括文件不完整、存在异常情况或无法确认所申请路径的情形。

---

## 5. 客户义务

5.1 您保证提交给 EGS 的所有文件、信息及材料均真实、完整、准确，且系依法取得。

5.2 您保证您拥有提交上述文件的合法权限，并有权授权 EGS 就该等文件代表您行事。

5.3 您不得提交任何伪造、篡改、欺诈、在胁迫下取得或其他违法的文件。

5.4 您有责任确保文件的预期用途符合目的地国家的法律及接收机构的要求。

5.5 EGS 不对因您提供不准确、不完整或违法信息所导致的任何拒绝、延误或不利结果承担责任。

---

## 6. 费用与付款

6.1 所有费用以 EGS 在文件审查后出具的书面费用确认单为准。费用确认单构成该项委托的具有约束力的费用协议。

6.2 费用包括 EGS 协调费、适用的第三方机构费用及费用确认单中列明的快递费用。未经您事先书面同意，不会产生任何额外费用。

6.3 除另有书面约定外，所有费用以澳大利亚元（AUD）报价及支付。

6.4 费用须在开始机构协调前足额付清。EGS 接受平台上不时提供的付款方式。

6.5 已提交至政府机构的机构费用一经提交，无论结果如何，概不退还。

6.6 仅在以下情形下，EGS 协调费方可退还：
  - （a）付款后 EGS 尚未开始协调；或
  - （b）EGS 因自身原因未能履行约定的协调服务。

6.7 退款申请须在相关情形发生后14天内以书面形式提交至 info@eliteglobalsolutions.co。

---

## 7. 时间安排与预估

7.1 EGS 提供的所有处理时间均为预估，不构成交付保证。

7.2 处理周期受制于机构排队情况、领事预约可用性、快递运输时间及其他 EGS 无法控制的因素。

7.3 EGS 将在合理可行的情况下尽快告知任何已知延误。

7.4 除经书面明确约定外，时间不构成服务履行的必要条件。

---

## 8. 文件处理

8.1 EGS 将以合理谨慎的态度处理客户提交的原件文件。

8.2 原件文件在国内或国际快递交接时，灭失或损坏风险即转移至快递公司。

8.3 EGS 建议客户在提交原件处理前自行留存经认证的副本。

8.4 除另有书面说明外，EGS 将在委托完成后将原件文件寄回接收表单所载地址。

8.5 如原件文件在 EGS 直接保管期间（非运输途中）发生灭失或损坏，EGS 的责任以补办原件文件的合理费用为限。

---

## 9. 责任限制

9.1 在法律允许的最大范围内，EGS 就与服务或本条款相关的任何索赔所承担的总责任，以您就相关委托实际支付给 EGS 的协调费总额为限。

9.2 EGS 不对以下情形承担责任：
  - （a）政府机构、领事馆、注册机构或其他第三方作出的任何决定、拒绝或延误；
  - （b）因客户提供不准确或不完整信息所导致的损失；
  - （c）任何形式的间接、特殊或附带损失，包括收入损失、机会损失或声誉损害；
  - （d）因 EGS 合理控制范围之外的情形所导致的损失，包括法规变更、政府行动、邮政或快递故障，或不可抗力事件。

9.3 本条款中的任何内容均不排除或限制依据 ACL 无法排除或限制的责任，包括因疏忽导致死亡或人身伤害的责任，或欺诈性失实陈述的责任。

---

## 10. 知识产权

10.1 平台上的所有内容，包括文字、指南、流程文档、设计及软件，均为 EGS 所有或经授权使用，受著作权及其他知识产权法律保护。

10.2 您仅可为个人非商业用途访问和使用平台内容。未经 EGS 事先书面同意，您不得复制、转载、再分发或商业化利用任何内容。

10.3 您保留对提交给 EGS 的文件及材料的所有权。通过提交材料，您授予 EGS 仅为履行服务目的使用该等材料的有限许可。

---

## 11. 隐私

11.1 EGS 依据 eliteglobalsolutions.co/legal/privacy 上提供的《隐私政策》收集、使用及披露个人信息。

11.2 使用本平台即表示您同意 EGS 按《隐私政策》所述方式收集和处理您的个人信息。

11.3 在处理您的事项所必需时，您的个人信息可能被披露给境外机构、领事馆或第三方服务提供商。详细内容见《隐私政策》。

---

## 12. 第三方服务

12.1 平台可能使用第三方服务提供商，包括快递公司、翻译服务、公证从业者及支付处理商。EGS 将在选择此类服务提供商时尽到合理谨慎的义务。

12.2 对于依据委托将文件或信息移交后，独立第三方服务提供商的作为或不作为，EGS 不承担责任。

12.3 本平台可能包含第三方网站链接。EGS 不认可任何第三方网站，亦不对其内容、准确性或做法承担责任。

---

## 13. 暂停与终止

13.1 在以下情形下，EGS 可暂停或终止您访问平台的权限，或拒绝推进委托：
  - （a）您违反本条款任何条款；
  - （b）EGS 有理由相信所提交的文件或信息存在欺诈、伪造或其他违法情形；
  - （c）您对 EGS 员工采取辱骂、威胁或破坏性行为；
  - （d）EGS 依法或依主管机关要求被迫如此。

13.2 终止后，尚未开始服务部分的已付费用将予退还。已履行服务或已产生第三方费用部分不予退还。

---

## 14. 争议解决

14.1 如您对服务有投诉，请优先通过 info@eliteglobalsolutions.co 与我们联系。我们将在2个工作日内确认收到您的投诉，并争取在10个工作日内予以解决。

14.2 如争议无法通过直接协商解决，任何一方均可在提起法律程序前，将争议提交至双方共同商定的调解员，在澳大利亚新南威尔士州悉尼进行调解。

14.3 本条款受澳大利亚新南威尔士州法律管辖。各方服从新南威尔士州法院的非专属管辖权。

---

## 15. 条款变更

15.1 EGS 可不时更新本条款。重大变更将通过在平台上发布修订版本并更新生效日期的方式予以通知。

15.2 变更生效后继续使用本平台，即表示您接受修订后的条款。如您不同意修订版本，须停止使用本平台。

---

## 16. 一般条款

16.1 **完整协议。** 本条款连同《隐私政策》及《客户授权声明》，构成您与 EGS 之间就平台及服务所达成的完整协议，并取代此前的所有陈述、安排或协议。

16.2 **可分割性。** 如本条款任何条款被认定为无效、违法或不可执行，该条款将被剔除，其余条款继续完全有效。

16.3 **弃权。** EGS 未行使或执行本条款任何权利或条款，不构成对该权利或条款的放弃。

16.4 **转让。** 未经 EGS 事先书面同意，您不得转让本条款项下的任何权利或义务。EGS 可在不经您同意的情况下将其权利和义务转让给关联实体或继承方。

16.5 **非代理关系。** 本条款中的任何内容均不在您与 EGS 之间构成合伙、合营、代理或信托关系。

---

*Elite Global Solutions Pty Ltd ABN 98 679 782 284 — eliteglobalsolutions.co — info@eliteglobalsolutions.co*`,
    privacy: `
**Elite Global Solutions Pty Ltd**
ABN 98 679 782 284
澳大利亚新南威尔士州悉尼市利物浦街185–187号，邮编2000
info@eliteglobalsolutions.co | eliteglobalsolutions.co

版本：2026-03 | 生效日期：2026年3月1日

---

## 1. 我们的承诺

Elite Global Solutions Pty Ltd ABN 98 679 782 284（"EGS"、"我们"）致力于保护通过我们网站（eliteglobalsolutions.co）、手机应用程序（"App"）及相关服务（统称"平台"）的用户隐私。

本隐私政策说明我们如何依据澳大利亚《1988年隐私法》（联邦）及澳大利亚隐私原则（"APPs"）收集、使用、持有及披露个人信息。

使用本平台即表示您同意我们按本政策所述方式收集和处理您的个人信息。

---

## 2. 我们收集哪些个人信息

2.1 我们可能收集以下类别的个人信息：

**身份及联系信息**
- 法定全名
- 电子邮件地址
- 电话号码
- 居住地址或邮寄地址
- 居住国家
- 护照或政府颁发的带照片身份证件

**交易及服务信息**
- 接收表单中提交的文件类型、签发国及目的地国
- 订单编号及委托历史
- 费用确认单及付款记录
- 与您事项相关的指示及往来函件

**技术及使用信息**
- IP地址及设备标识符
- 浏览器类型、操作系统及App版本
- 访问页面、使用功能及会话时间戳
- Cookie及类似追踪技术（详见第9条）

**通讯信息**
- 通过平台应用内消息系统发送的消息
- 与 EGS 员工的电子邮件往来
- 提交的反馈及评价

2.2 除非直接与您委托我们履行的服务相关且您已同意，否则我们不收集敏感信息（如《隐私法》所定义）。

2.3 如您提供第三方的个人信息（例如，下单人并非文件所有人），您确认已获得该人同意，授权其信息由我们依本政策规定进行处理。

---

## 3. 我们如何收集个人信息

3.1 当您进行以下操作时，我们直接从您处收集个人信息：
- 在平台创建账户；
- 提交接收表单或申请；
- 上传文件或身份证件；
- 完成付款；
- 通过电子邮件、电话或平台消息系统联系我们；
- 提交评价或反馈。

3.2 我们也可能通过 Cookie、服务器日志及分析工具，在您使用平台的过程中自动收集信息。

3.3 除法律允许或要求外，我们不在您不知情的情况下从第三方收集个人信息。

---

## 4. 我们为何收集和使用个人信息

4.1 我们出于以下目的收集和使用个人信息：

**服务履行**
- 评估您的咨询并确认适当的处理路径
- 代表您向相关机构协调文件认证、Apostille公证认证或领馆认证
- 代表您与政府部门、领事馆、注册机构、公证从业者及快递服务商进行沟通
- 出具费用确认单、处理付款及管理订单履行

**账户管理**
- 在平台上创建并维护您的账户
- 在必要时核实您的身份

**沟通联系**
- 回应您的咨询、提供进度更新，以及发送与您事项相关的通知
- 发送有关平台或您账户的行政通讯

**法律及合规义务**
- 依法维护记录
- 发现、调查及防止欺诈或违法行为
- 遵守适用的法律法规要求

**平台改善**
- 分析使用模式，改善平台功能、安全性及用户体验

4.2 未经您明确同意，我们不会将您的个人信息用于直接营销目的。如您同意后希望撤回同意，可随时通过 info@eliteglobalsolutions.co 联系我们。

---

## 5. 个人信息的披露

5.1 我们可能向以下类别的接收方披露您的个人信息：

**政府机构及官方机构**
- 在处理您事项所必需时，我们可能向澳大利亚外交贸易部（DFAT）、州及地区注册机构及签发机构、驻澳或境外领事馆及大使馆，以及其他主管机构披露您的个人信息及文件。

**第三方服务提供商**
- 快递及物流服务商（用于文件派送）
- 经认证的翻译服务（在作为订单组成部分委托时）
- 公证从业者或法律从业者（在作为文件准备步骤所必需时）
- 支付处理服务商（用于安全支付处理）
- 云存储及信息技术基础设施提供商

**专业顾问**
- EGS 委托的法律、会计或其他专业顾问，受保密义务约束。

**执法及监管机构**
- 在法律要求或授权，或法院命令、传票或其他法律程序强制要求时。

5.2 我们不以商业目的向第三方出售、出租或交换您的个人信息。

5.3 在委托第三方服务提供商时，我们采取合理措施确保其以与本政策一致的方式处理个人信息。

---

## 6. 境外披露

6.1 在提供服务过程中，您的个人信息及文件可能被披露给位于澳大利亚境外的接收方，包括：
- 目的地国的领事机构及政府机构
- 在国际范围内运营的快递服务商
- 服务器可能位于不同司法管辖区的云基础设施提供商

6.2 我们采取合理措施确保境外接收方以符合澳大利亚隐私原则的方式处理个人信息。但我们承认，要求境外政府机构遵守澳大利亚隐私标准在实践中并不总是可行。

6.3 通过使用本平台并委托 EGS 协调您事项的处理，您同意在服务履行所必需时，按本条所述向境外接收方披露您的个人信息。

---

## 7. 数据安全

7.1 我们采取合理的技术及组织措施，保护个人信息免受误用、干扰、丢失及未经授权的访问、修改或披露。

7.2 上述措施视情况包括：
- 通过 HTTPS 加密传输数据
- 基于"按需知悉"原则限制员工访问个人信息
- 使用行业标准加密安全存储身份验证凭据
- 定期审查安全实践

7.3 尽管我们采取了合理预防措施，但没有任何数据传输或存储系统能保证完全安全。如您怀疑个人信息已遭泄露，请立即通过 info@eliteglobalsolutions.co 联系我们。

7.4 如发生可能对受影响个人造成严重损害的数据泄露，我们将依据《隐私法》下的可通报数据泄露方案，向受影响个人及澳大利亚信息专员办公室（OAIC）发出通知。

---

## 8. 个人信息的保留

8.1 我们保留个人信息的期限以实现收集目的所必需或法律要求为准。

8.2 依据澳大利亚记录保存要求，委托记录（包括往来函件、费用确认单及文件处理记录）一般在委托完成后至少保留7年。

8.3 账户信息在账户有效期间及账户注销或停用后的合理期限内予以保留，法律要求更长保留期限的除外。

8.4 个人信息不再需要时，我们将采取合理措施安全销毁或去标识化处理。

---

## 9. Cookie及追踪技术

9.1 本平台使用 Cookie 及类似技术以提升您的使用体验、分析使用情况并支持平台功能。

9.2 我们使用的 Cookie 可能包括：
- **必要性 Cookie** — 平台正常运行所需（例如会话身份验证）
- **分析性 Cookie** — 了解用户与平台的交互方式（例如 Google Analytics）
- **偏好性 Cookie** — 记住您的语言及显示设置

9.3 您可配置浏览器拒绝 Cookie 或在发送 Cookie 时发出提醒。如禁用某些 Cookie，平台的部分功能可能无法正常使用。

9.4 我们不将 Cookie 用于定向广告目的。

---

## 10. 您的权利

10.1 依据《隐私法》及澳大利亚隐私原则，您有权：

- **访问**我们持有的关于您的个人信息；
- **更正**不准确、不完整或过时的个人信息；
- **投诉**违反澳大利亚隐私原则的行为。

10.2 如需提出访问或更正申请，请书面联系我们：info@eliteglobalsolutions.co。我们将在合理时间内（一般为30天内）予以答复，提出申请不收取费用，但在某些情况下我们可能就提供访问收取合理费用。

10.3 我们可在《隐私法》允许的有限情形下拒绝访问或更正申请，届时将提供书面说明理由。

---

## 11. 投诉

11.1 如您对我们处理个人信息的方式有投诉，请联系我们的隐私联系人：

**电子邮件：** info@eliteglobalsolutions.co
**邮寄地址：** 隐私联系人收，Elite Global Solutions Pty Ltd，澳大利亚新南威尔士州悉尼市利物浦街185–187号，邮编2000

11.2 我们将在2个工作日内确认收到投诉，并争取在30天内予以解决。

11.3 如您对我们的答复不满意，可向澳大利亚信息专员办公室（OAIC）提出投诉：

**网站：** www.oaic.gov.au
**电话：** 1300 363 992
**邮寄：** GPO Box 5218, Sydney NSW 2001

---

## 12. 本政策的变更

12.1 我们可能不时更新本隐私政策，以反映我们实践、技术、法律义务或其他因素的变化。重大变更将通过在平台上发布修订版本并更新生效日期的方式予以通知。

12.2 变更生效后继续使用本平台，即表示您接受修订后的政策。

---

## 13. 联系我们

如有任何隐私相关咨询、访问申请或更正申请，请联系：

**Elite Global Solutions Pty Ltd**
ABN 98 679 782 284
澳大利亚新南威尔士州悉尼市利物浦街185–187号，邮编2000
**电子邮件：** info@eliteglobalsolutions.co
**网站：** eliteglobalsolutions.co

---

*Elite Global Solutions Pty Ltd ABN 98 679 782 284 — eliteglobalsolutions.co — info@eliteglobalsolutions.co*`,
    auth: `
**Elite Global Solutions Pty Ltd**
ABN 98 679 782 284
澳大利亚新南威尔士州悉尼市利物浦街185–187号，邮编2000
info@eliteglobalsolutions.co | eliteglobalsolutions.co

版本：2026-03 | 生效日期：2026年3月1日

---

## 重要提示

本客户授权声明（"本声明"）规定您授权 Elite Global Solutions Pty Ltd ABN 98 679 782 284（"EGS"）代表您协调办理文件认证、Apostille公证认证及领馆认证服务的相关条款。

**请在继续操作前仔细阅读本声明。** 完成接收流程、提交付款或以电子方式接受本条款，即表示您确认已阅读、理解并同意以下授权及声明。

本声明应与 EGS《服务条款》及《隐私政策》一并阅读。

---

## 1. EGS 的性质及授权范围

1.1 EGS 是一家**独立行政协调服务机构**。EGS 不是律师事务所、法律从业者、律师、公证人、太平绅士或政府机构。

1.2 EGS 不提供法律意见。本声明、我们平台或 EGS 任何通讯中的任何内容均不构成法律意见。如您需要法律意见，应寻求独立法律顾问的意见。

1.3 EGS 的职责仅限于代表您协调与相关机构就文件进行行政处理。EGS 不就任何文件的有效性、内容或法律效力作出任何实质性判断。

---

## 2. 您的授权

通过推进委托，您授权 EGS：

2.1 接收、审查、存储及处理您提交的文件和个人信息，用于提供约定的服务；

2.2 协调将您的文件提交至处理所需的任何相关机构，包括但不限于：
- 澳大利亚外交贸易部（DFAT）；
- 州及地区注册机构及签发机构；
- 驻澳或境外的外国政府领事馆及大使馆；
- 相关司法管辖区的认证及Apostille公证认证机构；
- 在必要时作为准备步骤的公证从业者或法律从业者；

2.3 为行政协调目的，代表您与上述机构进行沟通；

2.4 在合理需要时委托第三方服务提供商，包括：
- 国内及国际快递服务商；
- 经认证的翻译服务；
- 安全文件存储及处理服务商；

2.5 在书面费用确认单中明确授权的情况下，代表您汇缴第三方机构费用、快递费及其他垫付款项。

2.6 本授权严格限于行政协调范围。不授权 EGS 提供法律意见、就任何文件的法律效力作出陈述，或采取任何超出约定委托范围的行动。

---

## 3. 对 EGS 职责及局限性的确认

您确认并同意：

3.1 有关文件受理、处理、拒绝或认证的所有实质性决定，均由相关政府机构、领事馆或其他主管机构独立作出，EGS 无力影响、指导或保证任何此类决定；

3.2 EGS 不保证任何特定结果，包括接收机构对文件的受理、任何签证或移民申请的批准、任何资质的认可，或文件处理的任何其他后续结果；

3.3 处理周期由相关机构决定，可能随时变更；EGS 给出的时间仅为预估；

3.4 法规要求（包括《海牙公约》要求、领馆认证流程及各机构的具体要求）可能不时变更；EGS 将告知已知变更，但对委托确认后发生的法规变化不承担责任；

3.5 目的地国的法律及接收机构的要求，是您的文件能否被受理的最终决定因素。

---

## 4. 您的声明与保证

您声明并保证：

4.1 您是提交给 EGS 的所有文件的合法所有人，或拥有提交这些文件的合法权限；

4.2 提交的所有文件均真实、未经篡改，且非通过欺诈、虚假陈述或违法手段取得；

4.3 您就本次委托提供给 EGS 的所有信息均准确、完整，不存在误导；

4.4 您未明知向 EGS 提供任何伪造、篡改、欺诈或其他违法的文件或信息；

4.5 您对文件的预期用途符合目的地国的法律及接收机构的要求；

4.6 如您提供的任何信息变得不准确或不完整，您将及时通知 EGS。

4.7 您承认，违反本第4条的任何保证构成与 EGS 协议的重大违约，可能导致委托立即终止且不予退款，并在法律要求或允许的情况下向相关机构举报。

---

## 5. 对记录及电子证据的同意

5.1 您同意 EGS 在日常业务过程中以电子方式保存您委托的相关记录，包括文件提交记录、通讯、支付交易、访问日志及系统元数据。

5.2 您同意以下类别的电子记录对其所记录的事项具有可靠的证明力，EGS 可在任何争议解决程序或法律诉讼中依赖这些记录：
- 带时间戳的接收及接受日志；
- 与账户活动关联的IP地址及设备记录；
- 上传文件的元数据；
- 支付处理商确认信息及交易记录；
- 服务器日志及访问记录；
- 电子邮件、应用内消息及书面通讯记录。

5.3 您同意不仅以上述记录为电子形式为由对其可采性提出异议。

---

## 6. 向境外接收方披露

6.1 在履行服务过程中，EGS 可能向位于澳大利亚境外的接收方披露您的个人信息及文件，包括相关目的地司法管辖区的领事机构、政府机构及快递服务商。

6.2 通过授权 EGS 协调您的事项，您同意在服务履行所必需时进行上述境外披露。

6.3 EGS 将采取合理措施确保境外接收方妥善处理您的信息，但承认要求境外政府机构遵守澳大利亚隐私标准在实践中并不总是可行。

---

## 7. 风险确认

您确认：

7.1 EGS 不对第三方机构、领事馆、注册机构或政府机构作出的任何拒绝、延误或不利决定承担责任；

7.2 原件文件在移交快递或邮政服务商派送时，灭失或损坏风险即转移至承运人；

7.3 EGS 就文件在其直接保管期间发生灭失或损坏的责任，以补办原件文件的合理费用为限；

7.4 EGS 合理控制范围之外的情形——包括法规变更、政府行动、邮政或快递故障、自然灾害及其他不可抗力事件——可能影响服务的提供，对于上述情形造成的延误或无法履行，EGS 不承担责任。

---

## 8. 赔偿责任

8.1 您同意就以下事项产生的任何索赔、损失、损害、罚款或责任（包括合理法律费用），向 EGS 及其董事、高管、员工及承包商进行赔偿并使其免受损害：

- （a）您提交欺诈性、伪造、篡改或其他违法的文件或信息；
- （b）您违反本声明或《服务条款》项下的任何保证或义务；
- （c）因您提供给 EGS 的文件或信息引发的第三方索赔。

---

## 9. 本授权的执行方式

9.1 本声明可以电子方式接受。以下任一行为均构成您的接受：
- 在平台上勾选接受复选框；
- 完成并提交接收表单；
- 就约定的服务完成付款；
- 任何其他书面或数字形式确认您同意与 EGS 委托条款。

9.2 本声明生效无需物理签名。

9.3 本声明自您接受之日起生效，并在您与 EGS 委托关系存续期间持续有效。

---

## 10. 适用法律

本声明受澳大利亚新南威尔士州法律管辖。就本声明引起的或与之相关的任何争议，适用新南威尔士州法院的非专属管辖权。

---

## 联系方式

如您对本声明有任何疑问，请联系：

**Elite Global Solutions Pty Ltd**
ABN 98 679 782 284
澳大利亚新南威尔士州悉尼市利物浦街185–187号，邮编2000
**电子邮件：** info@eliteglobalsolutions.co
**网站：** eliteglobalsolutions.co

---

*Elite Global Solutions Pty Ltd ABN 98 679 782 284 — eliteglobalsolutions.co — info@eliteglobalsolutions.co*`,
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
