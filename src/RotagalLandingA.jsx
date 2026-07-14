import React, { useState, useEffect, useRef } from 'react';

// ─── 공통 스타일 ────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { font-family: 'Noto Sans KR', sans-serif; }

  .fade-in {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Hero gradient text */
  .hero-gradient {
    background: linear-gradient(135deg, #f59e0b, #d97706, #92400e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* 버튼 펄스 애니메이션 */
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.4); }
    70% { box-shadow: 0 0 0 20px rgba(217, 119, 6, 0); }
    100% { box-shadow: 0 0 0 0 rgba(217, 119, 6, 0); }
  }
  .pulse-btn { animation: pulse 2s infinite; }

  /* 숫자 카운트 강조 */
  .stat-num {
    font-size: 3.5rem;
    font-weight: 900;
    line-height: 1;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* 카드 hover */
  .feature-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .feature-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 48px rgba(146, 64, 14, 0.15) !important;
  }

  /* 리뷰 카드 */
  .review-card {
    transition: transform 0.3s ease;
  }
  .review-card:hover {
    transform: scale(1.02);
  }

  /* 스크롤 표시기 */
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
  .scroll-indicator { animation: bounce 2s infinite; }

  /* 물결 테두리 */
  .wave-divider {
    width: 100%;
    overflow: hidden;
    line-height: 0;
  }

  /* 배지 */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(245, 158, 11, 0.12);
    border: 1px solid rgba(245, 158, 11, 0.3);
    color: #92400e;
    border-radius: 50px;
    padding: 6px 16px;
    font-size: 0.875rem;
    font-weight: 700;
  }

  /* 전화 버튼 shimmer */
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .phone-btn {
    background: linear-gradient(90deg, #d97706 0%, #f59e0b 25%, #fcd34d 50%, #f59e0b 75%, #d97706 100%);
    background-size: 200% auto;
    animation: shimmer 3s linear infinite;
  }

  .table-row-hover { transition: background 0.2s; }
  .table-row-hover:hover { background: #fffbeb !important; }
`;

// ─── 스크롤 감지 훅 ─────────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── 서브 컴포넌트: 섹션 래퍼 ────────────────────────────────────────────────
function FadeSection({ children, style }) {
  const ref = useScrollReveal();
  return <div ref={ref} className="fade-in" style={style}>{children}</div>;
}

// ─── 메인 컴포넌트 ───────────────────────────────────────────────────────────
export default function RotagalLandingA() {
  const [formData, setFormData] = useState({ name: '', phone: '', farmSize: '', inquiry: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{styles}</style>
      <div style={{ backgroundColor: '#fffbeb', fontFamily: "'Noto Sans KR', sans-serif", color: '#1c0a00' }}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section style={{
          minHeight: '100vh',
          background: 'linear-gradient(160deg, #fffbeb 0%, #fef3c7 40%, #fde68a 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px 60px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* 배경 장식 원 */}
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(217,119,6,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: '800px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div className="badge" style={{ marginBottom: '24px' }}>
              🏆 EU GMP 인증 &nbsp;|&nbsp; 국내 유일 오리지널 3종 혼합백신
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '900', lineHeight: '1.2', marginBottom: '24px', wordBreak: 'keep-all' }}>
              <span style={{ color: '#1c0a00' }}>우리 송아지,<br /></span>
              <span className="hero-gradient">설사병 걱정 없이</span>
              <span style={{ color: '#1c0a00' }}><br />건강하게 키우세요</span>
            </h1>

            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: '#78350f', lineHeight: '1.8', marginBottom: '12px', wordBreak: 'keep-all' }}>
              로타 · 코로나 · 대장균 3가지를 <strong>한 번의 접종</strong>으로 예방.
            </p>
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: '#78350f', lineHeight: '1.8', marginBottom: '48px', wordBreak: 'keep-all' }}>
              어미 소의 초유를 통해 <strong>강력한 면역</strong>이 송아지에게 전달됩니다.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={scrollToContact}
                className="pulse-btn"
                style={{
                  backgroundColor: '#d97706',
                  color: '#ffffff',
                  border: 'none',
                  padding: '18px 40px',
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  letterSpacing: '-0.01em',
                }}
              >
                무료 상담 신청하기 →
              </button>
              <a
                href="tel:010-5407-5708"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#ffffff',
                  color: '#92400e',
                  border: '2px solid #fcd34d',
                  padding: '18px 32px',
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >
                📞 바로 전화하기
              </a>
            </div>

            {/* 스크롤 유도 */}
            <div className="scroll-indicator" style={{ marginTop: '60px', color: '#d97706', fontSize: '1.5rem' }}>↓</div>
          </div>
        </section>

        {/* ── 파급 통계 ─────────────────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', backgroundColor: '#ffffff' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <FadeSection>
              <p style={{ textAlign: 'center', fontSize: '0.875rem', fontWeight: '700', letterSpacing: '0.1em', color: '#d97706', textTransform: 'uppercase', marginBottom: '12px' }}>
                왜 로타갈인가요?
              </p>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: '900', textAlign: 'center', color: '#1c0a00', marginBottom: '56px', wordBreak: 'keep-all' }}>
                수치로 증명하는 로타갈의 효과
              </h2>
            </FadeSection>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
              {[
                { num: '82%', label: '국내 로타 발생 G6P5 혈청형', sub: '교차면역 방어 효과 탁월' },
                { num: '3종', label: '로타·코로나·대장균 동시 예방', sub: '한 번의 접종으로 완성' },
                { num: '24개월', label: '유통기한', sub: '경쟁 제품보다 길어 관리 편리' },
                { num: 'EU', label: 'GMP 인증 획득', sub: '유럽 최고 품질 기준 통과' },
              ].map((s, i) => (
                <FadeSection key={i}>
                  <div style={{ padding: '32px 16px' }}>
                    <div className="stat-num">{s.num}</div>
                    <div style={{ fontWeight: '700', fontSize: '1rem', color: '#78350f', margin: '12px 0 6px', wordBreak: 'keep-all' }}>{s.label}</div>
                    <div style={{ fontSize: '0.875rem', color: '#92400e', wordBreak: 'keep-all' }}>{s.sub}</div>
                  </div>
                </FadeSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── 문제 / 해결 스토리 섹션 ───────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: 'linear-gradient(160deg, #fef3c7 0%, #fffbeb 100%)' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <FadeSection>
              <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '40px 32px', boxShadow: '0 8px 32px rgba(146,64,14,0.08)', marginBottom: '40px', borderLeft: '5px solid #f59e0b' }}>
                <p style={{ fontSize: '1.5rem', fontWeight: '900', color: '#92400e', marginBottom: '16px' }}>😰 이런 경험 있으신가요?</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    '하루에도 몇 번씩 설사하는 송아지를 보며 마음이 탄 적이 있다',
                    '백신을 써도 연달아 폐사가 나서 손해가 이만저만이 아니었다',
                    '어떤 백신이 진짜 효과 있는지 도통 모르겠다',
                  ].map((t, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '1.05rem', color: '#78350f', lineHeight: '1.6' }}>
                      <span style={{ color: '#f59e0b', fontSize: '1.25rem', flexShrink: 0 }}>✓</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeSection>

            <FadeSection>
              <div style={{ backgroundColor: '#d97706', borderRadius: '20px', padding: '40px 32px', color: '#fff', textAlign: 'center' }}>
                <p style={{ fontSize: '1.25rem', fontWeight: '900', marginBottom: '12px' }}>로타갈이 해답입니다 🐄</p>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.8', wordBreak: 'keep-all', opacity: 0.95 }}>
                  어미 소에게 분만 3~6주 전 단 한 번 접종하면,<br />
                  <strong>초유를 통해 신생 송아지</strong>에게 강력한 항체가 자동 전달됩니다.<br />
                  로타·코로나·대장균 — 3가지 설사병 원인을 동시에 차단하세요.
                </p>
              </div>
            </FadeSection>
          </div>
        </section>

        {/* ── 홍보 영상 ────────────────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', backgroundColor: '#ffffff' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <FadeSection>
              <p style={{ fontSize: '0.875rem', fontWeight: '700', letterSpacing: '0.1em', color: '#d97706', textTransform: 'uppercase', marginBottom: '12px' }}>
                제품 소개 영상
              </p>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '900', color: '#1c0a00', marginBottom: '32px', wordBreak: 'keep-all' }}>
                로타갈, 직접 확인하세요
              </h2>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 16px 48px rgba(146, 64, 14, 0.15)', marginBottom: '32px' }}>
                <iframe
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  src="https://www.youtube.com/embed/zhsDYNm2Pig?rel=0"
                  title="로타갈 백신 소개 영상"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 16px 48px rgba(146, 64, 14, 0.15)' }}>
                <iframe
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  src="https://www.youtube.com/embed/74oxPVMV1p4?rel=0"
                  title="유럽 현지 첨단 바이오 공정 영상"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </FadeSection>
          </div>
        </section>

        {/* ── 제품 특장점 ──────────────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: 'linear-gradient(160deg, #fffbeb 0%, #fef3c7 100%)' }}>
          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <FadeSection>
              <p style={{ textAlign: 'center', fontSize: '0.875rem', fontWeight: '700', letterSpacing: '0.1em', color: '#d97706', textTransform: 'uppercase', marginBottom: '12px' }}>
                로타갈(보비젠) 장점
              </p>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: '900', textAlign: 'center', color: '#1c0a00', marginBottom: '48px', wordBreak: 'keep-all' }}>
                왜 전국 농가가 로타갈을 선택할까요?
              </h2>
            </FadeSection>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {[
                { icon: '🏆', title: 'EU GMP 인증', desc: '유럽의 엄격한 품질 기준을 통과한 안전하고 믿을 수 있는 백신입니다. 국산 제품과 비교할 수 없는 품질 수준을 자랑합니다.' },
                { icon: '🛡️', title: '교차면역까지 방어', desc: '국내 로타바이러스 발생의 82%를 차지하는 G6P5 혈청형에도 탁월한 교차면역 효과. 검역본부에서 공식 인정하여 제품 부표에 명기됩니다.' },
                { icon: '📅', title: '긴 유통기한 24개월', desc: '제조일로부터 24개월(유럽 기준 36개월)로 경쟁 제품보다 훨씬 길어 재고 관리 부담이 없습니다.' },
                { icon: '💉', title: '간편한 원샷 접종', desc: '유럽 권장 가이드라인에 따라 분만 전 3주~12주 사이 임신우에 1두분(3mL)을 단 1회 근육 접종! 바쁜 농장 일정에 맞게 최소한의 노동력으로 최대 효과를 냅니다.' },
              ].map((f, i) => (
                <FadeSection key={i}>
                  <div className="feature-card" style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '20px', boxShadow: '0 8px 24px rgba(146,64,14,0.08)' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{f.icon}</div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#92400e', marginBottom: '12px' }}>{f.title}</h3>
                    <p style={{ color: '#78350f', lineHeight: '1.7', fontSize: '1rem', wordBreak: 'keep-all' }}>{f.desc}</p>
                  </div>
                </FadeSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── 후기 ─────────────────────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', backgroundColor: '#ffffff' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <FadeSection>
              <p style={{ textAlign: 'center', fontSize: '0.875rem', fontWeight: '700', letterSpacing: '0.1em', color: '#d97706', textTransform: 'uppercase', marginBottom: '12px' }}>
                실제 농장주 후기
              </p>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: '900', textAlign: 'center', color: '#1c0a00', marginBottom: '48px', wordBreak: 'keep-all' }}>
                먼저 써본 농장주님들의 이야기
              </h2>
            </FadeSection>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '64px' }}>
              {[
                { stars: 5, text: '"로타갈 3종 혼합백신으로 바꾸고 나서 송아지 설사병 걱정이 싹 사라졌어요. 농장 관리가 훨씬 수월해졌습니다!"', loc: '충남 천안 농장주님' },
                { stars: 5, text: '"우리 동네 수의사님이 강력 추천하셔서 써봤는데, EU GMP 인증받은 오리지널이라 그런지 결과가 정말 달랐어요."', loc: '경북 상주 농장주님' },
                { stars: 5, text: '"유럽 품질 기준을 거친 프리미엄 백신이라 역시 다르더군요. 주변 농가에도 계속해서 추천하고 있어요."', loc: '전북 정읍 농장주님' },
              ].map((r, i) => (
                <FadeSection key={i}>
                  <div className="review-card" style={{ backgroundColor: '#fffbeb', borderRadius: '20px', padding: '32px', boxShadow: '0 4px 24px rgba(146,64,14,0.08)', borderBottom: '4px solid #f59e0b' }}>
                    <div style={{ color: '#f59e0b', fontSize: '1.25rem', marginBottom: '16px' }}>{'★'.repeat(r.stars)}</div>
                    <p style={{ color: '#78350f', lineHeight: '1.7', fontSize: '1rem', marginBottom: '20px', wordBreak: 'keep-all' }}>{r.text}</p>
                    <div style={{ fontWeight: '700', color: '#92400e', fontSize: '0.9rem' }}>— {r.loc}</div>
                  </div>
                </FadeSection>
              ))}
            </div>

            {/* 고문 수의사 배너 */}
            <FadeSection>
              <div style={{ background: 'linear-gradient(135deg, #92400e, #d97706)', borderRadius: '24px', padding: '40px 32px', textAlign: 'center' }}>
                <p style={{ color: '#fde68a', fontWeight: '700', fontSize: '0.9rem', marginBottom: '8px', letterSpacing: '0.05em' }}>전문 고문 수의사 직통 상담</p>
                <h3 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: '900', marginBottom: '8px' }}>친근한 이웃 수의사, 젬스홍</h3>
                <p style={{ color: '#fde68a', marginBottom: '28px', fontSize: '0.95rem' }}>궁금한 게 있으면 언제든지 전화하세요!</p>
                <a
                  href="tel:010-5407-5708"
                  className="phone-btn"
                  style={{
                    display: 'inline-block',
                    color: '#ffffff',
                    fontSize: '1.75rem',
                    fontWeight: '900',
                    textDecoration: 'none',
                    padding: '16px 48px',
                    borderRadius: '50px',
                  }}
                >
                  📞 010-5407-5708
                </a>
                <p style={{ color: '#fef3c7', marginTop: '14px', fontSize: '0.9rem' }}>터치하시면 바로 전화 연결됩니다!</p>
              </div>
            </FadeSection>
          </div>
        </section>

        {/* ── 전국 총판 ────────────────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: 'linear-gradient(160deg, #fef3c7 0%, #fffbeb 100%)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <FadeSection>
              <p style={{ textAlign: 'center', fontSize: '0.875rem', fontWeight: '700', letterSpacing: '0.1em', color: '#d97706', textTransform: 'uppercase', marginBottom: '12px' }}>
                전국 도별 총판 안내
              </p>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '900', textAlign: 'center', color: '#1c0a00', marginBottom: '12px', wordBreak: 'keep-all' }}>
                가까운 총판에 바로 문의하세요
              </h2>
              <p style={{ textAlign: 'center', fontSize: '1rem', color: '#78350f', marginBottom: '40px', wordBreak: 'keep-all' }}>
                지역 총판을 통해 더욱 빠르고 친절한 서비스를 받으실 수 있습니다.
              </p>
            </FadeSection>
            <FadeSection>
              <div style={{ overflowX: 'auto', backgroundColor: '#ffffff', borderRadius: '20px', boxShadow: '0 8px 32px rgba(146,64,14,0.08)' }}>
                <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse', textAlign: 'center' }}>
                  <thead>
                    <tr style={{ background: 'linear-gradient(90deg, #92400e, #d97706)', color: '#ffffff' }}>
                      {['지역', '상호', '대표', '전화번호', '휴대폰'].map((h, i) => (
                        <th key={i} style={{ padding: '18px 16px', fontWeight: '700', fontSize: '0.95rem' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { region: '경기도', name: '바이오인사이드(주)', rep: '주정형', tel: '031-353-3166', phone: '010-5318-3285' },
                      { region: '강원도', name: '(주)일성', rep: '강우현', tel: '033-256-3319', phone: '010-5366-9172' },
                      { region: '충청북도', name: '(주)삼원팜텍', rep: '김한호', tel: '043-733-7277', phone: '010-5407-0499' },
                      { region: '충청남도', name: '(주)천성가축약품', rep: '전두현', tel: '041-588-7016', phone: '010-6420-7016' },
                      { region: '충청남도', name: '(주)우리동물약품', rep: '양원철', tel: '041-642-9986', phone: '010-5578-9760' },
                      { region: '경상북도', name: '(주)대경', rep: '황상룡', tel: '054-481-9941', phone: '010-3506-3040' },
                      { region: '경상남도', name: '(주)경남수의약품', rep: '최재영', tel: '055-757-4001', phone: '010-5270-6498' },
                      { region: '전라북도', name: '(주)올루션', rep: '이철호', tel: '054-532-9936', phone: '010-9389-9936' },
                      { region: '전라남도', name: '(주)올루션', rep: '이철호', tel: '054-532-9936', phone: '010-9389-9936' },
                      { region: '제주도', name: '(주)대경', rep: '황상룡', tel: '054-481-9941', phone: '010-3506-3040' },
                    ].map((item, idx) => (
                      <tr key={idx} className="table-row-hover" style={{ borderBottom: '1px solid #fde68a', backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fffbeb' }}>
                        <td style={{ padding: '16px', fontWeight: '800', color: '#92400e' }}>{item.region}</td>
                        <td style={{ padding: '16px', color: '#1c0a00' }}>{item.name}</td>
                        <td style={{ padding: '16px', color: '#1c0a00' }}>{item.rep}</td>
                        <td style={{ padding: '16px' }}>
                          <a href={`tel:${item.tel}`} style={{ color: '#78350f', textDecoration: 'none', fontWeight: '500' }}>{item.tel}</a>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <a href={`tel:${item.phone}`} style={{ color: '#d97706', textDecoration: 'none', fontWeight: '700' }}>{item.phone}</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeSection>
          </div>
        </section>

        {/* ── 상담 신청 폼 ─────────────────────────────────────────────────── */}
        <section id="contact-section" style={{ padding: '80px 24px', backgroundColor: '#ffffff' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <FadeSection>
              <p style={{ textAlign: 'center', fontSize: '0.875rem', fontWeight: '700', letterSpacing: '0.1em', color: '#d97706', textTransform: 'uppercase', marginBottom: '12px' }}>
                무료 상담
              </p>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '900', textAlign: 'center', color: '#1c0a00', marginBottom: '8px', wordBreak: 'keep-all' }}>
                전문 수의사와 무료 상담하세요
              </h2>
              <p style={{ textAlign: 'center', color: '#78350f', marginBottom: '40px', fontSize: '1rem' }}>
                농장 상황에 맞는 맞춤 접종 계획을 안내해 드립니다.
              </p>
            </FadeSection>

            <FadeSection>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '60px 24px', background: 'linear-gradient(135deg, #fffbeb, #fef3c7)', borderRadius: '24px', boxShadow: '0 8px 32px rgba(146,64,14,0.08)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎉</div>
                  <p style={{ fontSize: '1.25rem', fontWeight: '900', color: '#92400e' }}>상담 문의가 접수되었습니다!</p>
                  <p style={{ color: '#78350f', marginTop: '8px' }}>영자가 곧 연락드릴게요 대표님!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ backgroundColor: '#fffbeb', borderRadius: '24px', padding: '40px 32px', boxShadow: '0 8px 32px rgba(146,64,14,0.08)' }}>
                  {[
                    { label: '이름 (농장주명)', name: 'name', type: 'text', placeholder: '' },
                    { label: '연락처', name: 'phone', type: 'tel', placeholder: '010-0000-0000' },
                    { label: '농장 규모 (사육 두수)', name: 'farmSize', type: 'text', placeholder: '예: 100두' },
                  ].map((f) => (
                    <div key={f.name} style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', fontSize: '0.95rem', color: '#78350f', marginBottom: '8px', fontWeight: '700' }}>{f.label}</label>
                      <input
                        type={f.type}
                        name={f.name}
                        value={formData[f.name]}
                        onChange={handleChange}
                        placeholder={f.placeholder}
                        required={f.name !== 'farmSize'}
                        style={{ width: '100%', padding: '14px 18px', backgroundColor: '#ffffff', border: '2px solid #fde68a', borderRadius: '12px', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
                        onFocus={(e) => e.target.style.borderColor = '#d97706'}
                        onBlur={(e) => e.target.style.borderColor = '#fde68a'}
                      />
                    </div>
                  ))}
                  <div style={{ marginBottom: '28px' }}>
                    <label style={{ display: 'block', fontSize: '0.95rem', color: '#78350f', marginBottom: '8px', fontWeight: '700' }}>문의 내용</label>
                    <textarea
                      name="inquiry"
                      value={formData.inquiry}
                      onChange={handleChange}
                      rows="4"
                      placeholder="궁금한 점을 자유롭게 남겨주세요."
                      style={{ width: '100%', padding: '14px 18px', backgroundColor: '#ffffff', border: '2px solid #fde68a', borderRadius: '12px', fontSize: '1rem', outline: 'none', resize: 'vertical', transition: 'border-color 0.2s' }}
                      onFocus={(e) => e.target.style.borderColor = '#d97706'}
                      onBlur={(e) => e.target.style.borderColor = '#fde68a'}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{ width: '100%', backgroundColor: '#d97706', color: '#ffffff', border: 'none', padding: '18px', fontSize: '1.125rem', fontWeight: '900', borderRadius: '12px', cursor: 'pointer', letterSpacing: '-0.01em' }}
                  >
                    무료 상담 신청하기 🐄
                  </button>
                </form>
              )}
            </FadeSection>
          </div>
        </section>

        {/* ── 푸터 ─────────────────────────────────────────────────────────── */}
        <footer style={{ backgroundColor: '#1c0a00', color: '#fde68a', padding: '40px 24px', textAlign: 'center' }}>
          <p style={{ fontWeight: '900', fontSize: '1.25rem', marginBottom: '8px' }}>㈜한국아그로</p>
          <p style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '4px' }}>동물용 의약품 제조·판매업</p>
          <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>© 2026 Agrokorea Co., Ltd. All rights reserved.</p>
        </footer>

      </div>
    </>
  );
}
