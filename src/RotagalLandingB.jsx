import React, { useState, useEffect } from 'react';

// ─── Premium Biotech Styles ───────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;600;700;900&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { font-family: 'Public Sans', sans-serif; background-color: #f8fafc; color: #0f172a; }

  .hero-glow {
    position: absolute;
    width: 60vw;
    height: 60vw;
    background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%);
    filter: blur(80px);
    z-index: 0;
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  }

  .text-gradient {
    background: linear-gradient(135deg, #064e3b 0%, #059669 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .btn-premium {
    background: #059669;
    color: white;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(5, 150, 105, 0.3);
  }
  .btn-premium:hover {
    background: #047857;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(5, 150, 105, 0.4);
  }

  .floating {
    animation: floating 3s ease-in-out infinite;
  }
  @keyframes floating {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  }

  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
  }
  .reveal.active {
    opacity: 1;
    transform: translateY(0);
  }

  .feature-icon-box {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
    color: #059669;
    font-size: 24px;
    margin-bottom: 24px;
  }

  /* Custom Table Styles */
  .premium-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 8px;
  }
  .premium-table th {
    padding: 16px;
    text-align: left;
    color: #64748b;
    font-weight: 600;
  }
  .premium-table tr {
    transition: transform 0.2s;
  }
  .premium-table tr:hover {
    transform: scale(1.01);
  }
  .premium-table td {
    padding: 20px 16px;
    background: white;
  }
  .premium-table td:first-child { border-radius: 12px 0 0 12px; }
  .premium-table td:last-child { border-radius: 0 12px 12px 0; }
