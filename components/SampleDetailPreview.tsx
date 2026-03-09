'use client';

export function SampleDetailPreview({
  thumbPath,
  filePath,
  altText,
}: {
  thumbPath?: string | null;
  filePath: string;
  altText: string;
}) {
  return (
    <>
      <div className="samples-viewer-wrap">
        {thumbPath ? (
          <img
            alt={altText}
            className="samples-image-preview"
            loading="lazy"
            src={thumbPath}
          />
        ) : (
          <iframe
            className="samples-pdf-viewer"
            src={`${filePath}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            title={altText}
            loading="lazy"
          />
        )}
        <div className="samples-guard-overlay" aria-hidden="true">
          <span>EGS EliteGlobalSolutions.co</span>
          <span>EGS EliteGlobalSolutions.co</span>
          <span>EGS EliteGlobalSolutions.co</span>
          <span>EGS EliteGlobalSolutions.co</span>
        </div>
        </div>
      <div className="actions">
        <a className="btn btn-secondary" href={filePath} rel="noreferrer" target="_blank">
          View full sample
        </a>
      </div>
    </>
  );
}
