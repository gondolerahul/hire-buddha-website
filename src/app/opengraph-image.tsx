import { ImageResponse } from 'next/og';

// The social card every page shares (1200×630), generated at build time.
export const alt = 'HireBuddha: Stop Hiring. Start Deploying. AI employees for your business.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#0a0908', color: '#f3ede4', position: 'relative', fontFamily: 'sans-serif' }}>
        {/* The liquid-gold ring */}
        <div style={{ position: 'absolute', right: -60, top: 45, width: 540, height: 540, borderRadius: 9999, border: '14px solid #edab48', boxShadow: '0 0 90px 10px rgba(237,171,72,.35)', display: 'flex' }} />
        <div style={{ position: 'absolute', right: 90, top: 195, width: 240, height: 240, borderRadius: 9999, background: 'radial-gradient(circle, #fff4de 0%, #fdc871 35%, rgba(237,171,72,0) 70%)', display: 'flex' }} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '72px 80px', width: 760 }}>
          <div style={{ display: 'flex', fontSize: 30, letterSpacing: 2 }}>
            <span>Hire</span><span style={{ color: '#edab48' }}>Buddha</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 82, lineHeight: 1.02, letterSpacing: -2, display: 'flex' }}>Stop Hiring.</div>
            <div style={{ fontSize: 82, lineHeight: 1.02, letterSpacing: -2, display: 'flex' }}>
              <span>Start&nbsp;</span><span style={{ color: '#edab48' }}>Deploying.</span>
            </div>
            <div style={{ fontSize: 30, color: '#b9b0a4', marginTop: 28, lineHeight: 1.35, display: 'flex' }}>
              AI employees that work inside your business’s own accounts.
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 22, color: '#8a8278', letterSpacing: 1 }}>hirebuddha.com · A product of Buddha Cognitive Lab</div>
        </div>
      </div>
    ),
    size,
  );
}
