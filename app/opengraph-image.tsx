import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          background: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)',
          color: '#0f172a',
          fontFamily: 'sans-serif'
        }}
      >
        <div style={{ display: 'flex', fontSize: '28px', fontWeight: 700, color: '#2563eb' }}>Rate Kit</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', maxWidth: '920px', fontSize: '72px', fontWeight: 800, lineHeight: 1.05 }}>
            Hourly rate, day rate, and retainer calculators for freelancers.
          </div>
          <div style={{ display: 'flex', fontSize: '30px', color: '#475569' }}>Free web tools for consultants, creators, and small studios.</div>
        </div>
      </div>
    ),
    size
  );
}
