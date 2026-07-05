import React from 'react';
import { 
  Shield, 
  Clock, 
  Syringe, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Layers, 
  TrendingUp, 
  Activity, 
  ChevronRight
} from 'lucide-react';

export default function RotagalInfographic() {
  return (
    <section id="infographic" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-emerald-50/40 to-white text-gray-900 border-t border-b border-emerald-100/80 relative overflow-hidden">
      {/* Soft Background Accents */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-200/20 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-teal-200/20 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Top Header Banner */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 bg-emerald-100 text-emerald-950 font-extrabold px-6 py-2.5 rounded-full text-base sm:text-lg mb-6 shadow-sm border-2 border-emerald-300 break-keep">
            <Sparkles className="w-5 h-5 text-emerald-600 fill-current shrink-0" />
            <span>송아지 자산 보호를 위한 원샷 백신 솔루션</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 break-keep leading-tight text-gray-950">
            로타갈 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600">(Rotagal)</span> 핵심 방어 메커니즘
          </h2>
          <p className="text-lg sm:text-xl text-gray-800 max-w-3xl mx-auto font-bold leading-relaxed break-keep">
            송아지 설사병 3대 원인체(로타, 코로나, 대장균)를 단 한 번의 접종으로 완벽 차단하는 유럽 Virvac(버박) 오리지널 (EU GMP 인증) 프리미엄 백신의 작동 원리와 접종 가이드라인입니다.
          </p>
          <div className="flex justify-center items-center mt-4 mb-2">
            <span className="inline-flex items-center gap-2 bg-emerald-100/90 text-emerald-950 px-5 py-2 rounded-full text-xs sm:text-sm font-black border border-emerald-400 shadow-sm">
              <img src="./eu_gmp_badge.svg" alt="EU GMP" className="w-5 h-5 shrink-0" />
              <span>유럽 연합(EU) GMP 공식 인증 · 글로벌 1위 Virvac(버박) 보비젠 동일 오리지널 백신</span>
            </span>
          </div>
        </div>

        {/* 2-Section Grid for Basics and Program */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Section 1: '로타갈'이란? */}
          <div className="bg-white/95 p-6 sm:p-8 rounded-3xl border-2 border-gray-300 shadow-xl hover:shadow-2xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between relative group">
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2 mb-6">
                <span className="inline-flex items-center gap-2 bg-emerald-700 text-white font-extrabold px-4.5 py-2 rounded-full text-sm sm:text-base shadow-md break-keep">
                  <Shield className="w-4 h-4 fill-current shrink-0" /> '로타갈'이란?
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-950 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300 break-keep">
                  3종 혼합 프리미엄
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-6 break-keep text-center sm:text-left leading-snug">
                송아지 설사병 <span className="text-emerald-700 underline decoration-emerald-500 underline-offset-4">3대 원인체 완벽 차단</span>
              </h3>

              {/* Pathogen List */}
              <div className="space-y-3.5 mb-8">
                <div className="bg-emerald-50/90 p-4.5 rounded-2xl border-2 border-emerald-300 text-center shadow-sm">
                  <div className="text-emerald-950 font-black text-lg sm:text-xl mb-1 break-keep">Rotavirus</div>
                  <div className="text-sm sm:text-base text-gray-900 font-bold break-keep">로타바이러스 G6P1, G6P5</div>
                </div>
                <div className="bg-teal-50/90 p-4.5 rounded-2xl border-2 border-teal-300 text-center shadow-sm">
                  <div className="text-teal-950 font-black text-lg sm:text-xl mb-1 break-keep">Coronavirus</div>
                  <div className="text-sm sm:text-base text-gray-900 font-bold break-keep">Corona C-197KWD20</div>
                </div>
                <div className="bg-amber-50/90 p-4.5 rounded-2xl border-2 border-amber-300 text-center shadow-sm">
                  <div className="text-amber-950 font-black text-lg sm:text-xl mb-1 break-keep">E. coli K99</div>
                  <div className="text-sm sm:text-base text-gray-900 font-bold break-keep">대장균 K99 F5 항원</div>
                </div>
              </div>
            </div>

            {/* Visual Workflow Diagram */}
            <div className="bg-gray-50 p-5 rounded-2xl border-2 border-gray-300 shadow-sm">
              <div className="text-sm sm:text-base font-extrabold text-emerald-900 uppercase tracking-wider mb-4 text-center break-keep">
                초유를 통한 항체 전달 메커니즘
              </div>
              
              <div className="flex flex-col gap-3 text-center">
                <div className="bg-white p-3.5 rounded-xl border-2 border-gray-300 shadow-sm">
                  <div className="text-base sm:text-lg font-black text-gray-950 mb-0.5 break-keep">🐄 임신우 접종</div>
                  <div className="text-sm sm:text-base text-gray-800 font-bold break-keep">어미 소 일괄 접종</div>
                </div>
                
                <div className="flex items-center justify-center text-emerald-600">
                  <ArrowRight className="w-6 h-6 rotate-90 animate-pulse stroke-[3]" />
                </div>

                <div className="bg-emerald-100 p-3.5 rounded-xl border-2 border-emerald-400 shadow-sm">
                  <div className="text-base sm:text-lg font-black text-emerald-950 mb-0.5 break-keep">🍼 초유 항체 전달</div>
                  <div className="text-sm sm:text-base text-emerald-900 font-bold break-keep">고농도 IgG 농축</div>
                </div>

                <div className="flex items-center justify-center text-emerald-600">
                  <ArrowRight className="w-6 h-6 rotate-90 animate-pulse stroke-[3]" />
                </div>

                <div className="bg-white p-3.5 rounded-xl border-2 border-gray-300 shadow-sm">
                  <div className="text-base sm:text-lg font-black text-gray-950 mb-0.5 break-keep">🐮 송아지 보호</div>
                  <div className="text-sm sm:text-base text-gray-800 font-bold break-keep">구강 도달 및 장관 보호</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t-2 border-gray-200 text-center">
                <span className="inline-flex items-center justify-center gap-1.5 text-sm sm:text-base font-extrabold text-amber-950 bg-amber-100 px-4 py-1.5 rounded-full border border-amber-300 break-keep shadow-sm">
                  <Clock className="w-4 h-4 text-amber-700 shrink-0 stroke-[2.5]" />
                  <span>생후 1일, 5주, 12주까지 지속 방어</span>
                </span>
              </div>
            </div>

          </div>

          {/* Section 2: 접종 프로그램 */}
          <div className="bg-white/95 p-6 sm:p-8 rounded-3xl border-2 border-gray-300 shadow-xl hover:shadow-2xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between relative group">
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2 mb-6">
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-extrabold px-4.5 py-2 rounded-full text-sm sm:text-base shadow-md break-keep">
                  <Syringe className="w-4 h-4 fill-current shrink-0" /> 접종 프로그램
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-amber-950 bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-300 break-keep">
                  노동력 및 비용 절감
                </span>
              </div>

              {/* User Correction #1 Highlight Banner */}
              <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-400 p-6 sm:p-8 rounded-2xl shadow-md mb-8 text-center">
                <div className="flex items-center justify-center gap-1.5 text-amber-950 font-extrabold text-sm sm:text-base uppercase tracking-wider mb-3 break-keep">
                  <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>유럽 표준 권장 접종 가이드라인</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-gray-950 leading-relaxed break-keep">
                  "유럽에서는 분만전 <span className="text-amber-800 underline decoration-amber-500 underline-offset-4 font-black">3주~12주까지</span> 일괄 1회 접종(원샷)"
                </div>
              </div>
            </div>

            {/* Step by Step Flow */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 bg-gray-50 p-5 rounded-2xl border-2 border-gray-300 shadow-sm">
                <div className="w-11 h-11 bg-amber-200 text-amber-950 rounded-xl flex items-center justify-center font-black text-lg shrink-0 border-2 border-amber-400 shadow-sm">
                  1
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-black text-gray-950 mb-1.5 break-keep">임신우 분만 전 일괄 접종 (원샷)</h4>
                  <p className="text-sm sm:text-base font-bold text-gray-800 leading-relaxed break-keep">
                    분만 예정일 전 3주에서 12주 사이의 임신 소에게 단 1회(3mL) 근육 접종하여 농가의 접종 일정 관리 편의성을 극대화합니다.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 bg-gray-50 p-5 rounded-2xl border-2 border-gray-300 shadow-sm">
                <div className="w-11 h-11 bg-amber-200 text-amber-950 rounded-xl flex items-center justify-center font-black text-lg shrink-0 border-2 border-amber-400 shadow-sm">
                  2
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-black text-gray-950 mb-1.5 break-keep">초유를 통한 고역가 항체 농축</h4>
                  <p className="text-sm sm:text-base font-bold text-gray-800 leading-relaxed break-keep">
                    어미 소의 체내에서 생성된 3대 질병 방어 면역 글로불린이 초유로 고도로 농축되어 전달 준비를 마칩니다.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 bg-gray-50 p-5 rounded-2xl border-2 border-gray-300 shadow-sm">
                <div className="w-11 h-11 bg-amber-200 text-amber-950 rounded-xl flex items-center justify-center font-black text-lg shrink-0 border-2 border-amber-400 shadow-sm">
                  3
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-black text-gray-950 mb-1.5 break-keep">태어나자마자 자동 면역 형성</h4>
                  <p className="text-sm sm:text-base font-bold text-gray-800 leading-relaxed break-keep">
                    갓 태어난 송아지가 초유를 섭취함과 동시에 장관 내부에 강력한 방어벽이 형성되어 설사병 치사율을 방지합니다.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Section 3: 차별화된 G6P5 차단 효과 (Full-width for spacious comparison table without clipping) */}
        <div className="mt-8 w-full bg-white/95 p-6 sm:p-10 rounded-3xl border-2 border-gray-300 shadow-xl hover:shadow-2xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between relative group">
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2 mb-6">
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-700 to-teal-700 text-white font-extrabold px-4.5 py-2 rounded-full text-sm sm:text-base shadow-md break-keep">
                  <Activity className="w-4 h-4 fill-current shrink-0" /> 차별화된 G6P5 차단 효과
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-950 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300 break-keep">
                  국내 발생 82% 대응
                </span>
              </div>

              <h3 className="text-xl sm:text-3xl font-black text-gray-950 mb-6 break-keep text-center sm:text-left leading-snug">
                한국 농장에서 문제되는 <span className="text-emerald-700 underline decoration-emerald-500 underline-offset-4">G6P5 혈청형 완벽 방어</span>
              </h3>

              {/* 2-Column Grid for Table and Chart (Placed side-by-side as requested) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* Comparison Table Box */}
                <div className="w-full overflow-hidden rounded-2xl border-2 border-gray-300 bg-white shadow-sm flex flex-col justify-center">
                  <table className="w-full text-center border-collapse text-xs sm:text-base md:text-lg font-bold break-keep h-full">
                    <thead>
                      <tr className="bg-gray-100 border-b-2 border-gray-300">
                        <th className="py-3.5 px-2 sm:py-4 sm:px-4 font-black text-gray-950 text-center w-[34%]">구분 항목</th>
                        <th className="py-3.5 px-2 sm:py-4 sm:px-4 font-black text-emerald-950 bg-emerald-200 text-center text-sm sm:text-lg w-[33%]">로타갈</th>
                        <th className="py-3.5 px-2 sm:py-4 sm:px-4 font-black text-gray-700 text-center w-[33%]">경쟁 백신</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-gray-200">
                      <tr className="hover:bg-gray-100/50">
                        <td className="py-3 px-1.5 sm:py-3.5 sm:px-3 font-extrabold text-gray-950 text-center">G6P5 유행 혈청형 방어</td>
                        <td className="py-3 px-1.5 sm:py-3.5 sm:px-3 text-center bg-emerald-50 font-black text-emerald-950 text-xs sm:text-lg">
                          <span className="inline-flex items-center justify-center gap-1 text-emerald-800 font-black"><CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 stroke-[2.5]" /> 완벽 방어</span>
                        </td>
                        <td className="py-3 px-1.5 sm:py-3.5 sm:px-3 text-center text-red-600 font-black">
                          <span className="inline-flex items-center justify-center gap-1"><XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 stroke-[2.5]" /> 제한적</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-100/50">
                        <td className="py-3 px-1.5 sm:py-3.5 sm:px-3 font-extrabold text-gray-950 text-center">임신우 일괄 원샷 접종</td>
                        <td className="py-3 px-1.5 sm:py-3.5 sm:px-3 text-center bg-emerald-50 font-black text-emerald-950 text-xs sm:text-lg">
                          <span className="inline-flex items-center justify-center gap-1 text-emerald-800 font-black"><CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 stroke-[2.5]" /> 원샷 가능</span>
                        </td>
                        <td className="py-3 px-1.5 sm:py-3.5 sm:px-3 text-center text-red-600 font-black">
                          <span className="inline-flex items-center justify-center gap-1"><XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 stroke-[2.5]" /> 복잡/다회</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-100/50">
                        <td className="py-3 px-1.5 sm:py-3.5 sm:px-3 font-extrabold text-gray-950 text-center">긴 유통기한 (경제성)</td>
                        <td className="py-3 px-1.5 sm:py-3.5 sm:px-3 text-center bg-emerald-50 font-black text-emerald-950 text-xs sm:text-lg">
                          <span className="inline-flex items-center justify-center gap-1 text-emerald-800 font-black"><CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 stroke-[2.5]" /> 24~36개월</span>
                        </td>
                        <td className="py-3 px-1.5 sm:py-3.5 sm:px-3 text-center text-red-600 font-black">
                          <span className="inline-flex items-center justify-center gap-1"><XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 stroke-[2.5]" /> 12~18개월</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Titer Chart Representation Box */}
                <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl border-2 border-gray-300 shadow-sm flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 mb-6 text-center">
                    <span className="text-sm sm:text-base font-black text-gray-950 uppercase tracking-wider break-keep">G6P5 항체가 (Titer) 비교</span>
                    <span className="text-sm sm:text-base text-emerald-900 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300 font-black break-keep shadow-sm">압도적 면역 우위 ⭐</span>
                  </div>
                  
                  <div className="flex items-end justify-center gap-8 sm:gap-12 pt-8 pb-4 px-2 sm:px-6 flex-1 border-b-2 border-gray-300 relative min-h-[220px]">
                    {/* Competitor Bar */}
                    <div className="flex flex-col items-center gap-2 w-24 sm:w-28">
                      <div className="text-xs sm:text-sm text-gray-800 font-extrabold break-keep text-center">일반 항체가</div>
                      <div className="bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-xl h-20 w-full flex items-center justify-center shadow-inner">
                        <span className="text-sm sm:text-base font-black text-gray-900">보통</span>
                      </div>
                      <div className="text-xs sm:text-sm font-black text-gray-900 mt-2 break-keep text-center">경쟁 제품</div>
                    </div>

                    {/* Rotagal Bar */}
                    <div className="flex flex-col items-center gap-2 w-32 sm:w-36">
                      <div className="bg-amber-200 text-amber-950 font-black text-xs sm:text-sm px-3 py-1 rounded-full border-2 border-amber-400 shadow-sm break-keep whitespace-nowrap text-center mb-1">
                        업계 최고 수준
                      </div>
                      <div className="bg-gradient-to-t from-emerald-600 via-emerald-500 to-teal-500 rounded-t-2xl h-32 sm:h-36 w-full shadow-lg flex items-center justify-center">
                        <span className="text-xs sm:text-base font-black text-white whitespace-nowrap px-1">고역가 타이터</span>
                      </div>
                      <div className="text-xs sm:text-base font-black text-emerald-950 mt-2 flex items-center justify-center gap-1 break-keep text-center whitespace-nowrap">
                        <span>로타갈 G6P5</span> <Sparkles className="w-4 h-4 text-amber-600 fill-current shrink-0" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-300 text-center text-xs sm:text-sm font-black text-gray-900 break-keep">
                    * 초유 내 G6P5 항체 생성 농도 및 교차 방어 시험 결과 기준
                  </div>
                </div>
              </div>

            </div>
          </div>

        {/* Section 4: 공식 품목 허가 및 원료약품 규격 */}
        <div className="mt-8 w-full bg-gradient-to-br from-emerald-900 via-[#063827] to-emerald-950 text-white p-6 sm:p-10 rounded-3xl border-2 border-emerald-400/50 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-emerald-700/60 pb-4">
              <span className="inline-flex items-center gap-2 bg-emerald-800/80 text-emerald-200 font-extrabold px-4 py-1.5 rounded-full text-xs sm:text-sm border border-emerald-500/40 shadow-sm break-keep">
                <Award className="w-4 h-4 text-amber-400 fill-current shrink-0" /> 동물용의약품 허가번호 : 제 362-2호
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-amber-300 break-keep">
                ★ EU GMP 품질 인증 · 공식 품목 규격
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-6 break-keep">
              로타갈® (Rotagal) <span className="text-emerald-400">원료약품 및 분량 · 제형 규격</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-emerald-950/60 p-5 rounded-2xl border border-emerald-800/80 shadow-inner">
                <div className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider mb-1">용법 및 용량</div>
                <div className="text-base sm:text-lg font-black text-white break-keep">1두분 (3mL) 근육 접종</div>
                <div className="text-xs text-emerald-200/80 mt-1 font-semibold break-keep">분만 예정일 전 3주~12주 사이 임신우에 단 1회(원샷) 일괄 접종</div>
              </div>

              <div className="bg-emerald-950/60 p-5 rounded-2xl border border-emerald-800/80 shadow-inner">
                <div className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider mb-1">제형 및 성상</div>
                <div className="text-base sm:text-lg font-black text-white break-keep">생물학적제제 (백색 현탁액)</div>
                <div className="text-xs text-emerald-200/80 mt-1 font-semibold break-keep">보관 중 침전물을 형성할 수 있는 백색의 현탁액 (2~8℃ 암소보관, 동결금지, 개봉 후 10시간 이내 사용)</div>
              </div>

              <div className="bg-emerald-950/60 p-5 rounded-2xl border border-emerald-800/80 shadow-inner">
                <div className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider mb-1">제조방법 및 규격</div>
                <div className="text-base sm:text-lg font-black text-white break-keep">제조사 제조방법에 따름</div>
                <div className="text-xs text-emerald-200/80 mt-1 font-semibold break-keep">Virbac(버박) 보비젠 공동 생산 유럽 오리지널 백신</div>
              </div>
            </div>

            <div className="bg-black/20 p-5 sm:p-6 rounded-2xl border border-emerald-800/60">
              <h4 className="text-sm sm:text-base font-black text-amber-300 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0" /> 유효성분 규격 (본제 1두분 3mL 기준)
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm font-bold text-emerald-100/90 leading-relaxed break-keep">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-extrabold shrink-0">• 소 로타바이러스주 TM-91, 혈청형 (불활화) :</span>
                  <span>6.0 log₂ VNT 이상 <span className="text-emerald-300/80 font-normal">(불활화전 10⁵·⁴ ~ 10⁷·² FAID₅₀/ml)</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-extrabold shrink-0">• 소 코로나 바이러스주 C-197 (불활화) :</span>
                  <span>5 log₂ HI 이상 <span className="text-emerald-300/80 font-normal">(불활화전 10⁴·² ~ 10⁶·⁷ TCID₅₀/ml)</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-extrabold shrink-0">• 대장균주 F5 (K99) 흡착소 :</span>
                  <span>ELISA 억제역가 45.2%* 이상 <span className="text-emerald-300/80 font-normal">(0.8 OD이상 불활화전 10⁸ ~ 10¹⁰ CFU/ml)</span></span>
                </li>
              </ul>
              <div className="mt-3 pt-3 border-t border-emerald-800/60 text-[11px] sm:text-xs text-emerald-300/70 font-semibold break-keep">
                * ELISA - 효소면역측정법 (백신 2/3 용량으로 유도된 토끼 혈청 기준)
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA within Infographic */}
        <div className="mt-16 text-center">
          <a 
            href="#inquiry" 
            className="inline-flex items-center justify-center gap-3 bg-emerald-700 hover:bg-emerald-800 text-white font-black px-10 py-5 rounded-full text-lg sm:text-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 break-keep"
          >
            <Syringe className="w-6 h-6 fill-current shrink-0" />
            <span>로타갈 원샷 백신 다이렉트 상담 신청</span>
            <ChevronRight className="w-6 h-6 shrink-0" />
          </a>
        </div>

      </div>
    </section>
  );
}
