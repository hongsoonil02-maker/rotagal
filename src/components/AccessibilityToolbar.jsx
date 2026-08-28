import React, { useState, useEffect } from 'react';
import { Eye, Volume2, VolumeX, Type, Contrast, Sparkles, RotateCcw, X, Check, Activity } from 'lucide-react';

export default function AccessibilityToolbar({ lang = 'ko', t }) {
  const a11yText = t?.a11y || {
    skipToContent: "본문 바로가기",
    openToolbar: "장애인 접근성 및 읽기 편의 설정",
    closeToolbar: "접근성 설정 닫기",
    title: "웹 접근성 및 읽기 편의 설정",
    desc: "고령 축산인 및 시각/청각/운동 장애인을 위한 맞춤 편의 옵션입니다.",
    fontSize: "글자 크기",
    fontNormal: "기본 100%",
    fontLarge: "크게 115%",
    fontXLarge: "매우 크게 130%",
    highContrast: "고대비 (흑백/선명도)",
    highContrastDesc: "글자와 배경의 명암비를 극대화하여 또렷하게 표시합니다.",
    highlightLinks: "링크 및 버튼 테두리 강조",
    highlightLinksDesc: "클릭 가능한 모든 요소에 선명한 윤곽선을 부여합니다.",
    readableFont: "가독성 폰트 및 행간 확대",
    readableFontDesc: "난독증 방지 및 넓은 자간·행간으로 편안하게 읽습니다.",
    reduceMotion: "화면 애니메이션 멈춤",
    reduceMotionDesc: "화면 깜빡임 및 전환 움직임을 최소화합니다.",
    speechRead: "🔊 화면 요약 음성 듣기",
    speechReading: "🔊 음성 낭독 중 (클릭 시 중지)",
    speechStop: "음성 멈춤",
    reset: "설정 초기화",
    speechSummary: "로타갈 백신 공식 홈페이지입니다. 유럽 파마갈 바이오 직수입, 임신우 1회 원샷 접종으로 송아지 로타, 코로나, 대장균 설사병 3종을 동시 예방합니다. EU GMP 인증 제품으로 1회 19,800원입니다."
  };

  const getSavedA11y = () => {
    try {
      return JSON.parse(localStorage.getItem('rotagal_a11y') || '{}');
    } catch {
      return {};
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(() => getSavedA11y().fontSize || 'normal');
  const [highContrast, setHighContrast] = useState(() => !!getSavedA11y().highContrast);
  const [highlightLinks, setHighlightLinks] = useState(() => !!getSavedA11y().highlightLinks);
  const [readableFont, setReadableFont] = useState(() => !!getSavedA11y().readableFont);
  const [reduceMotion, setReduceMotion] = useState(() => !!getSavedA11y().reduceMotion);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Synchronize CSS classes to <html>
  useEffect(() => {
    const root = document.documentElement;

    // Font size
    root.classList.remove('a11y-font-lg', 'a11y-font-xl');
    if (fontSize === 'large') root.classList.add('a11y-font-lg');
    if (fontSize === 'xlarge') root.classList.add('a11y-font-xl');

    // High Contrast
    if (highContrast) {
      root.classList.add('a11y-high-contrast');
    } else {
      root.classList.remove('a11y-high-contrast');
    }

    // Highlight Links
    if (highlightLinks) {
      root.classList.add('a11y-highlight-links');
    } else {
      root.classList.remove('a11y-highlight-links');
    }

    // Readable Font
    if (readableFont) {
      root.classList.add('a11y-readable-font');
    } else {
      root.classList.remove('a11y-readable-font');
    }

    // Reduce Motion
    if (reduceMotion) {
      root.classList.add('a11y-reduce-motion');
    } else {
      root.classList.remove('a11y-reduce-motion');
    }

    // Save to localStorage
    try {
      localStorage.setItem('rotagal_a11y', JSON.stringify({
        fontSize,
        highContrast,
        highlightLinks,
        readableFont,
        reduceMotion
      }));
    } catch {
      /* ignore */
    }
  }, [fontSize, highContrast, highlightLinks, readableFont, reduceMotion]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Clean up speech when unmounting or stopping
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleSpeech = () => {
    if (!speechSupported) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = a11yText.speechSummary || '';
    const utterance = new SpeechSynthesisUtterance(textToRead);

    // Map language
    const langMap = {
      ko: 'ko-KR',
      en: 'en-US',
      sk: 'sk-SK',
      uk: 'uk-UA'
    };
    utterance.lang = langMap[lang] || 'ko-KR';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleReset = () => {
    setFontSize('normal');
    setHighContrast(false);
    setHighlightLinks(false);
    setReadableFont(false);
    setReduceMotion(false);
    if (isSpeaking && speechSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const hasActiveModifiers = fontSize !== 'normal' || highContrast || highlightLinks || readableFont || reduceMotion;

  return (
    <>
      {/* Accessibility Floating Trigger Button (Left side of screen to avoid overlapping right-side chatbot) */}
      <div className="fixed bottom-20 left-3 sm:left-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={a11yText.openToolbar}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-400 ${
            hasActiveModifiers 
              ? 'bg-amber-500 text-gray-950 font-black border-2 border-amber-300'
              : 'bg-gray-900/90 hover:bg-gray-950 text-white backdrop-blur-md border border-gray-700'
          }`}
        >
          <Eye className="w-5 h-5 text-amber-400 stroke-[2.5]" />
          <span className="text-xs sm:text-sm font-bold tracking-tight hidden sm:inline">
            {a11yText.title}
          </span>
          {hasActiveModifiers && (
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-ping"></span>
          )}
        </button>
      </div>

      {/* Accessibility Modal Dialog */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-panel-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-start p-2 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl w-full max-w-md p-5 sm:p-6 shadow-2xl border-2 border-emerald-500 max-h-[85vh] overflow-y-auto transform transition-all text-gray-900"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                  <Eye className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h2 id="a11y-panel-title" className="text-lg sm:text-xl font-black text-gray-950 leading-tight">
                    {a11yText.title}
                  </h2>
                  <p className="text-xs text-gray-600 font-semibold mt-0.5 leading-snug">
                    {a11yText.desc}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label={a11yText.closeToolbar}
                className="text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Options List */}
            <div className="space-y-4 py-4 text-left">
              {/* 1. Font Size */}
              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200">
                <label className="block text-xs font-black text-gray-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Type className="w-4 h-4 text-emerald-700" />
                  <span>{a11yText.fontSize}</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFontSize('normal')}
                    className={`py-2 px-1 text-xs font-black rounded-xl border-2 transition-all text-center ${
                      fontSize === 'normal'
                        ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {a11yText.fontNormal}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontSize('large')}
                    className={`py-2 px-1 text-xs font-black rounded-xl border-2 transition-all text-center ${
                      fontSize === 'large'
                        ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {a11yText.fontLarge}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontSize('xlarge')}
                    className={`py-2 px-1 text-xs font-black rounded-xl border-2 transition-all text-center ${
                      fontSize === 'xlarge'
                        ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {a11yText.fontXLarge}
                  </button>
                </div>
              </div>

              {/* 2. High Contrast Mode */}
              <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="pr-2">
                  <div className="text-sm font-black text-gray-950 flex items-center gap-1.5">
                    <Contrast className="w-4 h-4 text-emerald-700" />
                    <span>{a11yText.highContrast}</span>
                  </div>
                  <div className="text-xs text-gray-600 font-semibold mt-0.5">
                    {a11yText.highContrastDesc}
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={highContrast}
                  onClick={() => setHighContrast(!highContrast)}
                  className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out shrink-0 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    highContrast ? 'bg-emerald-700' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                      highContrast ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 3. Highlight Links & Buttons */}
              <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="pr-2">
                  <div className="text-sm font-black text-gray-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    <span>{a11yText.highlightLinks}</span>
                  </div>
                  <div className="text-xs text-gray-600 font-semibold mt-0.5">
                    {a11yText.highlightLinksDesc}
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={highlightLinks}
                  onClick={() => setHighlightLinks(!highlightLinks)}
                  className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out shrink-0 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    highlightLinks ? 'bg-emerald-700' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                      highlightLinks ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 4. Readable Font & Spacing */}
              <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="pr-2">
                  <div className="text-sm font-black text-gray-950 flex items-center gap-1.5">
                    <Type className="w-4 h-4 text-emerald-700" />
                    <span>{a11yText.readableFont}</span>
                  </div>
                  <div className="text-xs text-gray-600 font-semibold mt-0.5">
                    {a11yText.readableFontDesc}
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={readableFont}
                  onClick={() => setReadableFont(!readableFont)}
                  className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out shrink-0 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    readableFont ? 'bg-emerald-700' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                      readableFont ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 5. Reduce Motion */}
              <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="pr-2">
                  <div className="text-sm font-black text-gray-950 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-emerald-700" />
                    <span>{a11yText.reduceMotion}</span>
                  </div>
                  <div className="text-xs text-gray-600 font-semibold mt-0.5">
                    {a11yText.reduceMotionDesc}
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={reduceMotion}
                  onClick={() => setReduceMotion(!reduceMotion)}
                  className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out shrink-0 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    reduceMotion ? 'bg-emerald-700' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                      reduceMotion ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* 6. Speech Summary (TTS) */}
              {speechSupported && (
                <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <button
                    type="button"
                    onClick={handleToggleSpeech}
                    className={`w-full py-3 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-sm transition-all ${
                      isSpeaking
                        ? 'bg-amber-500 text-gray-950 hover:bg-amber-600 animate-pulse'
                        : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    }`}
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-5 h-5 shrink-0" />
                        <span>{a11yText.speechReading}</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-5 h-5 shrink-0" />
                        <span>{a11yText.speechRead}</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Footer actions: Reset & Close */}
            <div className="pt-3 border-t border-gray-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-red-700 py-2 px-3 rounded-lg hover:bg-red-50 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{a11yText.reset}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="bg-gray-900 text-white font-black text-xs px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors"
              >
                {a11yText.closeToolbar}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
