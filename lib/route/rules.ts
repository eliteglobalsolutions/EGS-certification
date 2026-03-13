import { findCountry } from '@/lib/countries.server';
import { HCCH_APOSTILLE_STATUS_CHECKED_AT } from '@/lib/hague-codes';

export type RouteEstimateInput = {
  locale?: 'en' | 'zh';
  issuingCountry: string;
  destinationCountry: string;
  documentType: string;
  quantity: number;
  translationRequired: boolean;
  originalHandling: boolean;
  speed: 'standard' | 'express';
  haguePreference?: 'hague' | 'non_hague' | 'unsure';
};

export type RouteEstimateResult = {
  routeType: 'apostille' | 'consular_legalisation' | 'needs_review';
  routeLabel: string;
  summary: string;
  issuingCountryMatched: string;
  destinationCountryMatched: string;
  issuingHagueStatus: string;
  destinationHagueStatus: string;
  requiredItems: string[];
  steps: string[];
  etaRange: string;
  riskNotes: string[];
  complianceNote: string;
};

export function estimateRoute(input: RouteEstimateInput): RouteEstimateResult {
  const isZh = input.locale === 'zh';
  const issuing = findCountry(input.issuingCountry);
  const destination = findCountry(input.destinationCountry);
  const issuingMatched = issuing ? (isZh ? issuing.zh : issuing.en) : input.issuingCountry || '-';
  const destinationMatched = destination ? (isZh ? destination.zh : destination.en) : input.destinationCountry || '-';
  const autoRoute =
    issuing && destination
      ? issuing.hague && destination.hague
        ? 'apostille'
        : 'consular_legalisation'
      : null;

  const routeType =
    autoRoute
      ? autoRoute
      : input.haguePreference === 'hague'
      ? 'apostille'
      : input.haguePreference === 'non_hague'
        ? 'consular_legalisation'
        : 'needs_review';

  const routeLabel =
    routeType === 'apostille'
      ? isZh ? '海牙 Apostille 路径' : 'Apostille route'
      : routeType === 'consular_legalisation'
        ? isZh ? '领馆认证路径' : 'Consular legalisation route'
        : isZh ? '需要人工复核路径' : 'Route requires specialist review';

  const requiredItems = [
    isZh ? '有效身份证件' : 'Valid photo ID',
    isZh ? `${input.documentType || '文件'}扫描件` : `${input.documentType || 'Document'} scans`,
    `${isZh ? '签发地' : 'Issuing country'}: ${issuingMatched}`,
    `${isZh ? '使用地' : 'Destination country'}: ${destinationMatched}`,
    ...(input.translationRequired ? [isZh ? '翻译要求说明' : 'Translation requirement details'] : []),
    ...(input.originalHandling ? [isZh ? '原件处理说明' : 'Original document handling instructions'] : []),
  ];

  const steps = [
    isZh ? '先做路径判断与文件筛查' : 'Route check and document screening',
    isZh ? '确认材料要求并锁定受理范围' : 'Requirement confirmation and intake lock',
    isZh ? '按合规路径协调递交' : 'Submission coordination with authorised channels',
    isZh ? '状态更新与最终交付安排' : 'Status updates and delivery / pickup finalisation',
  ];

  const etaRange =
    routeType === 'apostille'
      ? input.speed === 'express'
        ? isZh ? '预计 2-5 个工作日' : 'Estimated 2-5 business days'
        : isZh ? '预计 5-10 个工作日' : 'Estimated 5-10 business days'
      : routeType === 'consular_legalisation'
        ? input.speed === 'express'
          ? isZh ? '预计 8-15 个工作日' : 'Estimated 8-15 business days'
          : isZh ? '预计 12-25 个工作日' : 'Estimated 12-25 business days'
        : isZh ? '需在确认路径后给出预计时效' : 'Estimated timeline provided after route confirmation';

  const riskNotes = [
    isZh ? '正式办理前会再次确认最终路径。' : 'Final route is confirmed before processing.',
    isZh ? '时效仅为估计，受主管机关排队影响。' : 'Timelines are estimates and may vary by authority queues.',
    isZh ? '最终决定由相关第三方主管机关作出。' : 'Decisions are made by relevant third-party authorities.',
  ];

  const hagueYes = isZh ? '海牙成员（Apostille Convention 已生效）' : 'Hague member (Apostille Convention in force)';
  const hagueNo = isZh ? '目前不是已生效的海牙 Apostille 成员' : 'Not currently in force as a Hague Apostille member';
  const hagueUnknown = isZh ? '未自动匹配到国家，请人工复核' : 'Country not auto-matched, specialist review needed';

  return {
    routeType,
    routeLabel,
    issuingCountryMatched: issuingMatched,
    destinationCountryMatched: destinationMatched,
    issuingHagueStatus: issuing ? (issuing.hague ? hagueYes : hagueNo) : hagueUnknown,
    destinationHagueStatus: destination ? (destination.hague ? hagueYes : hagueNo) : hagueUnknown,
    summary:
      routeType === 'apostille'
        ? isZh
          ? '根据当前签发地与使用地，系统自动判断更可能进入 Apostille 路径。'
          : 'Likely Apostille pathway based on the current issuing and destination countries.'
        : routeType === 'consular_legalisation'
          ? isZh
            ? '根据当前签发地与使用地，系统自动判断更可能进入领馆认证路径。'
            : 'Likely consular legalisation pathway based on the current issuing and destination countries.'
          : isZh
            ? '当前输入未能完成自动国家匹配，建议人工复核后再进入正式办理。'
            : 'Current inputs could not be fully auto-matched, so specialist route confirmation is recommended.',
    requiredItems,
    steps,
    etaRange,
    riskNotes,
    complianceNote:
      isZh
        ? `海牙成员状态参考 HCCH Apostille status table，已按 ${HCCH_APOSTILLE_STATUS_CHECKED_AT} 校对。EGS 为独立行政协调服务商，正式办理前仍会确认最终路径。`
        : `Hague membership is checked against the HCCH Apostille status table as reviewed on ${HCCH_APOSTILLE_STATUS_CHECKED_AT}. EGS acts as an independent administrative intermediary and the final route is confirmed before processing.`,
  };
}
