import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          background:
            'linear-gradient(135deg, rgb(10, 18, 35) 0%, rgb(19, 58, 104) 55%, rgb(194, 226, 255) 100%)',
          color: 'white',
          padding: '56px',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            letterSpacing: 6,
            textTransform: 'uppercase',
            opacity: 0.9,
          }}
        >
          EGS Verification
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', fontSize: 68, fontWeight: 700, maxWidth: 860, lineHeight: 1.05 }}>
            Apostille, Legalisation and Document Authentication
          </div>
          <div style={{ display: 'flex', fontSize: 30, maxWidth: 920, color: 'rgb(225, 240, 255)' }}>
            Australia-focused document coordination with route checks, intake, tracking and cross-border dispatch.
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 24,
            color: 'rgb(225, 240, 255)',
          }}
        >
          <span>Sydney HQ</span>
          <span>eliteglobalsolutions.co</span>
        </div>
      </div>
    ),
    size,
  );
}
