import React, { useState, useEffect } from 'react';

export default function VaccineCalculator({ isOpen, onClose, t, lang = 'ko' }) {
  const [dueDate, setDueDate] = useState('');
  const [result, setResult] = useState(null);

  const c = t?.vaccineCalc || {
    title: "어미소 로타갈 접종 적기 계산기",
    sub: "어미소 분만 예정일을 입력하면 '유럽 원샷(1회) 접종'의 최적 적기(골든타임)를 계산해 드립니다.",
    selectLabel: "어미소 분만 예정일 선택",
    submitBtn: "최적 접종 적기 계산하기",
    resultTag: "💡 원샷(1회) 접종 최적 적기 · 골든타임",
    dueLabel: "분만 예정일",
    windowTitle: "원샷 접종 추천 골든타임 (분만전 3~5주)",
    euRange: "유럽 보비젠(Bovigen Scour) 가이드라인 허용 범위: 분만전 3~12주",
    approvalNote: "※ 국내 허가 기준: 첫 접종(초임우)은 분만 6~5주 전 1차, 분만 3~2주 전 2차 접종 / 재접종은 분만 6~3주 전 1회 접종입니다. 정확한 농가별 일정은 고문수의사와 상담해 주세요.",
    notice: "* 어미소 접종 시 초유를 통해 항체가 형성되어 송아지 로타·코로나·대장균 설사를 예방합니다."
  };

  // Keyboard accessibility: ESC to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formatLocalizedDate = (d) => {
    try {
      const localeMap = { ko: 'ko-KR', en: 'en-US', sk: 'sk-SK', uk: 'uk-UA' };
      return new Intl.DateTimeFormat(localeMap[lang] || 'ko-KR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(d);
    } catch {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!dueDate) return;

    const due = new Date(dueDate);
    
    const startWindow = new Date(due);
    startWindow.setDate(due.getDate() - 35);

    const endWindow = new Date(due);
    endWindow.setDate(due.getDate() - 21);

    setResult({
      start: formatLocalizedDate(startWindow),
      end: formatLocalizedDate(endWindow),
      dueStr: formatLocalizedDate(due)
    });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="calc-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-emerald-100"
      >
        <button
          onClick={onClose}
          aria-label={c.close || 'Close'}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        >
          &times;
        </button>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">💉</span>
          <div>
            <h3 id="calc-modal-title" className="text-xl font-extrabold text-emerald-900">
              {c.title}
            </h3>
            <p className="text-xs text-gray-500">{c.sub}</p>
          </div>
        </div>

        <form onSubmit={handleCalculate} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-bold text-gray-700">
                {c.selectLabel}
              </label>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    const d = new Date();
                    d.setDate(d.getDate() + 30);
                    setDueDate(d.toISOString().split('T')[0]);
                  }}
                  className="px-2 py-0.5 text-[11px] font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-md border border-emerald-200 transition-colors"
                >
                  +30일
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const d = new Date();
                    d.setDate(d.getDate() + 45);
                    setDueDate(d.toISOString().split('T')[0]);
                  }}
                  className="px-2 py-0.5 text-[11px] font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-md border border-emerald-200 transition-colors"
                >
                  +45일
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const d = new Date();
                    d.setDate(d.getDate() + 60);
                    setDueDate(d.toISOString().split('T')[0]);
                  }}
                  className="px-2 py-0.5 text-[11px] font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-md border border-emerald-200 transition-colors"
                >
                  +60일
                </button>
              </div>
            </div>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 font-bold bg-white text-base shadow-xs"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-lg hover:shadow-emerald-600/30 transition-all text-base focus:ring-2 focus:ring-emerald-500 transform active:scale-[0.99]"
          >
            {c.submitBtn}
          </button>
        </form>

        {result && (
          <div className="mt-5 p-4 bg-emerald-50 rounded-xl border-2 border-emerald-300" aria-live="polite">
            <p className="text-xs font-black text-emerald-800 uppercase tracking-wider mb-1">{c.resultTag}</p>
            <p className="text-sm text-gray-800 mb-2">
              {c.dueLabel}: <span className="font-extrabold text-emerald-950">{result.dueStr}</span>
            </p>
            <div className="bg-white p-3.5 rounded-xl border-2 border-emerald-400 text-center shadow-xs">
              <span className="text-xs text-gray-600 font-bold block mb-1">{c.windowTitle}</span>
              <span className="text-base sm:text-xl font-black text-emerald-950">
                {result.start} ~ {result.end}
              </span>
            </div>
            <div className="bg-amber-50 border border-amber-300 rounded-lg p-2.5 mt-2.5">
              <p className="text-[11px] sm:text-xs text-amber-950 font-bold">{c.euRange}</p>
            </div>
            <div className="bg-amber-50 border border-amber-300 rounded-lg p-2.5 mt-2">
              <p className="text-[11px] sm:text-xs text-amber-950 font-bold leading-relaxed">{c.approvalNote}</p>
            </div>
            <p className="text-xs text-emerald-900 font-semibold mt-2.5">
              {c.notice}
            </p>
            <div className="mt-3.5 pt-3 border-t border-emerald-200 flex gap-2">
              <a
                href="#inquiry"
                onClick={onClose}
                className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-extrabold rounded-lg text-center transition-colors shadow-xs"
              >
                {c.inquiryBtn || "이 일정으로 백신 상담 문의"}
              </a>
              <a
                href="tel:+82-10-5407-5708"
                className="px-3 py-2.5 bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-900 text-xs sm:text-sm font-bold rounded-lg text-center transition-colors shrink-0"
              >
                📞 전화문의
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
