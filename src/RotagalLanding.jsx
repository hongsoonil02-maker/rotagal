import React, { useState, useEffect } from 'react';
import { Shield, Clock, Syringe, Award, MessageCircle, X, Send, ChevronDown, CheckCircle2, AlertCircle, ArrowRight, ExternalLink, FileText } from 'lucide-react';
import RotagalInfographic from './RotagalInfographic';
import { translations } from './translations';

export default function RotagalLanding() {
  const [lang, setLang] = useState('ko');
  const t = translations[lang];

  const [formData, setFormData] = useState({ name: '', phone: '', farmSize: '', inquiry: '', region: '' });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', content: translations.ko.chatbot.initialMsg }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setChatMessages([
      { role: 'ai', content: t.chatbot.initialMsg }
    ]);
  }, [lang]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.region) {
      alert(t.inquiry.alertRegion);
      return;
    }
    const dist = t.contact.distributors.find(d => d.region.includes(formData.region) || formData.region.includes(d.region));
    if (dist) {
      alert(`${t.inquiry.alertSuccess1}${dist.region}${t.inquiry.alertSuccess2}${dist.name}${t.inquiry.alertSuccess3}${dist.phone}${t.inquiry.alertSuccess4}`);
    } else {
      alert(t.inquiry.alertSuccessDefault);
    }
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages([...chatMessages, { role: 'user', content: chatInput }]);

    setTimeout(() => {
      let aiResponse = t.chatbot.defaultResponse;
      if (chatInput.includes('유통기한') || chatInput.includes('기한') || chatInput.toLowerCase().includes('shelf') || chatInput.toLowerCase().includes('trvan') || chatInput.toLowerCase().includes('термін') || chatInput.toLowerCase().includes('придатн')) {
        aiResponse = t.chatbot.expiryResponse;
      } else if (chatInput.includes('접종') || chatInput.includes('언제') || chatInput.toLowerCase().includes('vaccin') || chatInput.toLowerCase().includes('očkov') || chatInput.toLowerCase().includes('dávk') || chatInput.toLowerCase().includes('вакцин') || chatInput.toLowerCase().includes('щепл') || chatInput.toLowerCase().includes('коли') || chatInput.toLowerCase().includes('доза')) {
        aiResponse = t.chatbot.dosageResponse;
      } else if (chatInput.includes('효과') || chatInput.includes('장점') || chatInput.toLowerCase().includes('benefit') || chatInput.toLowerCase().includes('výhod') || chatInput.toLowerCase().includes('advanta') || chatInput.toLowerCase().includes('переваг') || chatInput.toLowerCase().includes('чому') || chatInput.toLowerCase().includes('ефект')) {
        aiResponse = t.chatbot.benefitsResponse;
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
          <div className="flex justify-between items-center h-16 sm:h-20">
            <a href="#" className="flex items-center gap-3 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 group py-1">
              <div className="bg-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg shadow-sm border border-emerald-200 group-hover:border-emerald-400 transition-all shrink-0 flex items-center">
                <img src="./pharmagal_logo.jpg" alt="Pharmagal Bio Logo" className="h-5 sm:h-6 w-auto object-contain" />
              </div>
              <div className="flex flex-col justify-center items-center text-center">
                <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                  <span className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">{t.header?.brandKo || '로타갈'}</span>
                  <span className="text-base sm:text-lg font-extrabold text-emerald-700 tracking-tight leading-none">{t.header?.brandEn || 'Rotagal'}</span>
                </div>
                <div className="flex justify-center mt-1">
                  <span className="text-[10px] sm:text-xs font-black bg-gradient-to-r from-emerald-100 to-amber-100 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-300 shadow-2xs leading-none">{t.header?.badge || 'EU GMP 공식인증'}</span>
                </div>
              </div>
            </a>
            <div className="hidden md:flex gap-6 lg:gap-8 items-center">
              <a href="#infographic" className="text-gray-600 hover:text-emerald-700 font-semibold transition-colors">{t.nav.infographic}</a>
              <a href="#features" className="text-gray-600 hover:text-emerald-700 font-semibold transition-colors">{t.nav.features}</a>
              <a href="#reviews" className="text-gray-600 hover:text-emerald-700 font-semibold transition-colors">{t.nav.reviews}</a>
              <a href="#contact" className="text-gray-600 hover:text-emerald-700 font-semibold transition-colors">{t.nav.contact}</a>

              {/* Navbar Language Toggle */}
              <div className="inline-flex items-center bg-gray-100 border border-gray-200 p-0.5 rounded-full shadow-2xs">
                <button onClick={() => setLang('ko')} className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${lang === 'ko' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-gray-600 hover:text-emerald-800'}`}>KR</button>
                <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-gray-600 hover:text-emerald-800'}`}>EN</button>
                <button onClick={() => setLang('sk')} className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${lang === 'sk' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-gray-600 hover:text-emerald-800'}`}>SK</button>
                <button onClick={() => setLang('uk')} className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${lang === 'uk' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-gray-600 hover:text-emerald-800'}`}>UA</button>
              </div>

              <a href="#inquiry" className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">{t.nav.inquiry}</a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-emerald-700 focus:outline-none p-2"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg absolute w-full left-0">
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              <a href="#infographic" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-bold text-gray-800 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg">{t.nav.infographic}</a>
              <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-bold text-gray-800 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg">{t.nav.features}</a>
              <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-bold text-gray-800 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg">{t.nav.reviews}</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 text-base font-bold text-gray-800 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg">{t.nav.contact}</a>

              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 pt-2 pb-1 border-t border-gray-100 mt-2">
                <button onClick={() => { setLang('ko'); setIsMobileMenuOpen(false); }} className={`px-3.5 py-1.5 rounded-full text-xs font-bold ${lang === 'ko' ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-700'}`}>한국어</button>
                <button onClick={() => { setLang('en'); setIsMobileMenuOpen(false); }} className={`px-3.5 py-1.5 rounded-full text-xs font-bold ${lang === 'en' ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-700'}`}>English</button>
                <button onClick={() => { setLang('sk'); setIsMobileMenuOpen(false); }} className={`px-3.5 py-1.5 rounded-full text-xs font-bold ${lang === 'sk' ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-700'}`}>Slovenčina</button>
                <button onClick={() => { setLang('uk'); setIsMobileMenuOpen(false); }} className={`px-3.5 py-1.5 rounded-full text-xs font-bold ${lang === 'uk' ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-700'}`}>Українська</button>
              </div>

              <a href="#inquiry" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-3 mt-4 text-center text-base font-black bg-emerald-700 text-white rounded-xl shadow-md">{t.nav.inquiry}</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-28 pb-10 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-white to-green-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-0 left-0 mt-20 -ml-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-6xl mx-auto text-center relative z-10 pt-4 lg:pt-8">
          <div className="flex justify-center items-center mb-8">
            <div className="bg-gradient-to-r from-emerald-900 via-[#064e3b] to-emerald-900 text-white px-6 sm:px-10 py-5 rounded-3xl border-2 border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.35)] flex flex-wrap md:flex-nowrap items-center justify-between gap-6 transform hover:scale-[1.01] transition-all w-full">
              <div className="flex items-center gap-4 text-left">
                <img src="./eu_gmp_badge.svg" alt="EU GMP 공식 인증 마크" className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 drop-shadow-md" />
                <div>
                  <div className="text-xs sm:text-sm font-black text-[#FFDF00] uppercase tracking-widest leading-none mb-1.5 flex items-center gap-1.5">
                    <span>{t.hero.bannerTitle}</span>
                  </div>
                  <div className="text-base sm:text-xl font-black tracking-wide text-white break-keep">
                    {t.hero.bannerDesc}
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center shrink-0">
                <img src="./eu_gmp_logo.svg" alt="European Union GMP" className="h-12 w-auto rounded-xl shadow-sm bg-white p-1.5 border border-[#FFD700]/50" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-950 mb-6 leading-tight tracking-tight break-keep">
            {t.hero.title1}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600">
              {t.hero.title2}
            </span> {t.hero.title3 && <span className="text-3xl sm:text-5xl lg:text-6xl text-gray-900">{t.hero.title3}</span>}
          </h1>
          {/* Rotagal Logo showcase to reinforce brand identity */}
          <div className="flex justify-center items-center gap-6 mb-8">
            <img src="./pharmagal_logo.jpg" alt="Rotagal 로고" className="h-12 sm:h-16 w-auto object-contain" />
            <span className="text-sm sm:text-base font-medium text-gray-700">|</span>
            <img src="./eu_gmp_logo.svg" alt="EU GMP 인증 로고" className="h-12 sm:h-16 w-auto object-contain" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-10 max-w-5xl mx-auto leading-relaxed break-keep">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
            <a href="#inquiry" className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4.5 rounded-full font-black text-lg sm:text-xl transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2 break-keep">
              {t.hero.btnInquiry}
            </a>
            <a href="#video" className="bg-white hover:bg-gray-50 text-emerald-900 border-2 border-emerald-300 px-8 py-4.5 rounded-full font-black text-lg sm:text-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 break-keep">
              {t.hero.btnVideo}
            </a>
            <a href="./rotagal_leaflet.pdf" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-amber-500 to-[#FFD700] hover:from-amber-600 hover:to-amber-500 text-gray-950 px-8 py-4.5 rounded-full font-black text-lg sm:text-xl transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2 break-keep border-2 border-amber-600/30">
              <FileText className="w-6 h-6 shrink-0" />
              <span>{t.hero.btnLeaflet}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Pain Point Section */}
      <section className="py-0 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border-2 border-red-300 rounded-3xl p-8 md:p-12 text-center transform transition-all hover:shadow-xl hover:-translate-y-1 shadow-md">
            <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-6 shrink-0" />
            <h2 className="text-2xl sm:text-4xl font-black text-red-950 mb-4 break-keep">{t.painPoint.title}</h2>
            <p className="text-lg sm:text-xl font-bold text-red-950 leading-relaxed max-w-4xl mx-auto break-keep">
              {t.painPoint.desc}
            </p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="pt-10 sm:pt-24 pb-6 sm:pb-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-5xl font-black text-gray-950 mb-4 break-keep">{t.video.title}</h2>
            <p className="text-lg sm:text-xl font-bold text-gray-800 break-keep">{t.video.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* YouTube Video Player */}
            <div className="flex flex-col bg-white p-4 sm:p-6 rounded-3xl shadow-xl border border-gray-200 justify-between">
              <div>
                <div className="text-center font-black text-base sm:text-xl text-emerald-950 mb-4 flex items-center justify-center gap-2 break-keep">
                  <span className="bg-red-600 text-white px-3 py-0.5 rounded-full text-xs uppercase font-extrabold shadow-sm shrink-0">{t.video.yt1Badge}</span>
                  <span>{t.video.yt1Title}</span>
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
                  <span className="bg-emerald-700 text-white px-3 py-0.5 rounded-full text-xs uppercase font-extrabold shadow-sm shrink-0">{t.video.yt2Badge}</span>
                  <span>{t.video.yt2Title}</span>
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
      <section id="quality-showcase" className="pt-4 sm:pt-8 pb-10 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-emerald-950/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-emerald-800 to-teal-800 text-[#FFD700] font-black px-6 py-2.5 rounded-full text-base sm:text-lg mb-4 shadow-md border-2 border-[#FFD700]/70">
              <img src="./eu_gmp_badge.svg" alt="EU GMP" className="w-6 h-6 inline-block shrink-0" />
              <span>{t.qualityShowcase.badge}</span>
              <img src="./eu_gmp_badge.svg" alt="EU GMP" className="w-6 h-6 inline-block shrink-0" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-gray-950 mb-6 break-keep">
              {t.qualityShowcase.title}
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-gray-800 max-w-4xl mx-auto leading-relaxed break-keep">
              {t.qualityShowcase.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Exemption Certificate */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-emerald-500 flex flex-col justify-between transform transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
                  <span className="bg-emerald-100 text-emerald-900 font-black px-4 py-1.5 rounded-full text-sm sm:text-base border border-emerald-300 whitespace-nowrap break-keep shrink-0">
                    {t.qualityShowcase.card1Badge}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-500 whitespace-nowrap break-keep shrink-0">{t.qualityShowcase.card1Sub}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-950 mb-3 break-keep">
                  {t.qualityShowcase.card1Title}
                </h3>
                <p className="text-gray-800 font-bold text-base sm:text-lg mb-6 leading-relaxed break-keep">
                  {t.qualityShowcase.card1Desc}
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden border-2 border-gray-200 bg-gray-100 shadow-inner flex items-center justify-center max-h-80">
                <img src="./exemption_certificate.jpg" alt="국가출하승인검정면제인정서" className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            {/* Card 2: Cold Chain Storage */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-teal-500 flex flex-col justify-between transform transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
                  <span className="bg-teal-100 text-teal-900 font-black px-4 py-1.5 rounded-full text-sm sm:text-base border border-teal-300 flex items-center gap-1.5 whitespace-nowrap break-keep shrink-0">
                    {t.qualityShowcase.card2Badge}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200 whitespace-nowrap break-keep shrink-0">{t.qualityShowcase.card2Sub}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-950 mb-3 break-keep">
                  {t.qualityShowcase.card2Title}
                </h3>
                <p className="text-gray-800 font-bold text-base sm:text-lg mb-6 leading-relaxed break-keep">
                  {t.qualityShowcase.card2Desc}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-2xl overflow-hidden border-2 border-gray-200 bg-gray-100 shadow-inner max-h-[400px]">
                <div className="relative overflow-hidden group/img h-48 sm:h-64">
                  <img src="./rotagal_storage.jpg" alt="콜드체인 보관 시스템" className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-2 left-2 bg-black/75 text-white text-[11px] font-bold px-2 py-1 rounded shadow">{t.qualityShowcase.card2Img1}</div>
                </div>
                <div className="relative overflow-hidden group/img h-48 sm:h-64 bg-white flex items-center justify-center p-4">
                  <img src="./pharmagal_logo.jpg" alt="파마갈 바이오 로고" className="w-full h-full object-contain group-hover/img:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-2 left-2 bg-teal-900/90 text-teal-200 text-[11px] font-bold px-2 py-1 rounded shadow">{t.qualityShowcase.card2Img2}</div>
                </div>
              </div>
            </div>

            {/* Card 3: Pharmagal Facility 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-purple-500 flex flex-col justify-between transform transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
                  <span className="bg-purple-100 text-purple-900 font-black px-4 py-1.5 rounded-full text-sm sm:text-base border border-purple-300 whitespace-nowrap break-keep shrink-0">
                    {t.qualityShowcase.card3Badge}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-500 whitespace-nowrap break-keep shrink-0">{t.qualityShowcase.card3Sub}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-950 mb-3 break-keep">
                  {t.qualityShowcase.card3Title}
                </h3>
                <p className="text-gray-800 font-bold text-base sm:text-lg mb-6 leading-relaxed break-keep">
                  {t.qualityShowcase.card3Desc}
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden border-2 border-gray-200 bg-gray-100 shadow-inner flex items-center justify-center max-h-80">
                <img src="./pharmagal_facility_1.jpg" alt="파마갈 바이오 첨단 연구 설비" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            {/* Card 4: Pharmagal Facility 2 & 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-amber-500 flex flex-col justify-between transform transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
                  <span className="bg-amber-100 text-amber-900 font-black px-4 py-1.5 rounded-full text-sm sm:text-base border border-amber-300 whitespace-nowrap break-keep shrink-0">
                    {t.qualityShowcase.card4Badge}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-gray-500 whitespace-nowrap break-keep shrink-0">{t.qualityShowcase.card4Sub}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-950 mb-3 break-keep">
                  {t.qualityShowcase.card4Title}
                </h3>
                <p className="text-gray-800 font-bold text-base sm:text-lg mb-6 leading-relaxed break-keep">
                  {t.qualityShowcase.card4Desc}
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

          {/* Direct Verification Banner for Bovigen Scour */}
          <div className="mt-12 bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#FFD700]/60 text-white flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="w-full xl:flex-1 text-left z-10">
              <div className="inline-flex items-center gap-2 bg-[#FFD700]/20 text-[#FFD700] px-3.5 py-1 rounded-full text-xs sm:text-sm font-black mb-3 border border-[#FFD700]/40">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{t.qualityShowcase.verifyBadge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 break-keep">
                {t.qualityShowcase.verifyTitle}
              </h3>
              <p className="text-emerald-100 font-medium text-base sm:text-lg leading-relaxed max-w-4xl break-keep">
                {t.qualityShowcase.verifyDesc}
              </p>
            </div>
            <div className="w-full xl:w-auto shrink-0 z-10 flex flex-col sm:flex-row xl:flex-col gap-3.5 justify-center">
              <a
                href="https://vet-uk.virbac.com/home/products/farm-animals/vaccines/bovigen.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#FFD700] to-amber-400 hover:from-amber-400 hover:to-[#FFD700] text-gray-950 font-black px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-base sm:text-lg w-full sm:flex-1 xl:w-auto break-keep text-center"
              >
                <span>{t.qualityShowcase.verifyBtn}</span>
                <ExternalLink className="w-5 h-5 shrink-0" />
              </a>
              <a
                href="./rotagal_leaflet.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border-2 border-white/40 text-white font-black px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-base sm:text-lg w-full sm:flex-1 xl:w-auto break-keep text-center"
              >
                <span>{t.qualityShowcase.leafletBtn}</span>
                <FileText className="w-5 h-5 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Core Infographic Section */}
      <RotagalInfographic lang={lang} t={t.infographic} />

      {/* Features Bento Grid */}
      <section id="features" className="py-10 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-gray-950 mb-4 break-keep">{t.features.title}</h2>
            <p className="text-xl sm:text-2xl font-bold text-gray-800 break-keep">{t.features.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 sm:p-10 rounded-3xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col items-center sm:items-start text-center sm:text-left border-2 border-emerald-200 shadow-sm">
              <Award className="w-12 h-12 text-emerald-600 mb-6 shrink-0" />
              <h3 className="text-2xl sm:text-3xl font-black text-emerald-950 mb-4 break-keep">{t.features.item1Title}</h3>
              <p className="text-emerald-950 text-lg sm:text-xl font-bold leading-relaxed break-keep">
                {t.features.item1Desc}
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 sm:p-10 rounded-3xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col items-center sm:items-start text-center sm:text-left border-2 border-teal-200 shadow-sm">
              <Shield className="w-12 h-12 text-teal-600 mb-6 shrink-0" />
              <h3 className="text-2xl sm:text-3xl font-black text-teal-950 mb-4 break-keep">{t.features.item2Title}</h3>
              <p className="text-teal-950 text-lg sm:text-xl font-bold leading-relaxed break-keep">
                {t.features.item2Desc}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 sm:p-10 rounded-3xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col items-center sm:items-start text-center sm:text-left border-2 border-purple-200 shadow-sm">
              <Clock className="w-12 h-12 text-purple-600 mb-6 shrink-0" />
              <h3 className="text-2xl sm:text-3xl font-black text-purple-950 mb-4 break-keep">{t.features.item3Title}</h3>
              <p className="text-purple-950 text-lg sm:text-xl font-bold leading-relaxed break-keep">
                {t.features.item3Desc}
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 sm:p-10 rounded-3xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col items-center sm:items-start text-center sm:text-left border-2 border-orange-200 shadow-sm">
              <Syringe className="w-12 h-12 text-orange-600 mb-6 shrink-0" />
              <h3 className="text-2xl sm:text-3xl font-black text-orange-950 mb-4 break-keep">{t.features.item4Title}</h3>
              <p className="text-orange-950 text-lg sm:text-xl font-bold leading-relaxed break-keep">
                {t.features.item4Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-10 sm:py-24 px-4 sm:px-6 lg:px-8 bg-emerald-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-black mb-4 break-keep">{t.reviews.title}</h2>
            <p className="text-emerald-100 text-lg sm:text-xl font-bold break-keep">{t.reviews.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.reviews.items.map((review, idx) => (
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
      <section id="contact" className="py-10 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border-2 border-gray-300">
            <h2 className="text-3xl sm:text-5xl font-black text-center text-gray-950 mb-4 break-keep">{t.contact.title}</h2>
            <p className="text-center text-lg sm:text-xl font-bold text-gray-800 mb-10 break-keep">{t.contact.subtitle}</p>

            <div className="sm:hidden text-xs text-emerald-700 font-bold mb-3 text-center bg-emerald-50 py-2.5 rounded-xl border border-emerald-200 shadow-2xs">
              {t.contact.scrollNotice}
            </div>
            <div className="overflow-x-auto rounded-2xl border-2 border-gray-300 shadow-sm">
              <table className="w-full text-center border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-emerald-100 border-b-2 border-emerald-300">
                    <th className="py-4 px-6 font-black text-emerald-950 text-base sm:text-lg whitespace-nowrap text-center">{t.contact.thRegion}</th>
                    <th className="py-4 px-6 font-black text-emerald-950 text-base sm:text-lg whitespace-nowrap text-center">{t.contact.thName}</th>
                    <th className="py-4 px-6 font-black text-emerald-950 text-base sm:text-lg whitespace-nowrap text-center">{t.contact.thRep}</th>
                    <th className="py-4 px-6 font-black text-emerald-950 text-base sm:text-lg whitespace-nowrap text-center">{t.contact.thTel}</th>
                    <th className="py-4 px-6 font-black text-emerald-950 text-base sm:text-lg whitespace-nowrap text-center">{t.contact.thPhone}</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-gray-200">
                  {t.contact.distributors.map((item, idx) => (
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
      <section id="inquiry" className="py-10 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-3xl p-10 text-center shadow-2xl text-white transform transition-all hover:scale-105">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <CheckCircle2 className="w-10 h-10 text-emerald-300" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black mb-4 break-keep">{t.inquiry.advTitle1}<br /><span className="text-emerald-300">{t.inquiry.advTitle2}</span></h3>
              <p className="text-emerald-100 mb-8 opacity-100 font-bold text-lg sm:text-xl break-keep">{t.inquiry.advDesc}</p>
              <a href="tel:010-5407-5708" className="inline-block bg-white text-emerald-950 text-2xl sm:text-3xl font-black py-4 px-10 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all transform hover:-translate-y-1">
                010-5407-5708
              </a>
              <p className="mt-4 text-base font-bold text-emerald-200">{t.inquiry.advTouch}</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-gray-50 p-5 sm:p-8 md:p-12 rounded-3xl shadow-lg border-2 border-gray-300">
              <h2 className="text-3xl sm:text-4xl font-black text-gray-950 mb-2 break-keep">{t.inquiry.formTitle}</h2>
              <p className="text-gray-800 font-bold text-lg mb-8 break-keep">{t.inquiry.formSubtitle}</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-black text-gray-900 mb-2">{t.inquiry.labelName}</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-400 font-bold text-gray-900 text-base sm:text-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition-all bg-white" placeholder={t.inquiry.placeholderName} />
                  </div>
                  <div>
                    <label className="block text-base font-black text-gray-900 mb-2">{t.inquiry.labelPhone}</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-400 font-bold text-gray-900 text-base sm:text-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition-all bg-white" placeholder={t.inquiry.placeholderPhone} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-black text-gray-900 mb-2">{t.inquiry.labelRegion}</label>
                    <div className="relative">
                      <select name="region" value={formData.region} onChange={handleChange} required className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-400 font-bold text-gray-900 text-base sm:text-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none appearance-none transition-all bg-white">
                        <option value="">{t.inquiry.selectRegionDefault}</option>
                        {t.contact.distributors.map((d, i) => (
                          <option key={i} value={d.region}>{d.region}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none stroke-[2.5]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-base font-black text-gray-900 mb-2">{t.inquiry.labelSize}</label>
                    <input type="text" name="farmSize" value={formData.farmSize} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-400 font-bold text-gray-900 text-base sm:text-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition-all bg-white" placeholder={t.inquiry.placeholderSize} />
                  </div>
                </div>

                <div>
                  <label className="block text-base font-black text-gray-900 mb-2">{t.inquiry.labelInquiry}</label>
                  <textarea name="inquiry" value={formData.inquiry} onChange={handleChange} rows="4" className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-400 font-bold text-gray-900 text-base sm:text-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 outline-none transition-all bg-white resize-none" placeholder={t.inquiry.placeholderInquiry}></textarea>
                </div>

                <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black text-lg sm:text-xl py-5 rounded-xl shadow-xl hover:shadow-2xl transform transition-all hover:-translate-y-1 flex justify-center items-center gap-2 break-keep">
                  <Send className="w-6 h-6 shrink-0" /> {t.inquiry.submitBtn}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Harmonious Footer */}
      <footer className="bg-gradient-to-b from-emerald-950 via-[#061812] to-[#030d0a] text-emerald-100 pt-14 pb-28 sm:pb-14 px-4 sm:px-6 lg:px-8 border-t-4 border-emerald-600 shadow-2xl relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Top Row: Brand & Tagline */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-8 border-b border-emerald-800/80 gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-white px-2 py-1.5 rounded-xl shadow-md border border-emerald-300 shrink-0 flex items-center">
                <img src="./pharmagal_logo.jpg" alt="Pharmagal Bio Logo" className="h-8 sm:h-10 w-auto object-contain" />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">{t.header?.brandKo || '로타갈'}</span>
                  <span className="text-lg sm:text-xl font-extrabold text-emerald-400 tracking-tight leading-none">{t.header?.brandEn || 'Rotagal'}</span>
                </div>
                <span className="text-xs font-extrabold text-emerald-300 tracking-wider mt-1.5 break-keep">{t.footer.tagline}</span>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <span className="inline-flex items-center gap-2 bg-emerald-900/90 border border-emerald-700 text-emerald-200 px-4 py-2 rounded-full text-xs sm:text-sm font-black shadow-sm break-keep">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" /> {t.footer.badge}
              </span>
            </div>
          </div>

          {/* Middle Row: Detailed Company & Veterinary Registration Info (2 Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8 text-left text-xs sm:text-sm font-semibold leading-relaxed text-emerald-200/90 break-keep">
            {/* Left Column: Distributor Info (Agrokorea) */}
            <div className="space-y-2 bg-emerald-900/30 p-5 rounded-2xl border border-emerald-800/60 shadow-inner">
              <div className="font-black text-white text-sm sm:text-base mb-3 flex items-center gap-2 border-b border-emerald-800/60 pb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                <span>{t.footer.col1Title}</span>
              </div>
              <p><strong className="text-emerald-300">{t.footer.address.split(':')[0]}:</strong> {t.footer.address.split(':')[1] || t.footer.address}</p>
              <p><strong className="text-emerald-300">TEL:</strong> 02-6949-5706 | <strong className="text-emerald-300">Mobile:</strong> 010-5407-5708</p>
              <p><strong className="text-emerald-300">Email:</strong> info@agrokorea.kr | <strong className="text-emerald-300">Web:</strong> <a href="http://www.agrokorea.kr" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">www.agrokorea.kr</a></p>
              <p className="text-emerald-400 font-bold pt-1">{t.footer.col1Sub}</p>
            </div>

            {/* Right Column: Manufacturer & Veterinary Drug Registration */}
            <div className="space-y-2 bg-emerald-900/30 p-5 rounded-2xl border border-emerald-800/60 shadow-inner">
              <div className="font-black text-white text-sm sm:text-base mb-3 flex items-center gap-2 border-b border-emerald-800/60 pb-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
                <span>{t.footer.col2Title}</span>
              </div>
              <p><strong className="text-emerald-300">{t.footer.mfg.split(':')[0]}:</strong> {t.footer.mfg.split(':')[1] || t.footer.mfg}</p>
              <p><strong className="text-emerald-300">{t.footer.imp.split(':')[0]}:</strong> {t.footer.imp.split(':')[1] || t.footer.imp}</p>
              <p><strong className="text-emerald-300">{t.footer.reg.split(':')[0]}:</strong> {t.footer.reg.split(':')[1] || t.footer.reg}</p>
            </div>
          </div>

          {/* Bottom Banner Box */}
          <div className="mt-2 pt-6 border-t border-emerald-800/80">
            <div className="bg-gradient-to-r from-emerald-900 via-[#063827] to-emerald-900 border-2 border-[#FFD700] rounded-2xl p-6 shadow-[0_0_30px_rgba(255,215,0,0.2)] flex flex-col sm:flex-row items-center justify-between gap-6 relative">
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-2xl"></div>
              </div>
              <div className="flex items-center gap-4 text-left relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-[#FFE53B] to-[#FFA800] rounded-2xl flex items-center justify-center border-2 border-white shadow-md shrink-0">
                  <span className="text-2xl sm:text-3xl">🐄</span>
                </div>
                <div>
                  <div className="text-[#FFDF00] text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-0.5 flex items-center gap-1.5">
                    <span>{t.footer.bannerTop}</span>
                  </div>
                  <div className="text-white text-base sm:text-xl font-black break-keep">{t.footer.bannerTitle}</div>
                </div>
              </div>
              <a
                href="#inquiry"
                className="w-full sm:w-auto bg-gradient-to-r from-[#FFE53B] via-[#FFDF00] to-[#FFA800] hover:from-[#FFF066] hover:to-[#FFB800] text-gray-950 font-black px-8 py-4 rounded-xl text-base sm:text-lg shadow-[0_4px_25px_rgba(255,215,0,0.5)] hover:shadow-[0_6px_30px_rgba(255,215,0,0.7)] border-2 border-[#FFF066] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 shrink-0 break-keep relative z-10"
              >
                <span>{t.footer.bannerBtn}</span>
                <ArrowRight className="w-6 h-6 stroke-[3] text-gray-950" />
              </a>
            </div>

            {/* Legal / Medical Disclaimer Box */}
            <div className="mt-8 bg-emerald-950/60 border border-emerald-800/80 rounded-xl p-4 sm:p-5 text-center shadow-sm">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm font-bold text-amber-200/90 tracking-tight break-keep leading-relaxed sm:leading-normal">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block shrink-0"></span>
                  <span>{t.footer.disclaimer1}</span>
                </span>
                <span className="hidden sm:inline text-emerald-700 font-normal">|</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block shrink-0"></span>
                  <span>{t.footer.disclaimer2}</span>
                </span>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-emerald-400/70 font-medium break-keep">
              {t.footer.copyright}
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
                  <h3 className="font-bold">{t.chatbot.headerTitle}</h3>
                  <p className="text-xs text-emerald-200">{t.chatbot.headerSub}</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-emerald-100 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed break-keep ${msg.role === 'user'
                      ? 'bg-emerald-600 text-white rounded-tr-sm'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
                    }`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Quick Replies */}
              <div className="flex flex-wrap gap-2 mt-4">
                <button onClick={() => handleQuickReply(t.chatbot.quick1Question)} className="bg-white border border-emerald-200 text-emerald-700 text-xs px-3 py-1.5 rounded-full hover:bg-emerald-50 transition-colors shadow-sm">{t.chatbot.quick1Label}</button>
                <button onClick={() => handleQuickReply(t.chatbot.quick2Question)} className="bg-white border border-emerald-200 text-emerald-700 text-xs px-3 py-1.5 rounded-full hover:bg-emerald-50 transition-colors shadow-sm">{t.chatbot.quick2Label}</button>
                <button onClick={() => handleQuickReply(t.chatbot.quick3Question)} className="bg-white border border-emerald-200 text-emerald-700 text-xs px-3 py-1.5 rounded-full hover:bg-emerald-50 transition-colors shadow-sm">{t.chatbot.quick3Label}</button>
              </div>
            </div>

            <form onSubmit={handleChatSubmit} className="p-4 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={t.chatbot.placeholder}
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