`;

// ─── Interaction Hook ───────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Main Component ─────────────────────────────────────────────────────
export default function RotagalLandingB() {
  useScrollReveal();
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ backgroundColor: '#f8fafc', overflowX: 'hidden' }}>
      <style>{styles}</style>

      {/* ── Navbar ────────────────────────────────────────────────────────── */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', zInternal: 100, padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(248, 250, 252, 0.8)', backdropFilter: 'blur(10px)' }}>
        <div style={{ fontWeight: 900, fontSize: '24px', color: '#064e3b' }}>ROTAGAL</div>
        <a href="#contact" className="btn-premium" style={{ padding: '10px 24px', borderRadius: '50px', fontWeight: 600, textDecoration: 'none', fontSize: '14px' }}>협력 상담</a>
      </nav>

      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 20px 60px' }}>
        <div className="hero-glow" style={{ top: '-10%', left: '-10%' }} />
        <div className="hero-glow" style={{ bottom: '-10%', right: '-10%', background: 'radial-gradient(circle, rgba(6, 78, 59, 0.1) 0%, transparent 70%)' }} />

        <div style={{ maxWidth: '1200px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div className="reveal">
            <div style={{ color: '#059669', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontSize: '14px' }}>European Standards • EU GMP Certified</div>
            <h1 style={{ fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 900, color: '#0f172a', lineHeight: 1.1, marginBottom: '24px' }}>
              바이오 기술로 지키는 <br />
              <span className="text-gradient">가장 완벽한 태어남</span>
            </h1>
            <p style={{ fontSize: '20px', color: '#475569', lineHeight: 1.6, marginBottom: '40px' }}>
              로타바이러스, 코로나바이러스, 대장균(E.coli)<br />
              전격 차단 오리지널 3종 혼합백신 <strong>로타갈</strong>
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <button className="btn-premium" style={{ padding: '20px 40px', borderRadius: '12px', fontSize: '18px', fontWeight: 700 }}>전국 총판 찾기</button>
              <a href="tel:010-5407-5708" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#064e3b', fontWeight: 700, textDecoration: 'none' }}>
                <span style={{ fontSize: '24px' }}>📞</span> 010.5407.5708
              </a>
            </div>
          </div>

          <div className="reveal floating" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="glass-card" style={{ padding: '40px', borderRadius: '32px', textAlign: 'center', width: '100%', maxWidth: '400px' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🐄</div>
              <h3 style={{ fontSize: '24px', color: '#064e3b', marginBottom: '12px', fontWeight: 800 }}>로타갈(보비젠)</h3>
              <div style={{ height: '2px', width: '60px', background: '#059669', margin: '0 auto 24px' }} />
              <div style={{ textAlign: 'left', display: 'grid', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px' }}><span style={{ color: '#059669' }}>✔</span> <span>로타+코로나+대장균 3종</span></div>
                <div style={{ display: 'flex', gap: '12px' }}><span style={{ color: '#059669' }}>✔</span> <span>유럽 EU GMP 인증 오리지널</span></div>
                <div style={{ display: 'flex', gap: '12px' }}><span style={{ color: '#059669' }}>✔</span> <span>국내 82% G6P5 혈청형 대응</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Stats ────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#ffffff', padding: '100px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
          {[
            { label: '품질 지표', value: 'EU GMP', sub: '유럽 연합 인증 우수 의약품' },
            { label: '방어 성공률', value: '82%+', sub: 'G6P5 혈청형 교차면역 탁월' },
            { label: '보존 능력', value: '24개월', sub: '경쟁제품 대비 압도적 유통기한' },
            { label: '접종 효율', value: '1회 일괄', sub: '경산우 기준 효율적 관리' }
          ].map((stat, i) => (
            <div key={i} className="reveal" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginBottom: '12px' }}>{stat.label}</div>
              <div style={{ fontSize: '48px', fontWeight: 900, color: '#064e3b', marginBottom: '8px' }}>{stat.value}</div>
              <div style={{ fontSize: '16px', color: '#475569' }}>{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Rotagal ──────────────────────────────────────────────────── */}
      <section style={{ padding: '120px 20px', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: 900, color: '#0f172a', marginBottom: '20px' }}>혁신을 통한 생명 보호</h2>
            <p style={{ fontSize: '20px', color: '#475569' }}>로타갈이 제공하는 프리미엄 면역 케어 시스템</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
            {[
              { icon: '🧬', title: '국내 유일 오리지널 3종', text: '단 한 번의 접종으로 로타, 코로나, 대장균을 모두 잡는 완벽한 포뮬러.' },
              { icon: '🌍', title: 'Global Quality Control', text: '까다로운 유럽 기준을 통과한 EU GMP 인증 시설 생산 오리지널 백신.' },
              { icon: '🛡️', title: 'G6P5 혈청형 특화', text: '국내 발생의 대다수를 차지하는 로타바이러스 혈청형까지도 강력 방어.' },
              { icon: '📈', title: '농가 수익 증대', text: '치사율 높은 설사병 예방을 통해 송아지 폐사율을 획기적으로 감소시킵니다.' }
            ].map((f, i) => (
              <div key={i} className="reveal glass-card" style={{ padding: '48px', borderRadius: '32px' }}>
                <div className="feature-icon-box">{f.icon}</div>
                <h4 style={{ fontSize: '24px', fontWeight: 800, color: '#064e3b', marginBottom: '16px' }}>{f.title}</h4>
                <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '17px' }}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Video Section ────────────────────────────────────────────────── */}
      <section style={{ padding: '100px 20px', backgroundColor: '#064e3b' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div className="reveal">
            <h2 style={{ fontSize: '40px', fontWeight: 900, marginBottom: '24px', color: '#fff' }}>Scientific Overview</h2>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', marginBottom: '32px' }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src="https://www.youtube.com/embed/zhsDYNm2Pig?rel=0"
                title="로타갈 백신 소개 영상"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src="https://www.youtube.com/embed/74oxPVMV1p4?rel=0"
                title="유럽 현지 첨단 바이오 공정 영상"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ── Network Section ─────────────────────────────────────────────── */}
      <section style={{ padding: '120px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '40px', fontWeight: 900, color: '#0f172a' }}>Global Network</h2>
            <p style={{ color: '#64748b', marginTop: '12px' }}>전국 주요 거점 대리점을 통해 로타갈을 만나보세요.</p>
          </div>

          <div className="reveal box-shadow" style={{ overflowX: 'auto' }}>
            <table className="premium-table">
              <thead>
                <tr>
                  <th>REGION</th>
                  <th>AGENCY</th>
                  <th>REPRESENTATIVE</th>
                  <th>PHONE</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { region: 'Gyeonggi', name: 'BIOINSIDE Co.', rep: 'J.H. Ju', phone: '010-5318-3285' },
                  { region: 'Gangwon', name: 'ILSUNG Co.', rep: 'W.H. Kang', phone: '010-5366-9172' },
                  { region: 'Chungbuk', name: 'SAMWON P&T', rep: 'H.H. Kim', phone: '010-5407-0499' },
                  { region: 'Chungnam', name: 'CHEONSUNG', rep: 'D.H. Jeon', phone: '010-6420-7016' },
                  { region: 'Gyeongbuk', name: 'DAEKYUNG Co.', rep: 'S.R. Hwang', phone: '010-3506-3040' }
                ].map((item, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 800, color: '#059669' }}>{item.region}</td>
                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                    <td>{item.rep}</td>
                    <td><a href={`tel:${item.phone}`} style={{ color: '#0f172a', fontWeight: 700, textDecoration: 'none' }}>{item.phone}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Contact Section ─────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: '120px 20px', backgroundColor: '#f1f5f9' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: '80px' }}>
          <div className="reveal">
            <h2 style={{ fontSize: '40px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>협력 및 <br /><span className="text-gradient">기술 지원 센터</span></h2>
            <p style={{ color: '#475569', fontSize: '18px', lineHeight: 1.6, marginBottom: '40px' }}>
              전문 고문 수의사 젬스홍 팀이 <br />
              농장의 완벽한 방역 체계를 지원합니다.
            </p>
            <div className="glass-card" style={{ padding: '32px', borderRadius: '24px', borderLeft: '4px solid #059669' }}>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#064e3b', marginBottom: '8px' }}>010-5407-5708</div>
              <div style={{ color: '#64748b' }}>Technical Advisor: 젬스홍</div>
            </div>
          </div>

          <div className="reveal glass-card" style={{ padding: '48px', borderRadius: '32px' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '64px', marginBottom: '24px' }}>✅</div>
                <h3>상담 신청 완료</h3>
                <p style={{ color: '#64748b', marginTop: '12px' }}>기술 지원 팀에서 24시간 이내에 연락드립니다.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <div style={{ display: 'grid', gap: '24px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '14px', color: '#64748b' }}>이름 또는 농장명</label>
                    <input required style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff' }} placeholder="OOO 농장" />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '14px', color: '#64748b' }}>연락처</label>
                    <input type="tel" required style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff' }} placeholder="010-0000-0000" />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '14px', color: '#64748b' }}>상담 내용</label>
                    <textarea rows="4" style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff' }} placeholder="질환 상담, 제품 구매 문의 등" />
                  </div>
                  <button type="submit" className="btn-premium" style={{ width: '100%', padding: '20px', borderRadius: '12px', fontWeight: 900, fontSize: '18px' }}>
                    프리미엄 상담 신청하기
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer style={{ backgroundColor: '#0f172a', padding: '60px 40px', color: '#94a3b8', textAlign: 'center' }}>
        <p style={{ fontWeight: 900, color: 'white', fontSize: '20px', marginBottom: '12px' }}>ROTAGAL / (주)한국아그로</p>
        <p style={{ fontSize: '14px' }}>Premium Bioveterinary Solutions • EU GMP Original Vaccine</p>
        <div style={{ borderTop: '1px solid #1e293b', marginTop: '40px', paddingTop: '40px', fontSize: '12px' }}>
          © 2026 AGROKOREA CO., LTD. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}
