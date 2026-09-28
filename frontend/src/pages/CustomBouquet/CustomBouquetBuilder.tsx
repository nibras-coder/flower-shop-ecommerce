import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { defaultCatalog } from '../../data/defaultCatalog';
import type {
  BouquetCatalog,
  CustomBouquetState,
  PricingBreakdown,
  AISuggestionResponse,
} from '../../types/bouquet';
import { WizardProgress } from '../../components/CustomBouquet/WizardProgress';
import { StepBaseFlowers } from '../../components/CustomBouquet/StepBaseFlowers';
import { StepAccentBlooms } from '../../components/CustomBouquet/StepAccentBlooms';
import { StepWrapping } from '../../components/CustomBouquet/StepWrapping';
import { StepSummary } from '../../components/CustomBouquet/StepSummary';
import { LivePriceBar } from '../../components/CustomBouquet/LivePriceBar';

const initialBouquetState: CustomBouquetState = {
  baseFlowers: {
    'base-rose-red': 3, // starter recommendation
  },
  accentBlooms: {},
  wrappingId: 'wrap-kraft',
  ribbonId: 'ribbon-satin-pink',
  cardMessage: '',
  occasion: 'Romance & Anniversary',
};

const CustomBouquetBuilder: React.FC = () => {
  const [catalog, setCatalog] = useState<BouquetCatalog>(defaultCatalog);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [state, setState] = useState<CustomBouquetState>(initialBouquetState);

  // Fetch catalog from backend API on mount
  useEffect(() => {
    let isMounted = true;
    fetch('/api/custom-bouquet/catalog')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data: BouquetCatalog) => {
        if (isMounted && data.baseFlowers && data.accentBlooms) {
          setCatalog(data);
        }
      })
      .catch((err) => {
        console.info('Using default client floral catalog:', err.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Real-time Dynamic Price Calculation
  const pricing: PricingBreakdown = useMemo(() => {
    const catalogBases = new Map(catalog.baseFlowers.map((f) => [f.id, f]));
    const catalogAccents = new Map(catalog.accentBlooms.map((f) => [f.id, f]));
    const catalogWraps = new Map(catalog.wrappings.map((w) => [w.id, w]));
    const catalogRibbons = new Map(catalog.ribbons.map((r) => [r.id, r]));

    let baseSubtotal = 0;
    let baseStems = 0;
    Object.entries(state.baseFlowers).forEach(([id, qty]) => {
      const flower = catalogBases.get(id);
      if (flower && qty > 0) {
        baseSubtotal += flower.unitPrice * qty;
        baseStems += qty;
      }
    });

    let accentSubtotal = 0;
    let accentStems = 0;
    Object.entries(state.accentBlooms).forEach(([id, qty]) => {
      const flower = catalogAccents.get(id);
      if (flower && qty > 0) {
        accentSubtotal += flower.unitPrice * qty;
        accentStems += qty;
      }
    });

    const wrap = catalogWraps.get(state.wrappingId);
    const wrappingPrice = wrap ? wrap.price : 0;

    const ribbon = catalogRibbons.get(state.ribbonId);
    const ribbonPrice = ribbon ? ribbon.price : 0;

    const totalPrice = +(baseSubtotal + accentSubtotal + wrappingPrice + ribbonPrice).toFixed(2);

    return {
      baseSubtotal: +baseSubtotal.toFixed(2),
      accentSubtotal: +accentSubtotal.toFixed(2),
      wrappingPrice: +wrappingPrice.toFixed(2),
      ribbonPrice: +ribbonPrice.toFixed(2),
      totalStems: baseStems + accentStems,
      totalPrice,
    };
  }, [catalog, state]);

  // Quantity Handlers for Base Flowers
  const handleBaseQuantityChange = (flowerId: string, delta: number) => {
    setState((prev) => {
      const currentQty = prev.baseFlowers[flowerId] || 0;
      const nextQty = Math.max(0, currentQty + delta);
      const nextBases = { ...prev.baseFlowers };
      if (nextQty === 0) {
        delete nextBases[flowerId];
      } else {
        nextBases[flowerId] = nextQty;
      }
      return { ...prev, baseFlowers: nextBases };
    });
  };

  const handleSetBaseQuantity = (flowerId: string, quantity: number) => {
    setState((prev) => {
      const nextBases = { ...prev.baseFlowers };
      if (quantity <= 0) {
        delete nextBases[flowerId];
      } else {
        nextBases[flowerId] = quantity;
      }
      return { ...prev, baseFlowers: nextBases };
    });
  };

  // Quantity Handlers for Accent Blooms
  const handleAccentQuantityChange = (accentId: string, delta: number) => {
    setState((prev) => {
      const currentQty = prev.accentBlooms[accentId] || 0;
      const nextQty = Math.max(0, currentQty + delta);
      const nextAccents = { ...prev.accentBlooms };
      if (nextQty === 0) {
        delete nextAccents[accentId];
      } else {
        nextAccents[accentId] = nextQty;
      }
      return { ...prev, accentBlooms: nextAccents };
    });
  };

  // 1-Click Apply AI Recommendation
  const handleApplyAISuggestion = (suggestion: AISuggestionResponse) => {
    setState((prev) => {
      const updatedAccents = { ...prev.accentBlooms };

      // Add suggested stems
      suggestion.recommendedAccents.forEach((rec) => {
        const qty = rec.suggestedQuantity || 2;
        updatedAccents[rec.flowerId] = (updatedAccents[rec.flowerId] || 0) + qty;
      });

      // Optionally set recommended wrapping if provided
      let nextWrapId = prev.wrappingId;
      if (
        suggestion.recommendedWrappingId &&
        catalog.wrappings.some((w) => w.id === suggestion.recommendedWrappingId)
      ) {
        nextWrapId = suggestion.recommendedWrappingId;
      }

      return {
        ...prev,
        accentBlooms: updatedAccents,
        wrappingId: nextWrapId,
      };
    });
  };

  // Wrapping & Ribbon Handlers
  const handleSelectWrapping = (wrappingId: string) => {
    setState((prev) => ({ ...prev, wrappingId }));
  };

  const handleSelectRibbon = (ribbonId: string) => {
    setState((prev) => ({ ...prev, ribbonId }));
  };

  const handleCardMessageChange = (cardMessage: string) => {
    setState((prev) => ({ ...prev, cardMessage }));
  };

  // Navigation Logic
  const canProceedFromCurrentStep = useMemo(() => {
    if (currentStep === 1) {
      // Must have at least 1 base stem
      const totalBases = Object.values(state.baseFlowers).reduce((a, b) => a + b, 0);
      return totalBases >= 1;
    }
    if (currentStep === 2) {
      return true; // Accents are optional
    }
    if (currentStep === 3) {
      return !!state.wrappingId;
    }
    return true;
  }, [currentStep, state]);

  const handleNextStep = () => {
    if (canProceedFromCurrentStep && currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepClick = (step: number) => {
    // Only allow clicking if jumping backwards or if current step is valid
    if (step < currentStep || canProceedFromCurrentStep) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetBouquet = () => {
    setState(initialBouquetState);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background font-sans text-slate-800 flex flex-col relative overflow-x-hidden">
      {/* Background Decorative Blobs matching the luxury palette */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-[100px] pointer-events-none opacity-60"></div>
      <div className="absolute top-80 right-10 w-[32rem] h-[32rem] bg-secondary/15 rounded-full mix-blend-multiply filter blur-[120px] pointer-events-none opacity-50"></div>
      <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-primary/15 rounded-full mix-blend-multiply filter blur-[100px] pointer-events-none opacity-50"></div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 glass-panel bg-white/70 backdrop-blur-2xl border-b border-white/50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="font-serif text-2xl md:text-3xl font-bold text-primary tracking-tight group-hover:opacity-90 transition-opacity">
                Flora&Co.
              </span>
              <span className="hidden sm:inline-block text-xs uppercase font-bold tracking-widest text-slate-400 border-l border-slate-200 pl-3">
                Bouquet Studio
              </span>
            </Link>

            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                to="/"
                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors hidden sm:inline-block"
              >
                Home
              </Link>
              <Link
                to="/delivery"
                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors hidden sm:inline-block"
              >
                Delivery Portal
              </Link>
              <Link
                to="/login"
                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Studio Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full relative z-10">
        {/* Wizard Progress */}
        <WizardProgress
          currentStep={currentStep}
          totalSteps={4}
          onStepClick={handleStepClick}
        />

        {/* Step Views */}
        {currentStep === 1 && (
          <StepBaseFlowers
            flowers={catalog.baseFlowers}
            selectedFlowers={state.baseFlowers}
            onQuantityChange={handleBaseQuantityChange}
            onSetQuantity={handleSetBaseQuantity}
          />
        )}

        {currentStep === 2 && (
          <StepAccentBlooms
            accents={catalog.accentBlooms}
            baseFlowers={catalog.baseFlowers}
            selectedAccents={state.accentBlooms}
            selectedBaseFlowers={state.baseFlowers}
            onQuantityChange={handleAccentQuantityChange}
            onApplyAISuggestion={handleApplyAISuggestion}
          />
        )}

        {currentStep === 3 && (
          <StepWrapping
            wrappings={catalog.wrappings}
            ribbons={catalog.ribbons}
            selectedWrappingId={state.wrappingId}
            selectedRibbonId={state.ribbonId}
            cardMessage={state.cardMessage}
            onSelectWrapping={handleSelectWrapping}
            onSelectRibbon={handleSelectRibbon}
            onCardMessageChange={handleCardMessageChange}
          />
        )}

        {currentStep === 4 && (
          <StepSummary
            catalog={catalog}
            state={state}
            pricing={pricing}
            onEditStep={handleStepClick}
            onResetBouquet={handleResetBouquet}
          />
        )}

        {/* Live Real-time Price Bar (displayed on steps 1, 2, 3) */}
        {currentStep < 4 && (
          <LivePriceBar
            pricing={pricing}
            currentStep={currentStep}
            totalSteps={4}
            canProceed={canProceedFromCurrentStep}
            onNext={handleNextStep}
            onBack={handleBackStep}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-center py-8 text-xs border-t border-slate-800 mt-16">
        <p className="font-serif text-white text-base font-bold mb-1">Flora&Co. Custom Floral Atelier</p>
        <p>© 2026 Flora&Co. All custom bouquets hand-arranged and delivered fresh.</p>
      </footer>
    </div>
  );
};

export default CustomBouquetBuilder;
