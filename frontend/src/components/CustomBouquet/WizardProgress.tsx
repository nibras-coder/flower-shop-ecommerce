import React from 'react';

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

const steps = [
  { step: 1, title: 'Focal Flowers', subtitle: 'Base Blooms' },
  { step: 2, title: 'Accents & AI', subtitle: 'Fillers & Harmony' },
  { step: 3, title: 'Wrap & Ribbon', subtitle: 'Artisanal Finish' },
  { step: 4, title: 'Final Summary', subtitle: 'Order & Deliver' },
];

export const WizardProgress: React.FC<WizardProgressProps> = ({
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="w-full mb-8">
      {/* Step Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((item) => {
          const isActive = item.step === currentStep;
          const isCompleted = item.step < currentStep;

          return (
            <button
              key={item.step}
              type="button"
              onClick={() => onStepClick(item.step)}
              className={`text-left p-3.5 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                isActive
                  ? 'glass-panel bg-white/80 border-primary/50 shadow-md ring-2 ring-primary/20'
                  : isCompleted
                  ? 'bg-white/60 hover:bg-white border-secondary/40 text-slate-700'
                  : 'bg-white/40 border-slate-200/60 text-slate-400 hover:bg-white/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-sm shadow-primary/40'
                      : isCompleted
                      ? 'bg-secondary text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    `0${item.step}`
                  )}
                </div>
                <div className="min-w-0">
                  <p
                    className={`text-xs font-bold uppercase tracking-wider truncate ${
                      isActive ? 'text-primary' : isCompleted ? 'text-secondary' : 'text-slate-400'
                    }`}
                  >
                    Step {item.step}
                  </p>
                  <p className="text-sm font-semibold text-slate-800 truncate">{item.title}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Thin animated line progress */}
      <div className="w-full h-1 bg-slate-200/80 rounded-full mt-4 overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-primary via-accent to-secondary transition-all duration-500 ease-out rounded-full"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};
