import React from 'react';
import type { WrappingItem, RibbonItem } from '../../types/bouquet';

interface StepWrappingProps {
  wrappings: WrappingItem[];
  ribbons: RibbonItem[];
  selectedWrappingId: string;
  selectedRibbonId: string;
  cardMessage: string;
  onSelectWrapping: (id: string) => void;
  onSelectRibbon: (id: string) => void;
  onCardMessageChange: (message: string) => void;
}

export const StepWrapping: React.FC<StepWrappingProps> = ({
  wrappings,
  ribbons,
  selectedWrappingId,
  selectedRibbonId,
  cardMessage,
  onSelectWrapping,
  onSelectRibbon,
  onCardMessageChange,
}) => {
  return (
    <div className="space-y-8">
      {/* Wrapping Material Section */}
      <div className="glass-panel p-6 rounded-2xl bg-white/70 border border-white/60">
        <h3 className="font-serif text-2xl font-bold text-slate-800">
          Choose Artisanal Wrapping Paper
        </h3>
        <p className="text-slate-600 text-sm mt-1">
          High-grade European wrapping papers hand-folded to cradle and protect delicate stems.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wrappings.map((wrap) => {
          const isSelected = selectedWrappingId === wrap.id;

          return (
            <div
              key={wrap.id}
              onClick={() => onSelectWrapping(wrap.id)}
              className={`glass-panel rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 ${
                isSelected
                  ? 'border-2 border-primary ring-4 ring-primary/15 bg-white/90 shadow-lg'
                  : 'border border-white/50 bg-white/60 hover:bg-white/80'
              }`}
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-100 group">
                <img
                  src={wrap.image}
                  alt={wrap.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>

                <div className="absolute top-3 left-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20">
                    {wrap.color}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 shadow-xs">
                    ${wrap.price.toFixed(2)}
                  </span>
                </div>

                {isSelected && (
                  <div className="absolute bottom-3 right-3 bg-primary text-white font-bold text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    Selected
                  </div>
                )}
              </div>

              <div className="p-5">
                <h4 className="font-serif font-bold text-lg text-slate-800 mb-1">{wrap.name}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{wrap.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ribbon Finish Section */}
      <div className="glass-panel p-6 rounded-2xl bg-white/70 border border-white/60">
        <h3 className="font-serif text-2xl font-bold text-slate-800">
          Select Accent Ribbon & Cord
        </h3>
        <p className="text-slate-600 text-sm mt-1">
          Tied with a classic florist knot to secure your wrapping with elegance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ribbons.map((ribbon) => {
          const isSelected = selectedRibbonId === ribbon.id;

          return (
            <button
              key={ribbon.id}
              type="button"
              onClick={() => onSelectRibbon(ribbon.id)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'glass-panel bg-white/90 border-2 border-accent ring-2 ring-accent/20 shadow-md'
                  : 'bg-white/60 border-slate-200/70 hover:bg-white/90 hover:border-slate-300'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-md">
                  {ribbon.color}
                </span>
                <span className="text-xs font-bold text-slate-700">${ribbon.price.toFixed(2)}</span>
              </div>
              <p className="font-semibold text-sm text-slate-800">{ribbon.name}</p>
            </button>
          );
        })}
      </div>

      {/* Complimentary Greeting Card Section */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl bg-white/80 border border-white/60 shadow-lg">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="card-msg" className="font-serif text-xl font-bold text-slate-800">
                Personalized Florist Note Card (Complimentary)
              </label>
              <span className="text-xs text-slate-400 font-medium">
                {cardMessage.length}/300 chars
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              We handwrite your message onto thick cotton cardstock sealed with hot wax.
            </p>
            <textarea
              id="card-msg"
              rows={4}
              maxLength={300}
              placeholder="Write a sweet birthday wish, heartfelt romantic note, or words of celebration..."
              value={cardMessage}
              onChange={(e) => onCardMessageChange(e.target.value)}
              className="w-full p-4 bg-white/90 border border-slate-200 rounded-2xl text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/60 transition-all resize-none font-sans"
            />
          </div>

          {/* Note Card Visual Preview */}
          <div className="w-full md:w-64 shrink-0">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Cardstock Preview
            </p>
            <div className="bg-[#fcfaf7] border border-[#e8dfd5] p-5 rounded-2xl shadow-inner min-h-[140px] flex flex-col justify-between font-serif">
              <span className="text-xs text-slate-400 italic">Flora & Co. Bottega</span>
              <p className="text-sm text-slate-700 italic my-2 line-clamp-4 leading-relaxed">
                "{cardMessage || 'Your message will appear here...'}"
              </p>
              <div className="flex justify-end">
                <span className="w-4 h-4 rounded-full bg-primary/40 inline-block"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
