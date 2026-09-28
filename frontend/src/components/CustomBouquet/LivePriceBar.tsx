import React from 'react';
import type { PricingBreakdown } from '../../types/bouquet';

interface LivePriceBarProps {
  pricing: PricingBreakdown;
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  onNext: () => void;
  onBack: () => void;
}

export const LivePriceBar: React.FC<LivePriceBarProps> = ({
  pricing,
  currentStep,
  totalSteps,
  canProceed,
  onNext,
  onBack,
}) => {
  return (
    <aside aria-label="Order Price Summary" className="sticky bottom-4 z-40 w-full max-w-5xl mx-auto px-4 mt-8">
      <div className="glass-panel bg-slate-900/90 text-white backdrop-blur-2xl rounded-3xl p-4 sm:p-5 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Stem & Item Mini Breakdown */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs text-slate-300 w-full sm:w-auto justify-between sm:justify-start">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Stems</p>
              <p className="text-base sm:text-lg font-black text-white">{pricing.totalStems} stems</p>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Flowers</p>
              <p className="font-semibold text-slate-200">
                ${(pricing.baseSubtotal + pricing.accentSubtotal).toFixed(2)}
              </p>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Wrapping</p>
              <p className="font-semibold text-slate-200">
                ${(pricing.wrappingPrice + pricing.ribbonPrice).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Grand Total & Action Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
            <div className="text-left sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Live Total</span>
              <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                ${pricing.totalPrice.toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={onBack}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl transition-all cursor-pointer"
                >
                  Back
                </button>
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={onNext}
                  disabled={!canProceed}
                  className="px-6 py-3 bg-primary hover:bg-pink-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/30 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>{currentStep === 3 ? 'Review Bouquet' : 'Continue'}</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
