import React, { useState, useEffect } from 'react';

export default function VaccineCalculator({ isOpen, onClose, t }) {
  const [dueDate, setDueDate] = useState('');
  const [result, setResult] = useState(null);

  const c = t?.vaccineCalc || {
    title: "어미소 로타갈 접종 적기 계산기",
    sub: "어미소 분만 예정일을 입력하시면 로타갈 1회 최적 접종 기간을 계산해 드립니다.",
    selectLabel: "어미소 분만 예정일 선택",
    submitBtn: "접종 권장 기간 계산하기",
    resultTag: "💡 로타갈 단 1회 원샷 접종 권장일",
    dueLabel: "분만 예정일",
    windowTitle: "어미소 접종 추천 골든타임 (분만전 3~5주)",
    notice: "* 어미소 접종 시 초유를 통해 항체가 형성되어 송아지 로타·코로나·대장균 설사를 완벽 예방합니다."
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

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!dueDate) return;

    const due = new Date(dueDate);
    
    const startWindow = new Date(due);
    startWindow.setDate(due.getDate() - 35);

    const endWindow = new Date(due);
    endWindow.setDate(due.getDate() - 21);

    const formatDate = (d) => {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    };

    setResult({
      start: formatDate(startWindow),
      end: formatDate(endWindow),
      dueStr: formatDate(due)
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="calc-modal-title"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-emerald-100">
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
            <p className="text-xs text-emerald-800 mt-2">
              {c.notice}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
