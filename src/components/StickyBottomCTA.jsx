import React from 'react';

export default function StickyBottomCTA({ onOpenCalc, t }) {
  const s = t?.stickyCta || {
    title: "로타갈(ROTAGAL) 명품 백신",
    sub: "어미소 1회 접종으로 송아지 설사병 3종 완벽 예방",
    calcBtn: "📅 접종적기 계산기",
    consultBtn: "📞 1회 19,800원 문의"
  };

  return (
    <nav 
      aria-label="Quick Action Footer Bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-emerald-100 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3 sm:px-6"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <div className="hidden md:flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg">
            💉
          </div>
          <div>
            <div className="font-extrabold text-gray-900 text-sm">{s.title}</div>
            <div className="text-xs text-emerald-600 font-semibold">{s.sub}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={onOpenCalc}
            aria-label={s.calcBtn}
            className="flex-1 md:flex-initial px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs sm:text-sm rounded-xl border border-emerald-300 transition-colors flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <span>{s.calcBtn}</span>
          </button>
          
          <a
             href="tel:010-5407-5708"
            aria-label={s.consultBtn}
            className="flex-1 md:flex-initial px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <span>{s.consultBtn}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
