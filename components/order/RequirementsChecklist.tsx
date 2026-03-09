'use client';

import { useMemo } from 'react';

export type RequirementItem = { id: string; title: string; formats: string; maxSizeMb: number; hint: string; mistakes: string };

const map: Record<string, RequirementItem[]> = {
  default: [
    { id: 'passport', title: 'Passport copy', formats: 'PDF/JPG/PNG', maxSizeMb: 10, hint: 'Upload full page and clear edges.', mistakes: 'Blurry photo or cropped corners.' },
    { id: 'document', title: 'Source document', formats: 'PDF/JPG/PNG', maxSizeMb: 10, hint: 'Use complete document pages in order.', mistakes: 'Missing pages or edits on file.' },
  ],
  au_birth: [
    { id: 'birth', title: 'Birth certificate', formats: 'PDF/JPG/PNG', maxSizeMb: 10, hint: 'Upload front side in high resolution.', mistakes: 'Low contrast or glare.' },
    { id: 'id', title: 'Government photo ID', formats: 'PDF/JPG/PNG', maxSizeMb: 10, hint: 'Name must match the certificate.', mistakes: 'Name mismatch or expired ID.' },
  ],
};

export function getChecklist(country: string, docType: string) {
  const key = `${country}_${docType}`.toLowerCase();
  return map[key] ?? map.default;
}

export function RequirementsChecklist({ country, docType, files, onUpload, errors }: {
  country: string; docType: string; files: Record<string, File | null>; onUpload: (id: string, file: File | null) => void; errors: Record<string, string>;
}) {
  const requirements = useMemo(() => getChecklist(country, docType), [country, docType]);

  return (
    <div className="stack">
      {requirements.map((item) => (
        <div key={item.id} className="card">
          <div className="row-split">
            <h4>{item.title}</h4>
            <span className="small">{files[item.id] ? 'Uploaded' : 'Not uploaded'}</span>
          </div>
          <p className="small">{item.formats} · max {item.maxSizeMb}MB</p>
          <p className="small">Tip: {item.hint}</p>
          <p className="small">Common mistake: {item.mistakes}</p>
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" capture="environment" onChange={(e) => onUpload(item.id, e.target.files?.[0] || null)} />
          {errors[item.id] ? <p className="error">{errors[item.id]}</p> : null}
        </div>
      ))}
    </div>
  );
}
