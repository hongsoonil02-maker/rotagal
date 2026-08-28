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
          aria-label="Close calculator"
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {c.selectLabel}
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-800 font-medium"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-600/30 transition-all text-base focus:ring-2 focus:ring-emerald-500"
          >
            {c.submitBtn}
          </button>
        </form>

        {result && (
          <div className="mt-5 p-4 bg-emerald-50 rounded-xl border border-emerald-200" aria-live="polite">
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">{c.resultTag}</p>
            <p className="text-sm text-gray-700 mb-2">
              {c.dueLabel}: <span className="font-semibold">{result.dueStr}</span>
            </p>
            <div className="bg-white p-3 rounded-lg border border-emerald-300 text-center">
              <span className="text-xs text-gray-500 block mb-1">{c.windowTitle}</span>
              <span className="text-base sm:text-lg font-black text-emerald-900">
                {result.start} ~ {result.end}
              </span>
            </div>
            <div className="bg-amber-50 border border-amber-300 rounded-lg p-2.5 mt-2">
              <p className="text-[11px] sm:text-xs text-amber-900 font-semibold">{c.euRange}</p>
            </div>
            <div className="bg-amber-50 border border-amber-300 rounded-lg p-2.5 mt-2">
              <p className="text-[11px] sm:text-xs text-amber-900 font-semibold leading-relaxed">{c.approvalNote}</p>
            </div>
            <p className="text-xs text-emerald-800 mt-2">
              {c.notice}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
