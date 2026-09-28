import React from 'react';
import type { FlowerItem } from '../../types/bouquet';

interface StepBaseFlowersProps {
  flowers: FlowerItem[];
  selectedFlowers: Record<string, number>;
  onQuantityChange: (flowerId: string, delta: number) => void;
  onSetQuantity: (flowerId: string, quantity: number) => void;
}

export const StepBaseFlowers: React.FC<StepBaseFlowersProps> = ({
  flowers,
  selectedFlowers,
  onQuantityChange,
}) => {
  const totalBaseStems = Object.values(selectedFlowers).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Intro & Guidance Banner */}
      <div className="glass-panel p-6 rounded-2xl bg-white/70 border border-white/60">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-800">
              Select Your Focal Flowers
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Focal blooms establish the anchor, color palette, and heart of your custom bouquet.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold text-sm">
              🌸 {totalBaseStems} {totalBaseStems === 1 ? 'Stem' : 'Stems'} Selected
            </div>
          </div>
        </div>
      </div>

      {/* Flower Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {flowers.map((flower) => {
          const qty = selectedFlowers[flower.id] || 0;
          const isSelected = qty > 0;

          return (
            <div
              key={flower.id}
              className={`glass-panel rounded-2xl overflow-hidden bg-white/60 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 ${
                isSelected
                  ? 'border-2 border-primary ring-4 ring-primary/10 bg-white/80'
                  : 'border border-white/50'
              }`}
            >
              {/* Image & Badges */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100 group">
                <img
                  src={flower.image}
                  alt={flower.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"></div>

                {/* Color Tag */}
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20">
                    {flower.color}
                  </span>
                </div>

                {/* Price Tag */}
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 shadow-xs">
                    ${flower.unitPrice.toFixed(2)} / stem
                  </span>
                </div>

                {/* Stem Count Pill (if selected) */}
                {isSelected && (
                  <div className="absolute bottom-3 right-3 bg-primary text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                    {qty} in Bouquet
                  </div>
                )}
              </div>

              {/* Body Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-800 mb-1">{flower.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                    {flower.description}
                  </p>

                  {flower.meanings && (
                    <p className="text-[11px] text-accent font-medium mb-4 italic">
                      ✨ {flower.meanings}
                    </p>
                  )}
                </div>

                {/* Quantity Controls */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    {isSelected ? `$${(flower.unitPrice * qty).toFixed(2)} total` : 'Add stems'}
                  </span>

                  <div className="flex items-center gap-2">
                    {isSelected && (
                      <button
                        type="button"
                        onClick={() => onQuantityChange(flower.id, -1)}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
                        title="Decrease stem quantity"
                      >
                        -
                      </button>
                    )}

                    {isSelected && (
                      <span className="w-7 text-center font-bold text-sm text-slate-800">{qty}</span>
                    )}

                    <button
                      type="button"
                      onClick={() => onQuantityChange(flower.id, 1)}
                      className={`h-8 px-3 rounded-lg font-bold text-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer ${
                        isSelected
                          ? 'bg-primary text-white hover:bg-pink-600 shadow-xs'
                          : 'bg-primary/90 text-white hover:bg-primary shadow-sm'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                      </svg>
                      {isSelected ? 'Add' : 'Add Stem'}
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
