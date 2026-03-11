export function AcademicSupportGraphic({
  title,
  subtitle,
  emphasis,
}: {
  title: string;
  subtitle: string;
  emphasis?: string;
}) {
  return (
    <div className="guide-visual-card academic-support-card">
      <div className="academic-support-header">
        <span className="academic-support-badge">EGS</span>
        <strong>{title}</strong>
      </div>
      <div className="academic-support-grid" aria-hidden="true">
        <div className="academic-support-step">
          <span>1</span>
          <strong>Record source</strong>
          <small>issuer PDF / My eQuals / hard copy</small>
        </div>
        <div className="academic-support-step">
          <span>2</span>
          <strong>Receiver wording</strong>
          <small>apostille / authentication / verification</small>
        </div>
        <div className="academic-support-step">
          <span>3</span>
          <strong>Pack check</strong>
          <small>degree + transcript + support files</small>
        </div>
      </div>
      <div className="guide-visual-caption">
        <strong>{subtitle}</strong>
        <span>
          {emphasis ||
            'EGS-designed academic support graphic used to explain what is usually reviewed first in a university-document route.'}
        </span>
      </div>
    </div>
  );
}
