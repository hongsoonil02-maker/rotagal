import React, { useState } from 'react';
import { Shield, Clock, Syringe, Award, MessageCircle, X, Send, ChevronDown, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import RotagalInfographic from './RotagalInfographic';

export default function RotagalLanding() {
  const [formData, setFormData] = useState({ name: '', phone: '', farmSize: '', inquiry: '', region: '' });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', content: '안녕하세요! 로타갈 전문 수의사 AI 상담사입니다. 송아지 설사병 예방이나 로타갈 접종에 대해 궁금한 점이 있으신가요?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const distributors = [
    { region: '경기도', name: '바이오인사이드(주)', rep: '주정형', tel: '031-353-3166', phone: '010-5318-3285' },
    { region: '강원도', name: '(주)일성', rep: '강우현', tel: '033-256-3319', phone: '010-5366-9172' },
    { region: '충청북도', name: '(주)삼원팜텍', rep: '김한호', tel: '043-733-7277', phone: '010-5407-0499' },
    { region: '충청남도 (북부)', name: '(주)천성가축약품', rep: '전두현', tel: '041-588-7016', phone: '010-6420-7016' },
    { region: '충청남도 (남부)', name: '(주)우리동물약품', rep: '양원철', tel: '041-642-9986', phone: '010-5578-9760' },
    { region: '경상북도', name: '(주)대경', rep: '황상룡', tel: '054-481-9941', phone: '010-3506-3040' },
    { region: '경상남도', name: '(주)경남수의약품', rep: '최재영', tel: '055-757-4001', phone: '010-5270-6498' },
    { region: '전라도', name: '(주)올루션', rep: '이철호', tel: '054-532-9936', phone: '010-9389-9936' },
    { region: '제주도', name: '(주)대경', rep: '황상룡', tel: '054-481-9941', phone: '010-3506-3040' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.region) {
      alert('소재지 지역을 선택해주세요.');
      return;
    }
    const dist = distributors.find(d => d.region.includes(formData.region) || formData.region.includes(d.region));
    if (dist) {
      alert(`상담 문의가 접수되었습니다!\n\n담당 지역(${dist.region}) 총판인 [${dist.name}]의 담당자가 곧 연락드리겠습니다.\n(빠른 문의: ${dist.phone})`);
    } else {
      alert('상담 문의가 접수되었습니다. 담당자가 곧 연락드릴게요 대표님!');
    }
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    setChatMessages([...chatMessages, { role: 'user', content: chatInput }]);
    
    // Mock AI response
    setTimeout(() => {
      let aiResponse = "접수되었습니다. 더 자세한 상담이 필요하시면 하단의 상담 문의 폼을 이용해주시거나 고문 수의사에게 직접 연락 부탁드립니다.";
      if (chatInput.includes('유통기한') || chatInput.includes('기한')) {
        aiResponse = "로타갈의 유통기한은 제조일로부터 24개월로 매우 깁니다! (유럽 현지 기준으로는 36개월입니다.) 타사 제품 대비 보관 및 관리가 훨씬 용이하죠.";
      } else if (chatInput.includes('접종') || chatInput.includes('언제')) {
        aiResponse = "유럽 표준 권장 가이드라인에 따라 분만 예정일 전 3주에서 12주 사이의 임신우에 1두분(3mL)을 근육 접종하여 단 1회(원샷) 일괄 접종합니다.";
      } else if (chatInput.includes('효과') || chatInput.includes('장점')) {
        aiResponse = "로타갈은 국내 발생의 82%를 차지하는 G6P5 혈청형 방어에 특히 탁월하며, EU GMP 인증을 받은 유럽 프리미엄 3종 혼합 백신입니다.";
      }
      
      setChatMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    }, 1000);
    
    setChatInput('');
  };

  const handleQuickReply = (question) => {
    setChatInput(question);
  };

  return (
    <div className="font-sans text-gray-900 bg-gray-50 min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="#" className="flex items-center gap-2.5 sm:gap-3 group">
              <img src="./pharmagal_logo.jpg" alt="Pharmagal Bio Logo" className="h-9 sm:h-11 w-auto object-contain rounded-lg bg-white p-1 shadow-md border border-emerald-200 group-hover:scale-105 transition-transform" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-900 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">Rotagal</span>
                  <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-300 uppercase tracking-wider hidden sm:inline-block">EU GMP</span>
                </div>
                <span className="text-[10px] sm:text-xs font-extrabold text-emerald-700 tracking-wider uppercase mt-0.5">Pharmagal Bio (Europe)</span>
              </div>
            </a>
            <div className="hidden md:flex gap-8 items-center">
              <a href="#infographic" className="text-gray-600 hover:text-emerald-700 font-semibold transition-colors">핵심 인포그래픽</a>
              <a href="#features" className="text-gray-600 hover:text-emerald-700 font-semibold transition-colors">제품특징</a>
              <a href="#reviews" className="text-gray-600 hover:text-emerald-700 font-semibold transition-colors">사용후기</a>
              <a href="#contact" className="text-gray-600 hover:text-emerald-700 font-semibold transition-colors">총판안내</a>
              <a href="#inquiry" className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">상담신청</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-white to-green-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-0 left-0 mt-20 -ml-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10 pt-10 lg:pt-16">
          <div className="inline-flex flex-wrap items-center justify-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-100/90 text-emerald-950 font-black text-sm sm:text-base mb-4 shadow-md border-2 border-emerald-400">
            <img src="./pharmagal_logo.jpg" alt="Pharmagal Bio" className="h-5 sm:h-6 w-auto rounded bg-white px-1 py-0.5 shadow-2xs" />
            <span>유럽 명가 <span className="text-emerald-800 underline decoration-emerald-500 underline-offset-4">Pharmagal Bio 공식 수입 백신</span> (EU GMP 인증 · 유럽 Virvac(버박) 보비젠 동일 오리지널)</span>
          </div>
          
          <div className="flex justify-center items-center mb-8">
            <div className="bg-gradient-to-r from-emerald-900 via-[#064e3b] to-emerald-900 text-white px-6 sm:px-10 py-5 rounded-3xl border-2 border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.35)] flex flex-wrap md:flex-nowrap items-center justify-between gap-6 transform hover:scale-[1.01] transition-all w-full">
              <div className="flex items-center gap-4 text-left">
                <img src="./eu_gmp_badge.svg" alt="EU GMP 공식 인증 마크" className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 drop-shadow-md" />
                <div>
                  <div className="text-xs sm:text-sm font-black text-[#FFDF00] uppercase tracking-widest leading-none mb-1.5 flex items-center gap-1.5">
                    <span>★ EUROPEAN UNION GMP CERTIFIED ★</span>
                  </div>
                  <div className="text-base sm:text-xl font-black tracking-wide text-white break-keep">
                    유럽 연합(EU) GMP 최고 등급 품질 인증 · 글로벌 동물약품 1위 Virvac(버박) '보비젠(Bovigen Scour)' 유럽 현지 100% 동일 공급 백신
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center shrink-0">
                <img src="./eu_gmp_logo.svg" alt="European Union GMP" className="h-12 w-auto rounded-xl shadow-sm bg-white p-1.5 border border-[#FFD700]/50" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-950 mb-6 leading-tight tracking-tight break-keep">
            송아지 폐사율 감소의 핵심<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600">
              설사예방 3종 혼합백신 로타갈
            </span>
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-10 max-w-5xl mx-auto leading-relaxed break-keep">
            한우 농가의 든든한 파트너. 치명적인 송아지 설사병으로부터<br className="hidden md:block" />농가의 소중한 자산과 수익을 완벽하게 지켜드립니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#inquiry" className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4.5 rounded-full font-black text-lg sm:text-xl transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2 break-keep">
              지역 총판 다이렉트 문의
            </a>
            <a href="#video" className="bg-white hover:bg-gray-50 text-emerald-900 border-2 border-emerald-300 px-8 py-4.5 rounded-full font-black text-lg sm:text-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 break-keep">
              제품 소개 영상 보기
            </a>
          </div>
        </div>
      </section>

      {/* Pain Point Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border-2 border-red-300 rounded-3xl p-8 md:p-12 text-center transform transition-all hover:shadow-xl hover:-translate-y-1 shadow-md">
            <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-6 shrink-0" />
            <h2 className="text-2xl sm:text-4xl font-black text-red-950 mb-4 break-keep">송아지 설사병, 농가의 치명적인 경제적 손실입니다</h2>
            <p className="text-lg sm:text-xl font-bold text-red-950 leading-relaxed max-w-4xl mx-auto break-keep">
              태어난 지 얼마 안 된 송아지에게 발생하는 설사병은 탈수와 영양실조를 유발하여 치사율이 매우 높습니다. 송아지 설사는 폐사로 인한 피해뿐만 아니라 성장 정체와 육질 등급 저하에도 영향을 미쳐 많은 경제적 피해를 초래합니다. 초기 대응과 완벽한 예방만이 한우 농가의 막대한 타격을 막을 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-black text-gray-950 mb-4 break-keep">왜 로타갈이 정답일까요?</h2>
            <p className="text-lg sm:text-xl font-bold text-gray-800 break-keep">3종 혼합백신으로 어미 소에게 접종하여 초유를 통해 강력한 면역력을 전달합니다.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* YouTube Video Player */}
            <div className="flex flex-col bg-white p-4 sm:p-6 rounded-3xl shadow-xl border border-gray-200 justify-between">
              <div>
                <div className="text-center font-black text-base sm:text-xl text-emerald-950 mb-4 flex items-center justify-center gap-2 break-keep">
                  <span className="bg-red-600 text-white px-3 py-0.5 rounded-full text-xs uppercase font-extrabold shadow-sm shrink-0">YouTube</span>
                  <span>로타갈 제품 소개 및 핵심 작용 기전</span>
                </div>
              </div>
              <div className="aspect-w-16 aspect-h-9 bg-gray-900 rounded-2xl overflow-hidden relative shadow-inner w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe 
                  className="absolute top-0 left-0 w-full h-full rounded-2xl"
                  src="https://www.youtube.com/embed/zhsDYNm2Pig?rel=0" 
                  title="로타갈 백신 소개 영상" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
              </div>
            </div>

            {/* Pharmagal Facility Video Player */}
            <div className="flex flex-col bg-white p-4 sm:p-6 rounded-3xl shadow-xl border border-gray-200 justify-between">
              <div>
                <div className="text-center font-black text-base sm:text-xl text-emerald-950 mb-4 flex items-center justify-center gap-2 break-keep">
                  <span className="bg-emerald-700 text-white px-3 py-0.5 rounded-full text-xs uppercase font-extrabold shadow-sm shrink-0">ORIGINAL HD</span>
                  <span>유럽 현지 첨단 바이오 공정 및 품질 증명</span>
                </div>
              </div>
              <div className="aspect-w-16 aspect-h-9 bg-gray-900 rounded-2xl overflow-hidden relative shadow-inner w-full flex items-center justify-center" style={{ paddingBottom: '56.25%' }}>
                <iframe 
                  className="absolute top-0 left-0 w-full h-full rounded-2xl"
                  src="https://www.youtube.com/embed/74oxPVMV1p4?rel=0" 
                  title="유럽 현지 첨단 바이오 공정 영상" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* European Heritage & GMP Showcase Section */}
      <section id="quality-showcase" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-emerald-950/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-emerald-800 to-teal-800 text-[#FFD700] font-black px-6 py-2.5 rounded-full text-base sm:text-lg mb-4 shadow-md border-2 border-[#FFD700]/70">
              <img src="./eu_gmp_badge.svg" alt="EU GMP" className="w-6 h-6 inline-block shrink-0" />
              <span>EUROPEAN UNION GMP CERTIFIED QUALITY</span>
              <img src="./eu_gmp_badge.svg" alt="EU GMP" className="w-6 h-6 inline-block shrink-0" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-950 mb-6 break-keep">
              세계가 인정한 품질: 유럽 명가 파마갈 바이오
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-gray-800 max-w-4xl mx-auto leading-relaxed break-keep">
              로타갈(Rotagal)은 세계적 동물약품 브랜드 <span className="text-emerald-700 underline decoration-2">Virvac(버박)이 유럽 전역에 공급하는 '보비젠(Bovigen Scour)'과 100% 동일한 글로벌 오리지널 프리미엄 백신</span>입니다. 까다로운 유럽 연합 EU GMP 인증 및 대한민국 농림축산검역본부 국가출하승인검정 면제를 획득한 완벽한 품질을 자랑합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Exemption Certificate */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-emerald-500 flex flex-col justify-between transform transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-emerald-100 text-emerald-900 font-black px-4 py-1.5 rounded-full text-sm sm:text-base border border-emerald-300">
                    🏆 국가검역본부 공식 인증
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-500">정부 검정 면제 승인</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-950 mb-3 break-keep">
                  국가출하승인검정 면제 인정서
                </h3>
                <p className="text-gray-800 font-bold text-base sm:text-lg mb-6 leading-relaxed break-keep">
                  매 생산 배치(Batch)마다 유럽 연합의 가장 엄격한 GMP 품질 검증을 완벽히 통과하므로, 대한민국 농림축산검역본부로부터 국가출하승인검정을 면제받은 최고 신뢰도의 오리지널 백신입니다.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden border-2 border-gray-200 bg-gray-100 shadow-inner flex items-center justify-center max-h-80">
                <img src="./exemption_certificate.jpg" alt="국가출하승인검정면제인정서" className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            {/* Card 2: Cold Chain Storage */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-teal-500 flex flex-col justify-between transform transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-teal-100 text-teal-900 font-black px-4 py-1.5 rounded-full text-sm sm:text-base border border-teal-300 flex items-center gap-1.5">
                    ❄️ 완벽 콜드체인 시스템
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">2℃~8℃ 정온 유지</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-950 mb-3 break-keep">
                  유럽 직수입 첨단 정온 보관 시스템
                </h3>
                <p className="text-gray-800 font-bold text-base sm:text-lg mb-6 leading-relaxed break-keep">
                  유럽 슬로바키아 현지 제조소에서부터 대한민국 농가까지 2℃~8℃의 완벽한 콜드체인 시스템으로 직수입됩니다. 제조일로부터 24개월(유럽 현지 36개월)의 넉넉한 유통기한으로 안정적인 재고 관리가 가능합니다.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-2xl overflow-hidden border-2 border-gray-200 bg-gray-100 shadow-inner max-h-[400px]">
                <div className="relative overflow-hidden group/img h-48 sm:h-64">
                  <img src="./rotagal_storage.jpg" alt="콜드체인 보관 시스템" className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-2 left-2 bg-black/75 text-white text-[11px] font-bold px-2 py-1 rounded shadow">첨단 정온 보관</div>
                </div>
                <div className="relative overflow-hidden group/img h-48 sm:h-64 bg-white flex items-center justify-center p-4">
                  <img src="./pharmagal_logo.jpg" alt="파마갈 바이오 로고" className="w-full h-full object-contain group-hover/img:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-2 left-2 bg-teal-900/90 text-teal-200 text-[11px] font-bold px-2 py-1 rounded shadow">유럽 현지 제조소 인증</div>
                </div>
              </div>
            </div>

            {/* Card 3: Pharmagal Facility 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-purple-500 flex flex-col justify-between transform transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-purple-100 text-purple-900 font-black px-4 py-1.5 rounded-full text-sm sm:text-base border border-purple-300">
                    🏭 유럽 현지 연구·제조소
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-500">Pharmagal Bio s.r.o.</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-950 mb-3 break-keep">
                  유럽 동물용의약품 선도 기업 설비
                </h3>
                <p className="text-gray-800 font-bold text-base sm:text-lg mb-6 leading-relaxed break-keep">
                  슬로바키아 니트라(Nitra)에 위치한 파마갈 바이오 연구소는 최첨단 바이오 리액터와 항원 정제 기술을 보유한 유럽 글로벌 백신 명가로, 전 세계에 프리미엄 백신을 공급하고 있습니다.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden border-2 border-gray-200 bg-gray-100 shadow-inner flex items-center justify-center max-h-80">
                <img src="./pharmagal_facility_1.jpg" alt="파마갈 바이오 첨단 연구 설비" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            {/* Card 4: Pharmagal Facility 2 & 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-amber-500 flex flex-col justify-between transform transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-amber-100 text-amber-900 font-black px-4 py-1.5 rounded-full text-sm sm:text-base border border-amber-300">
                    🔬 이중 부형제 공정 시스템
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-500">Montanide Adjuvant</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-950 mb-3 break-keep">
                  고역가 항체 생성 핵심 공정
                </h3>
                <p className="text-gray-800 font-bold text-base sm:text-lg mb-6 leading-relaxed break-keep">
                  국내 유행 82%를 차지하는 G6P5 혈청형을 포함한 최적화 항원과 프랑스 세픽(SEPPIC)사의 특수 이중 부형제(Montanide) 결합 공정을 통해 단 1회 접종만으로 강력한 면역이 지속됩니다.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl overflow-hidden border-2 border-gray-200 bg-gray-100 shadow-inner">
                <div className="relative h-80 sm:h-[350px] overflow-hidden">
                  <img src="./montanide_1.png" alt="프랑스 세픽(SEPPIC)사 Montanide 이중 부형제 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="relative h-80 sm:h-[350px] overflow-hidden">
                  <img src="./montanide_2.png" alt="프랑스 세픽(SEPPIC)사 Montanide 이중 부형제 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Core Infographic Section */}
      <RotagalInfographic />

      {/* Features Bento Grid */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-gray-950 mb-4 break-keep">로타갈(보비젠)의 독보적 장점</h2>
            <p className="text-xl sm:text-2xl font-bold text-gray-800 break-keep">타사 제품과 비교할 수 없는 프리미엄 백신의 품질</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 sm:p-10 rounded-3xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col items-center sm:items-start text-center sm:text-left border-2 border-emerald-200 shadow-sm">
              <Award className="w-12 h-12 text-emerald-600 mb-6 shrink-0" />
              <h3 className="text-2xl sm:text-3xl font-black text-emerald-950 mb-4 break-keep">EU GMP 프리미엄 품질</h3>
              <p className="text-emerald-950 text-lg sm:text-xl font-bold leading-relaxed break-keep">
                까다로운 유럽의 품질 관리 기준(EU GMP)을 통과한 오리지널 백신으로 한 차원 높은 안전성과 신뢰성을 보장합니다. 세계가 인정한 3대 원인체 통합 방어 솔루션입니다.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 sm:p-10 rounded-3xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col items-center sm:items-start text-center sm:text-left border-2 border-teal-200 shadow-sm">
              <Shield className="w-12 h-12 text-teal-600 mb-6 shrink-0" />
              <h3 className="text-2xl sm:text-3xl font-black text-teal-950 mb-4 break-keep">탁월한 교차면역 및 고역가</h3>
              <p className="text-teal-950 text-lg sm:text-xl font-bold leading-relaxed break-keep">
                국내 발생 82%를 차지하는 G6P5 및 G6P1 로타바이러스에 방어효과가 탁월하며, 대장균(E. coli K99 F5)과 코로나(Corona C-197KWD20 고급 항체 타이터) 예방을 강력하게 지원합니다.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 sm:p-10 rounded-3xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col items-center sm:items-start text-center sm:text-left border-2 border-purple-200 shadow-sm">
              <Clock className="w-12 h-12 text-purple-600 mb-6 shrink-0" />
              <h3 className="text-2xl sm:text-3xl font-black text-purple-950 mb-4 break-keep">길고 여유로운 유통기한</h3>
              <p className="text-purple-950 text-lg sm:text-xl font-bold leading-relaxed break-keep">
                제조일로부터 24개월의 넉넉한 유통기한(유럽 현지 36개월)으로 농가에서 보관 및 관리가 경쟁 제품 대비 훨씬 용이하여 재고 관리 효율을 대폭 높여줍니다.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 sm:p-10 rounded-3xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col items-center sm:items-start text-center sm:text-left border-2 border-orange-200 shadow-sm">
              <Syringe className="w-12 h-12 text-orange-600 mb-6 shrink-0" />
              <h3 className="text-2xl sm:text-3xl font-black text-orange-950 mb-4 break-keep">편리한 일괄 원샷 접종</h3>
              <p className="text-orange-950 text-lg sm:text-xl font-bold leading-relaxed break-keep">
                유럽 표준 권장 가이드라인에 따라 분만전 3주~12주 사이 임신우에 1두분(3mL)을 단 1회 일괄 접종(원샷)합니다. 번거로운 다회 접종을 없애 노동력과 관리 비용을 획기적으로 줄여줍니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 bg-emerald-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black mb-4 break-keep">전국 농장주님들의 생생한 후기</h2>
            <p className="text-emerald-100 text-lg sm:text-xl font-bold break-keep">이미 많은 농가에서 로타갈의 효과를 경험하고 계십니다</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "로타갈 3종 혼합백신으로 바꾸고 나서 송아지 설사병 걱정이 싹 사라졌습니다. 백신 하나 바꿨을 뿐인데 농장 운영이 훨씬 수월해요!", author: "충남 천안 농장주님" },
              { text: "우리 동네 수의사님이 적극 추천하셔서 써봤는데, 확실히 EU GMP 인증받은 오리지널이라 그런지 든든하고 결과도 대만족입니다.", author: "경북 상주 농장주님" },
              { text: "유럽의 까다로운 품질 관리 기준을 거친 프리미엄 백신이라 역시 다르더군요. 주변 농가 모임에서도 계속해서 추천하고 있습니다.", author: "전북 정읍 농장주님" }
            ].map((review, idx) => (
              <div key={idx} className="bg-emerald-800/60 p-8 sm:p-10 rounded-3xl border-2 border-emerald-600/80 relative flex flex-col items-center sm:items-start text-center sm:text-left shadow-lg">
                <div className="text-emerald-400 text-4xl font-serif absolute top-6 right-8 opacity-50">"</div>
                <div className="flex text-yellow-400 mb-6">
                  {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                </div>
                <p className="text-lg sm:text-xl leading-relaxed text-white mb-8 font-bold relative z-10 break-keep">"{review.text}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center font-black text-white shadow-md text-lg shrink-0">
                    {review.author.substring(0, 2)}
                  </div>
                  <span className="font-extrabold text-white text-base sm:text-lg">{review.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Distributors Table */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border-2 border-gray-300">
            <h2 className="text-3xl sm:text-5xl font-black text-center text-gray-950 mb-4 break-keep">전국 도별 총판 안내</h2>
            <p className="text-center text-lg sm:text-xl font-bold text-gray-800 mb-10 break-keep">가까운 지역의 총판으로 연락하시면 더욱 빠르고 친절하게 안내받으실 수 있습니다.</p>
            
            <div className="sm:hidden text-xs text-emerald-700 font-bold mb-3 text-center bg-emerald-50 py-2.5 rounded-xl border border-emerald-200 shadow-2xs">
              👆 표를 좌우로 스크롤하여 전체 총판 연락처를 확인하세요
            </div>
            <div className="overflow-x-auto rounded-2xl border-2 border-gray-300 shadow-sm">
              <table className="w-full text-center border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-emerald-100 border-b-2 border-emerald-300">
                    <th className="py-4 px-6 font-black text-emerald-950 text-base sm:text-lg whitespace-nowrap text-center">지역</th>
                    <th className="py-4 px-6 font-black text-emerald-950 text-base sm:text-lg whitespace-nowrap text-center">상호명</th>
                    <th className="py-4 px-6 font-black text-emerald-950 text-base sm:text-lg whitespace-nowrap text-center">대표</th>
                    <th className="py-4 px-6 font-black text-emerald-950 text-base sm:text-lg whitespace-nowrap text-center">전화번호</th>
                    <th className="py-4 px-6 font-black text-emerald-950 text-base sm:text-lg whitespace-nowrap text-center">휴대전화</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-gray-200">
                  {distributors.map((item, idx) => (
                    <tr key={idx} className="hover:bg-emerald-50/70 transition-colors">
                      <td className="py-4 px-6 font-extrabold text-emerald-800 text-base sm:text-lg whitespace-nowrap">{item.region}</td>
                      <td className="py-4 px-6 font-black text-gray-950 text-base sm:text-lg whitespace-nowrap">{item.name}</td>
                      <td className="py-4 px-6 font-bold text-gray-800 text-base sm:text-lg whitespace-nowrap">{item.rep}</td>
                      <td className="py-4 px-6 whitespace-nowrap"><a href={`tel:${item.tel}`} className="font-bold text-gray-800 hover:text-emerald-700 text-base sm:text-lg">{item.tel}</a></td>
                      <td className="py-4 px-6 whitespace-nowrap"><a href={`tel:${item.phone}`} className="font-black text-emerald-800 hover:text-emerald-950 text-base sm:text-lg underline decoration-emerald-400 underline-offset-4">{item.phone}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Advisor Call Banner & Form */}
      <section id="inquiry" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-3xl p-10 text-center shadow-2xl text-white transform transition-all hover:scale-105">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <CheckCircle2 className="w-10 h-10 text-emerald-300" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black mb-4 break-keep">친근한 이웃 수의사<br/><span className="text-emerald-300">고문수의사 젬스홍</span></h3>
              <p className="text-emerald-100 mb-8 opacity-100 font-bold text-lg sm:text-xl break-keep">제품에 대한 상세한 학술 문의나<br/>백신 접종 상담을 원하신다면</p>
              <a href="tel:010-5407-5708" className="inline-block bg-white text-emerald-950 text-2xl sm:text-3xl font-black py-4 px-10 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all transform hover:-translate-y-1">
                010-5407-5708
              </a>
              <p className="mt-4 text-base font-bold text-emerald-200">터치하시면 바로 전화 연결됩니다</p>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-gray-50 p-5 sm:p-8 md:p-12 rounded-3xl shadow-lg border-2 border-gray-300">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-950 mb-2 break-keep">빠른 제품 상담 문의</h2>
              <p className="text-gray-800 font-bold text-lg mb-8 break-keep">지역을 선택해주시면 담당 지역 총판으로 다이렉트 연결을 도와드립니다.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-black text-gray-900 mb-2">농장주 성함</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-400 font-bold text-gray-900 text-base sm:text-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition-all bg-white" placeholder="홍길동" />
                  </div>
                  <div>
                    <label className="block text-base font-black text-gray-900 mb-2">연락처</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-400 font-bold text-gray-900 text-base sm:text-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition-all bg-white" placeholder="010-0000-0000" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-black text-gray-900 mb-2">소재지 (지역 선택)</label>
                    <div className="relative">
                      <select name="region" value={formData.region} onChange={handleChange} required className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-400 font-bold text-gray-900 text-base sm:text-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none appearance-none transition-all bg-white">
                        <option value="">지역을 선택해주세요</option>
                        <option value="경기도">경기도</option>
                        <option value="강원도">강원도</option>
                        <option value="충청북도">충청북도</option>
                        <option value="충청남도 (북부)">충청남도 (북부)</option>
                        <option value="충청남도 (남부)">충청남도 (남부)</option>
                        <option value="경상북도">경상북도</option>
                        <option value="경상남도">경상남도</option>
                        <option value="전라도">전라도</option>
                        <option value="제주도">제주도</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none stroke-[2.5]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-base font-black text-gray-900 mb-2">사육 두수 (선택)</label>
                    <input type="text" name="farmSize" value={formData.farmSize} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-400 font-bold text-gray-900 text-base sm:text-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition-all bg-white" placeholder="예: 100두" />
                  </div>
                </div>

                <div>
                  <label className="block text-base font-black text-gray-900 mb-2">문의 내용</label>
                  <textarea name="inquiry" value={formData.inquiry} onChange={handleChange} rows="4" className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-400 font-bold text-gray-900 text-base sm:text-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition-all bg-white resize-none" placeholder="궁금하신 점이나 상담 요청 사항을 남겨주세요."></textarea>
                </div>
                
                <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black text-lg sm:text-xl py-5 rounded-xl shadow-xl hover:shadow-2xl transform transition-all hover:-translate-y-1 flex justify-center items-center gap-2 break-keep">
                  <Send className="w-6 h-6 shrink-0" /> 담당 지역 총판에 문의 접수하기
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Harmonious Footer */}
      <footer className="bg-gradient-to-b from-emerald-950 via-[#061812] to-[#030d0a] text-emerald-100 py-14 px-4 sm:px-6 lg:px-8 border-t-4 border-emerald-600 shadow-2xl relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Top Row: Brand & Tagline */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-8 border-b border-emerald-800/80 gap-6">
            <div className="flex items-center gap-3">
              <img src="./pharmagal_logo.jpg" alt="Pharmagal Bio Logo" className="h-10 sm:h-12 w-auto object-contain rounded-lg bg-white p-1 shadow-md border border-emerald-300" />
              <div className="flex flex-col text-left">
                <span className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">Rotagal</span>
                <span className="text-xs font-extrabold text-emerald-400 tracking-wider uppercase mt-1">송아지 설사예방 3종 혼합백신</span>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <span className="inline-flex items-center gap-2 bg-emerald-900/90 border border-emerald-700 text-emerald-200 px-4 py-2 rounded-full text-xs sm:text-sm font-black shadow-sm break-keep">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" /> 유럽연합(EU) GMP 품질 인증 · 한국 농림축산검역본부 허가
              </span>
            </div>
          </div>

          {/* Middle Row: Detailed Company & Veterinary Registration Info (2 Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8 text-left text-xs sm:text-sm font-semibold leading-relaxed text-emerald-200/90 break-keep">
            {/* Left Column: Distributor Info (Korea Agro) */}
            <div className="space-y-2 bg-emerald-900/30 p-5 rounded-2xl border border-emerald-800/60 shadow-inner">
              <div className="font-black text-white text-sm sm:text-base mb-3 flex items-center gap-2 border-b border-emerald-800/60 pb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                <span>(주)한국아그로 | 고문수의사 제임스 홍</span>
              </div>
              <p><strong className="text-emerald-300">주소:</strong> 서울특별시 마포구 큰우물로 75 성지빌딩 1506호</p>
              <p><strong className="text-emerald-300">TEL:</strong> 02-6949-5706 | <strong className="text-emerald-300">Mobile:</strong> 010-5407-5708</p>
              <p><strong className="text-emerald-300">이메일:</strong> info@agrokorea.kr | <strong className="text-emerald-300">웹사이트:</strong> <a href="http://www.agrokorea.kr" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">www.agrokorea.kr</a></p>
              <p className="text-emerald-400 font-bold pt-1">🚜 한우 농가 전담 수의 기술 자문 및 전국 총판 다이렉트 공급</p>
            </div>

            {/* Right Column: Manufacturer & Veterinary Drug Registration */}
            <div className="space-y-2 bg-emerald-900/30 p-5 rounded-2xl border border-emerald-800/60 shadow-inner">
              <div className="font-black text-white text-sm sm:text-base mb-3 flex items-center gap-2 border-b border-emerald-800/60 pb-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
                <span>동물용의약품 허가 및 제조원 정보</span>
              </div>
              <p><strong className="text-emerald-300">제조원:</strong> Pharmagal Bio, s.r.o. (슬로바키아, 유럽연합 제조소 승인번호 SK 82024 / Virvac(버박) 보비젠 공동 생산 제조소)</p>
              <p><strong className="text-emerald-300">수입·판매원:</strong> (주)한국아그로 / 동물용의약품 수입품목 허가제품 (국가출하승인검정 면제 승인)</p>
              <p><strong className="text-emerald-300">허가번호:</strong> 동물용의약품 수입품목 허가 제 362-2호</p>
              <p><strong className="text-emerald-300">품목명:</strong> 로타갈 (ROTAGAL) - 소 로타·코로나·대장균성 설사 예방 불활화 혼합백신</p>
              <p><strong className="text-emerald-300">제형 및 성상:</strong> 생물학적제제 / 보관 중 침전물을 형성할 수 있는 백색의 현탁액</p>
              <p><strong className="text-emerald-300">용법·용량:</strong> 본제 1두분(3mL) 근육 접종 (임신우 분만 전 3주~12주 사이 단 1회 일괄 접종)</p>
              <p><strong className="text-emerald-300">원료약품 및 분량(유효성분, 1두분 3mL 기준):</strong> 소 로타바이러스(TM-91) 6.0 log₂ VNT 이상, 소 코로나바이러스(C-197) 5 log₂ HI 이상, 대장균주 F5(K99) 흡착소 ELISA 억제역가 45.2% 이상</p>
              <p><strong className="text-emerald-300">저장방법 및 유효기간:</strong> 2~8℃ 암소보관 (동결금지, 개봉 후 10시간 이내 사용) / 제조일로부터 24개월 (유럽 현지 36개월)</p>
            </div>
          </div>

          {/* Bottom Banner Box (Like screenshot 3) */}
          <div className="mt-2 pt-6 border-t border-emerald-800/80">
            <div className="bg-gradient-to-r from-emerald-900 via-[#063827] to-emerald-900 border-2 border-[#FFD700] rounded-2xl p-6 shadow-[0_0_30px_rgba(255,215,0,0.2)] flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-center gap-4 text-left relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-[#FFE53B] to-[#FFA800] rounded-2xl flex items-center justify-center border-2 border-white shadow-md shrink-0">
                  <span className="text-2xl sm:text-3xl">🐄</span>
                </div>
                <div>
                  <div className="text-[#FFDF00] text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-0.5 flex items-center gap-1.5">
                    <span>★ 전국 한우 농가 공식 파트너 · EU GMP 공식 품질 마크</span>
                  </div>
                  <div className="text-white text-base sm:text-xl font-black break-keep">송아지 폐사율 0%를 향한 시작, 로타갈이 함께합니다</div>
                </div>
              </div>
              <a 
                href="#inquiry" 
                className="w-full sm:w-auto bg-gradient-to-r from-[#FFE53B] via-[#FFDF00] to-[#FFA800] hover:from-[#FFF066] hover:to-[#FFB800] text-gray-950 font-black px-8 py-4.5 rounded-xl text-base sm:text-lg shadow-[0_4px_25px_rgba(255,215,0,0.5)] hover:shadow-[0_6px_30px_rgba(255,215,0,0.7)] border-2 border-[#FFF066] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 shrink-0 break-keep relative z-10"
              >
                <span>🚜 지역 총판 상담하기</span>
                <ArrowRight className="w-6 h-6 stroke-[3] text-gray-950" />
              </a>
            </div>
            
            <div className="mt-8 text-center text-xs text-emerald-400/70 font-medium">
              ⓒ 2026 Korea Agro & Pharmagal Bio. All rights reserved. 본 웹사이트의 모든 콘텐츠는 저작권법의 보호를 받습니다.
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chatbot Floating Action Button & Window */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {isChatOpen ? (
          <div className="bg-white w-[350px] sm:w-[400px] h-[550px] rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden transform transition-all duration-300 origin-bottom-right mb-4">
            <div className="bg-emerald-700 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">로타갈 수의사 AI</h3>
                  <p className="text-xs text-emerald-200">24시간 전문 수의 상담 대기중</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-emerald-100 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed break-keep ${
                    msg.role === 'user' 
                      ? 'bg-emerald-600 text-white rounded-tr-sm' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {/* Quick Replies */}
              <div className="flex flex-wrap gap-2 mt-4">
                <button onClick={() => handleQuickReply('로타갈의 가장 큰 장점은 무엇인가요?')} className="bg-white border border-emerald-200 text-emerald-700 text-xs px-3 py-1.5 rounded-full hover:bg-emerald-50 transition-colors shadow-sm">장점이 뭔가요?</button>
                <button onClick={() => handleQuickReply('접종 시기와 방법이 궁금합니다.')} className="bg-white border border-emerald-200 text-emerald-700 text-xs px-3 py-1.5 rounded-full hover:bg-emerald-50 transition-colors shadow-sm">언제 접종하나요?</button>
                <button onClick={() => handleQuickReply('유통기한은 얼마나 되나요?')} className="bg-white border border-emerald-200 text-emerald-700 text-xs px-3 py-1.5 rounded-full hover:bg-emerald-50 transition-colors shadow-sm">유통기한?</button>
              </div>
            </div>
            
            <form onSubmit={handleChatSubmit} className="p-4 bg-white border-t border-gray-100 flex gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="수의사 AI에게 궁금한 점을 질문해보세요..." 
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button type="submit" className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors shrink-0 shadow-md">
                <Send className="w-4 h-4 ml-1" />
              </button>
            </form>
          </div>
        ) : (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="w-16 h-16 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl flex items-center justify-center transform transition-all hover:scale-110 hover:-translate-y-2 animate-bounce"
          >
            <MessageCircle className="w-8 h-8" />
          </button>
        )}
      </div>
    </div>
  );
}
