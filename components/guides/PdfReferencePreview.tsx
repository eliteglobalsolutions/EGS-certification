'use client';

import { useState } from 'react';

export function PdfReferencePreview({
  fileSrc,
  previewSrc,
  previewImages,
  pageCount = 1,
  title,
  watermarked = false,
}: {
  fileSrc: string;
  previewSrc: string;
  previewImages?: string[];
  pageCount?: number;
  title: string;
  watermarked?: boolean;
}) {
  const [page, setPage] = useState(1);
  const hasMultiplePages = pageCount > 1;
  const previewSet = previewImages && previewImages.length ? previewImages : [previewSrc];
  const activePreview = previewSet[page - 1] ?? previewSrc;

  const handleNextPage = () => {
    if (!hasMultiplePages) return;
    setPage((current) => (current >= pageCount ? 1 : current + 1));
  };

  const handlePreviousPage = () => {
    if (!hasMultiplePages) return;
    setPage((current) => (current <= 1 ? pageCount : current - 1));
  };

  return (
    <div className="pdf-reference-preview">
      <div className="pdf-reference-toolbar">
        <div className="pdf-reference-toolbar-left">
          <div className="pdf-reference-note">Reference preview</div>
          {hasMultiplePages ? (
            <div className="pdf-reference-controls">
              <div className="pdf-reference-page-status">Page {page} of {pageCount}</div>
              <div className="pdf-reference-page-pills">
                <button className="pdf-reference-pill" onClick={handlePreviousPage} type="button">
                  Prev
                </button>
                {Array.from({ length: pageCount }, (_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      className={`pdf-reference-pill ${page === pageNumber ? 'pdf-reference-pill-active' : ''}`}
                      onClick={() => setPage(pageNumber)}
                      type="button"
                    >
                      Page {pageNumber}
                    </button>
                  );
                })}
                <button className="pdf-reference-pill" onClick={handleNextPage} type="button">
                  Next
                </button>
              </div>
            </div>
          ) : null}
        </div>
        <a className="pdf-reference-open" href={fileSrc} rel="noreferrer" target="_blank">
          Open protected file
        </a>
      </div>

      <div className={`pdf-reference-frame ${watermarked ? 'pdf-reference-frame-watermarked' : ''}`}>
        <img alt={`${title} page ${page}`} className="pdf-reference-image" src={activePreview} />

        {hasMultiplePages ? (
          <button
            aria-label={`Show ${page === pageCount ? 'page 1' : `page ${page + 1}`} of ${title}`}
            className="pdf-reference-next"
            onClick={handleNextPage}
            type="button"
          >
            <span className="pdf-reference-next-label">Tap preview to view next page</span>
          </button>
        ) : null}
      </div>

    </div>
  );
}
