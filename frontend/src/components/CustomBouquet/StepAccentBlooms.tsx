import React, { useState } from 'react';
import type { FlowerItem, AISuggestionResponse } from '../../types/bouquet';

interface StepAccentBloomsProps {
  accents: FlowerItem[];
  baseFlowers: FlowerItem[];
  selectedAccents: Record<string, number>;
  selectedBaseFlowers: Record<string, number>;
  onQuantityChange: (accentId: string, delta: number) => void;
  onApplyAISuggestion: (suggestion: AISuggestionResponse) => void;
}

const occasionOptions = [
  'Romance & Anniversary',
  'Birthday Celebration',
  'Gratitude & Thank You',
  'Spring Renewal',
  'Sympathy & Serenity',
  'Haute Elegance / Dinner Party',
];

export const StepAccentBlooms: React.FC<StepAccentBloomsProps> = ({
  accents,
  baseFlowers,
  selectedAccents,
  selectedBaseFlowers,
  onQuantityChange,
  onApplyAISuggestion,
}) => {
  const [occasion, setOccasion] = useState('Romance & Anniversary');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AISuggestionResponse | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [appliedNotice, setAppliedNotice] = useState(false);

  const totalAccentStems = Object.values(selectedAccents).reduce((a, b) => a + b, 0);

  // Collect selected base flowers for AI prompt
  const userBaseSelections = Object.entries(selectedBaseFlowers)
    .filter(([_, qty]) => qty > 0)
    .map(([id, quantity]) => {
      const flower = baseFlowers.find((f) => f.id === id);
      return {
        name: flower?.name || id,
        color: flower?.color || '',
        quantity,
      };
    });

  const handleConsultAI = async () => {
    setIsAiLoading(true);
    setAiError(null);
    setAppliedNotice(false);

    try {
      const response = await fetch('/api/custom-bouquet/ai-suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          baseFlowers: userBaseSelections,
          occasion,
          palettePreference: 'Botanical Harmony',
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: AISuggestionResponse = await response.json();
      setAiResult(data);
    } catch (err: unknown) {
      console.warn('AI fetch error, using local fallback:', err);
      // Fallback response if network issue
      const fallback: AISuggestionResponse = {
        provider: 'botanical-harmony-engine',
        theme: 'Romantic Luxe & Ethereal Halo',
        colorHarmony:
          'Lush focal blooms are balanced by airy gypsophila florets and silvery sage eucalyptus for organic depth and texture.',
        recommendedAccents: [
          {
            flowerId: 'accent-babys-breath',
            name: "Baby's Breath (Gypsophila)",
            suggestedQuantity: 3,
            reason: 'Creates an ethereal cloud halo highlighting focal petals.',
          },
          {
            flowerId: 'accent-eucalyptus',
            name: 'Silver Dollar Eucalyptus',
            suggestedQuantity: 3,
            reason: 'Provides aromatic organic draping and graceful volume.',
          },
        ],
        recommendedWrappingId: 'wrap-glassine',
        floristAdvice:
          'Gently strip lower leaves below vase water line to keep water crystal clear.',
      };
      setAiResult(fallback);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleApply = () => {
    if (!aiResult) return;
    onApplyAISuggestion(aiResult);
    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 4000);
  };

  return (
    <div className="space-y-8">
      {/* AI Assistant Banner */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl bg-linear-to-r from-purple-500/10 via-pink-500/10 to-emerald-500/10 border-2 border-accent/30 shadow-lg relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 relative z-10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/20 text-accent font-bold text-xs uppercase tracking-wider mb-2">
              <span>✨ AI Floral Stylist</span>
              <span className="text-slate-400">•</span>
              <span className="font-medium text-slate-600">Gemini Powered</span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
              Complementary Blooms & Color Harmony
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Unsure which foliage or accent flowers pair best with your chosen focal stems? Let our
              floral design AI analyze your arrangement.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="px-4 py-3 bg-white/80 border border-slate-200/80 rounded-xl font-medium text-sm text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-accent"
            >
              {occasionOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleConsultAI}
              disabled={isAiLoading}
              className="bg-accent hover:bg-purple-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-accent/30 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {isAiLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Styling...
                </>
              ) : (
                <>
                  <span>✨</span>
                  Consult AI Florist
                </>
              )}
            </button>
          </div>
        </div>

        {/* AI Recommendations Result Card */}
        {aiResult && (
          <div className="mt-6 pt-6 border-t border-accent/20 animate-in fade-in-50 duration-300">
            <div className="bg-white/90 rounded-2xl p-6 border border-purple-200/80 shadow-md">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">
                    Styling Concept
                  </span>
                  <h4 className="font-serif text-xl font-bold text-slate-800">{aiResult.theme}</h4>
                </div>
                <button
                  type="button"
                  onClick={handleApply}
                  className="bg-secondary text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm hover:bg-emerald-600 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  1-Click Apply Suggestions
                </button>
              </div>

              <p className="text-sm text-slate-600 mb-4 bg-purple-50/60 p-3.5 rounded-xl border border-purple-100">
                <span className="font-bold text-purple-900">Color Theory: </span>
                {aiResult.colorHarmony}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {aiResult.recommendedAccents.map((item) => (
                  <div
                    key={item.flowerId}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-start gap-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-accent/20 text-accent font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      +{item.suggestedQuantity}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-800">{item.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 italic">
                <span>💡 Florist Note:</span>
                <span>{aiResult.floristAdvice}</span>
              </div>

              {appliedNotice && (
                <div className="mt-3 p-2 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg text-center border border-emerald-200 animate-in fade-in duration-200">
                  ✓ AI complementary stems applied to your bouquet!
                </div>
              )}
            </div>
          </div>
        )}

        {aiError && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 text-xs font-medium rounded-xl border border-red-200">
            {aiError}
          </div>
        )}
      </div>

      {/* Manual Accents Grid Header */}
      <div className="glass-panel p-6 rounded-2xl bg-white/70 border border-white/60">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h3 className="font-serif text-2xl font-bold text-slate-800">
              Accent Blooms & Botanical Foliage
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Add textures, gentle fillers, and lush greenery to frame your arrangement.
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary font-bold text-sm">
            🌿 {totalAccentStems} {totalAccentStems === 1 ? 'Accent Stem' : 'Accent Stems'} Added
          </div>
        </div>
      </div>

      {/* Accents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {accents.map((accent) => {
          const qty = selectedAccents[accent.id] || 0;
          const isSelected = qty > 0;

          return (
            <div
              key={accent.id}
              className={`glass-panel rounded-2xl overflow-hidden bg-white/60 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 ${
                isSelected
                  ? 'border-2 border-secondary ring-4 ring-secondary/10 bg-white/80'
                  : 'border border-white/50'
              }`}
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-100 group">
                <img
                  src={accent.image}
                  alt={accent.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"></div>

                <div className="absolute top-3 left-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20">
                    {accent.category || accent.color}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 shadow-xs">
                    ${accent.unitPrice.toFixed(2)} / stem
                  </span>
                </div>

                {isSelected && (
                  <div className="absolute bottom-3 right-3 bg-secondary text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                    {qty} in Bouquet
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-lg text-slate-800 mb-1">{accent.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                    {accent.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    {isSelected ? `$${(accent.unitPrice * qty).toFixed(2)} total` : 'Add accents'}
                  </span>

                  <div className="flex items-center gap-2">
                    {isSelected && (
                      <button
                        type="button"
                        onClick={() => onQuantityChange(accent.id, -1)}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
                      >
                        -
                      </button>
                    )}

                    {isSelected && (
                      <span className="w-7 text-center font-bold text-sm text-slate-800">{qty}</span>
                    )}

                    <button
                      type="button"
                      onClick={() => onQuantityChange(accent.id, 1)}
                      className={`h-8 px-3 rounded-lg font-bold text-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer ${
                        isSelected
                          ? 'bg-secondary text-white hover:bg-emerald-600 shadow-xs'
                          : 'bg-slate-800 text-white hover:bg-slate-900 shadow-sm'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                      </svg>
                      {isSelected ? 'Add' : 'Add Accent'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
