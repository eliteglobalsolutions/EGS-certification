export type SceneVariant = 'featured' | 'academic' | 'personal' | 'company' | 'inbound' | 'route';

function sceneCopy(variant: SceneVariant) {
  switch (variant) {
    case 'academic':
      return {
        title: 'Academic review scene',
        caption: 'Degree, transcript, and My eQuals files framed as a clean review pack.',
      };
    case 'personal':
      return {
        title: 'Personal document scene',
        caption: 'Civil records and supporting papers arranged as an intake-ready set.',
      };
    case 'company':
      return {
        title: 'Company file scene',
        caption: 'Corporate records, registry extracts, and drafting notes framed as a commercial pack.',
      };
    case 'inbound':
      return {
        title: 'Inbound route scene',
        caption: 'Foreign-issued files shown as a cross-border review path before Australian use.',
      };
    case 'route':
      return {
        title: 'Route-check scene',
        caption: 'Checklist-led scene for route questions, review flags, and intake preparation.',
      };
    default:
      return {
        title: 'Editorial guide scene',
        caption: 'Clean editorial illustration for route review, document prep, and intake readiness.',
      };
  }
}

export function EditorialSceneGraphic({
  variant,
  className = '',
}: {
  variant: SceneVariant;
  className?: string;
}) {
  const copy = sceneCopy(variant);

  return (
    <figure className={`editorial-scene ${className}`.trim()}>
      <div className="editorial-scene-frame" aria-hidden="true">
        <svg
          className="editorial-scene-svg"
          viewBox="0 0 720 460"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="720" height="460" fill="#F6F4EE" />
          <rect x="38" y="36" width="644" height="388" rx="20" fill="#FBFAF6" stroke="#D8D7D1" />
          <rect x="72" y="72" width="576" height="316" rx="18" fill="#F0EFEA" />
          <rect x="108" y="118" width="214" height="182" rx="12" fill="#FFFFFF" stroke="#D7D8DA" />
          <rect x="130" y="148" width="126" height="14" rx="7" fill="#16263F" fillOpacity=".14" />
          <rect x="130" y="176" width="142" height="10" rx="5" fill="#16263F" fillOpacity=".08" />
          <rect x="130" y="198" width="112" height="10" rx="5" fill="#16263F" fillOpacity=".08" />
          <rect x="130" y="220" width="94" height="10" rx="5" fill="#16263F" fillOpacity=".08" />
          <rect x="356" y="104" width="228" height="150" rx="18" fill="#E5EBF0" />
          <rect x="384" y="132" width="172" height="96" rx="12" fill="#FCFCFB" stroke="#CBD4DD" />
          <rect x="402" y="150" width="136" height="10" rx="5" fill="#3C597A" fillOpacity=".2" />
          <rect x="402" y="174" width="116" height="10" rx="5" fill="#3C597A" fillOpacity=".12" />
          <rect x="402" y="198" width="88" height="10" rx="5" fill="#3C597A" fillOpacity=".12" />
          <rect x="356" y="284" width="168" height="34" rx="17" fill="#132744" />
          <rect x="542" y="284" width="84" height="34" rx="17" fill="#EEF2F6" stroke="#D1D7DF" />
          <rect x="112" y="328" width="188" height="16" rx="8" fill="#BBC8D6" fillOpacity=".48" />
          <circle cx="612" cy="126" r="22" fill="#D9E3EA" />
          <circle cx="612" cy="126" r="10" fill="#7F98B3" fillOpacity=".42" />
          {variant === 'academic' ? (
            <>
              <rect x="86" y="86" width="74" height="18" rx="9" fill="#E2E8EF" />
              <rect x="500" y="316" width="94" height="42" rx="12" fill="#F6E8C7" />
              <rect x="514" y="330" width="64" height="8" rx="4" fill="#8E6E2F" fillOpacity=".25" />
            </>
          ) : null}
          {variant === 'personal' ? (
            <>
              <rect x="86" y="86" width="82" height="18" rx="9" fill="#F0E5E0" />
              <rect x="516" y="112" width="78" height="112" rx="10" fill="#FFF8F4" stroke="#E5D7D0" />
              <rect x="530" y="138" width="48" height="48" rx="8" fill="#DAB6A5" fillOpacity=".4" />
            </>
          ) : null}
          {variant === 'company' ? (
            <>
              <rect x="86" y="86" width="96" height="18" rx="9" fill="#DFE7E2" />
              <rect x="506" y="102" width="84" height="130" rx="10" fill="#F6FAF8" stroke="#D3DED8" />
              <rect x="520" y="128" width="56" height="12" rx="6" fill="#335C47" fillOpacity=".18" />
              <rect x="520" y="152" width="48" height="12" rx="6" fill="#335C47" fillOpacity=".12" />
            </>
          ) : null}
          {variant === 'inbound' ? (
            <>
              <rect x="86" y="86" width="102" height="18" rx="9" fill="#E6E2F0" />
              <path d="M522 162H604" stroke="#7D6AA8" strokeWidth="6" strokeLinecap="round" />
              <path d="M590 148L604 162L590 176" stroke="#7D6AA8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </>
          ) : null}
          {variant === 'route' ? (
            <>
              <rect x="86" y="86" width="92" height="18" rx="9" fill="#E6ECE9" />
              <circle cx="388" cy="302" r="7" fill="#A1B3C3" />
              <circle cx="416" cy="302" r="7" fill="#A1B3C3" />
              <circle cx="444" cy="302" r="7" fill="#132744" />
            </>
          ) : null}
          {variant === 'featured' ? (
            <>
              <rect x="86" y="86" width="110" height="18" rx="9" fill="#E4EBF2" />
              <rect x="522" y="124" width="56" height="56" rx="14" fill="#EAF0F6" />
              <rect x="540" y="142" width="20" height="20" rx="5" fill="#132744" fillOpacity=".18" />
            </>
          ) : null}
        </svg>
      </div>
      <figcaption className="editorial-scene-caption">
        <strong>{copy.title}</strong>
        <span>{copy.caption}</span>
      </figcaption>
    </figure>
  );
}
