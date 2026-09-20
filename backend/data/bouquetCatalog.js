// Master Floral Catalog & Dynamic Pricing System
export const bouquetCatalog = {
  baseFlowers: [
    {
      id: 'base-rose-red',
      name: 'Classic Red Rose',
      color: 'Crimson Red',
      unitPrice: 4.5,
      description: 'Velvety Ecuadorian red roses symbolizing deep passion and enduring love.',
      image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=600&auto=format&fit=crop',
      meanings: 'Passionate romance, timeless elegance'
    },
    {
      id: 'base-rose-pink',
      name: 'Blush Pink Rose',
      color: 'Soft Pink',
      unitPrice: 4.5,
      description: 'Delicate pastel pink roses offering grace, sweet gentleness, and refined romance.',
      image: 'https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=600&auto=format&fit=crop',
      meanings: 'Gratitude, grace, joy'
    },
    {
      id: 'base-lily-white',
      name: 'White Oriental Lily',
      color: 'Pure White',
      unitPrice: 5.0,
      description: 'Stately, richly perfumed star-shaped white lilies representing purity and rebirth.',
      image: 'https://images.unsplash.com/photo-1589244159943-460088ed5c92?q=80&w=600&auto=format&fit=crop',
      meanings: 'Purity, sophistication, devotion'
    },
    {
      id: 'base-sunflower',
      name: 'Golden Sunflower',
      color: 'Sunny Gold',
      unitPrice: 3.8,
      description: 'Vibrant golden petals surrounding dark velvet disks radiating joy, energy, and warmth.',
      image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=600&auto=format&fit=crop',
      meanings: 'Adoration, loyalty, vibrant longevity'
    },
    {
      id: 'base-peony-coral',
      name: 'Coral Charm Peony',
      color: 'Coral / Peach',
      unitPrice: 6.5,
      description: 'Lush, bowl-shaped blossoms with layered ruffled petals shifting gracefully from coral to soft cream.',
      image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=600&auto=format&fit=crop',
      meanings: 'Prosperity, good fortune, happy marriage'
    },
    {
      id: 'base-orchid-purple',
      name: 'Royal Purple Orchid',
      color: 'Vibrant Violet',
      unitPrice: 7.0,
      description: 'Exquisite cascading phalaenopsis blooms with velvety amethyst tones and striking poise.',
      image: 'https://images.unsplash.com/photo-1562688849-ceb8c4c324fb?q=80&w=600&auto=format&fit=crop',
      meanings: 'Luxury, rare beauty, admiration'
    },
    {
      id: 'base-tulip-mix',
      name: 'Spring French Tulip',
      color: 'Peach & Sunset',
      unitPrice: 3.2,
      description: 'Smooth goblet-shaped stems bringing crisp spring cheer and lively botanical curves.',
      image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=600&auto=format&fit=crop',
      meanings: 'Perfect enduring affection, rebirth'
    },
    {
      id: 'base-carnation-cream',
      name: 'Vintage Cream Carnation',
      color: 'Creamy Ivory',
      unitPrice: 2.8,
      description: 'Ruffled, spicy-scented blossoms with unmatched vase longevity and plush volume.',
      image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=600&auto=format&fit=crop',
      meanings: 'Pure affection, good luck'
    }
  ],
  accentBlooms: [
    {
      id: 'accent-babys-breath',
      name: "Baby's Breath (Gypsophila)",
      color: 'Snow White',
      unitPrice: 2.0,
      description: 'Airy cloud of miniature white florets providing ethereal lightness and soft halo framing.',
      image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=600&auto=format&fit=crop',
      category: 'Filler'
    },
    {
      id: 'accent-eucalyptus',
      name: 'Silver Dollar Eucalyptus',
      color: 'Sage Green',
      unitPrice: 2.5,
      description: 'Aromatic blue-green coin foliage offering organic cascading lines and fresh herbal fragrance.',
      image: 'https://images.unsplash.com/photo-1516048015710-7a3b4c86be43?q=80&w=600&auto=format&fit=crop',
      category: 'Foliage'
    },
    {
      id: 'accent-lavender',
      name: 'English French Lavender',
      color: 'Lilac Purple',
      unitPrice: 2.2,
      description: 'Slender aromatic purple spikes adding soothing scent and textural contrast.',
      image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?q=80&w=600&auto=format&fit=crop',
      category: 'Herbal Accent'
    },
    {
      id: 'accent-ruscus',
      name: 'Italian Ruscus',
      color: 'Deep Emerald',
      unitPrice: 1.8,
      description: 'Glossy slender green vines that frame focal blooms with modern botanical architecture.',
      image: 'https://images.unsplash.com/photo-1615476059436-b51f084be1a1?q=80&w=600&auto=format&fit=crop',
      category: 'Greenery'
    },
    {
      id: 'accent-chamomile',
      name: 'Matricaria Chamomile',
      color: 'White & Yellow',
      unitPrice: 2.5,
      description: 'Charming daisy-like wild sprigs that add spontaneous meadow freshness and playful sweetness.',
      image: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=600&auto=format&fit=crop',
      category: 'Meadow Accent'
    },
    {
      id: 'accent-thistle',
      name: 'Blue Thistle (Eryngium)',
      color: 'Steel Blue',
      unitPrice: 3.0,
      description: 'Sculptural metallic blue cones with spiky bracts for bold textural contrast and modern flair.',
      image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=600&auto=format&fit=crop',
      category: 'Textural'
    }
  ],
  wrappings: [
    {
      id: 'wrap-kraft',
      name: 'Natural Earth Kraft Paper',
      price: 3.0,
      color: 'Earth Brown',
      description: 'Eco-conscious artisanal unbleached kraft paper for organic, rustic botanical elegance.',
      image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'wrap-glassine',
      name: 'Frosted Translucent Glassine',
      price: 4.5,
      color: 'Frosted Mist',
      description: 'Modern waterproof matte translucent wrap allowing subtle bloom colors to glow through.',
      image: 'https://images.unsplash.com/photo-1607344645866-009c320b5ab8?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'wrap-silk-pink',
      name: 'Blush Silk Tissue & Pearlescent Film',
      price: 3.5,
      color: 'Blush Pink',
      description: 'Ultra-soft feminine layer with iridescent sheen that highlights romantic bouquets.',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'wrap-matte-black',
      name: 'Midnight Matte Luxury Wrap',
      price: 5.0,
      color: 'Midnight Onyx',
      description: 'High-contrast editorial black parchment providing dramatic luxury and vivid petal contrast.',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'wrap-linen',
      name: 'Botanical Raw Linen Fabric',
      price: 6.0,
      color: 'Oatmeal Linen',
      description: 'Pure reusable natural flax linen hemmed by hand for sustainable haute-couture presentation.',
      image: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?q=80&w=600&auto=format&fit=crop'
    }
  ],
  ribbons: [
    {
      id: 'ribbon-satin-pink',
      name: 'Champagne Blush Satin Ribbon',
      price: 2.0,
      color: 'Champagne Blush'
    },
    {
      id: 'ribbon-velvet-emerald',
      name: 'Deep Emerald Velvet Ribbon',
      price: 3.0,
      color: 'Emerald'
    },
    {
      id: 'ribbon-jute',
      name: 'Twisted Natural Jute Cord',
      price: 1.5,
      color: 'Natural Tan'
    },
    {
      id: 'ribbon-gold-organza',
      name: 'Shimmering Gold Organza',
      price: 2.5,
      color: 'Gold'
    }
  ]
};

export const getCatalog = () => bouquetCatalog;

/**
 * Validates custom bouquet contents and calculates server-side dynamic price.
 * @param {Object} customBouquet
 * @returns {Object} { isValid, error, calculatedTotal, breakdown, validatedBouquet, summaryText }
 */
export const validateAndCalculatePrice = (customBouquet) => {
  if (!customBouquet) {
    return { isValid: false, error: 'Custom bouquet data is missing' };
  }

  const {
    baseFlowers = [],
    accentBlooms = [],
    wrapping,
    ribbon,
    cardMessage = ''
  } = customBouquet;

  const catalogBases = new Map(bouquetCatalog.baseFlowers.map(f => [f.id, f]));
  const catalogAccents = new Map(bouquetCatalog.accentBlooms.map(f => [f.id, f]));
  const catalogWrappings = new Map(bouquetCatalog.wrappings.map(w => [w.id, w]));
  const catalogRibbons = new Map(bouquetCatalog.ribbons.map(r => [r.id, r]));

  let baseSubtotal = 0;
  let totalBaseStems = 0;
  const validatedBaseFlowers = [];

  for (const item of baseFlowers) {
    const flower = catalogBases.get(item.flowerId);
    if (!flower) {
      return { isValid: false, error: `Unrecognized base flower ID: ${item.flowerId}` };
    }
    const quantity = Math.floor(Number(item.quantity) || 0);
    if (quantity < 1) continue;

    const lineTotal = +(flower.unitPrice * quantity).toFixed(2);
    baseSubtotal += lineTotal;
    totalBaseStems += quantity;

    validatedBaseFlowers.push({
      flowerId: flower.id,
      name: flower.name,
      unitPrice: flower.unitPrice,
      quantity
    });
  }

  if (validatedBaseFlowers.length === 0 || totalBaseStems < 1) {
    return { isValid: false, error: 'Bouquet must contain at least 1 focal base flower stem' };
  }

  let accentSubtotal = 0;
  let totalAccentStems = 0;
  const validatedAccentBlooms = [];

  for (const item of accentBlooms) {
    const flower = catalogAccents.get(item.flowerId);
    if (!flower) {
      return { isValid: false, error: `Unrecognized accent bloom ID: ${item.flowerId}` };
    }
    const quantity = Math.floor(Number(item.quantity) || 0);
    if (quantity < 1) continue;

    const lineTotal = +(flower.unitPrice * quantity).toFixed(2);
    accentSubtotal += lineTotal;
    totalAccentStems += quantity;

    validatedAccentBlooms.push({
      flowerId: flower.id,
      name: flower.name,
      unitPrice: flower.unitPrice,
      quantity
    });
  }

  // Validate wrapping
  if (!wrapping || !wrapping.wrappingId) {
    return { isValid: false, error: 'A wrapping material must be selected' };
  }
  const catalogWrap = catalogWrappings.get(wrapping.wrappingId);
  if (!catalogWrap) {
    return { isValid: false, error: `Unrecognized wrapping material ID: ${wrapping.wrappingId}` };
  }
  const wrappingPrice = catalogWrap.price;
  const validatedWrapping = {
    wrappingId: catalogWrap.id,
    name: catalogWrap.name,
    price: catalogWrap.price,
    color: catalogWrap.color
  };

  // Validate ribbon (optional)
  let ribbonPrice = 0;
  let validatedRibbon = null;
  if (ribbon && ribbon.ribbonId) {
    const catalogRib = catalogRibbons.get(ribbon.ribbonId);
    if (catalogRib) {
      ribbonPrice = catalogRib.price;
      validatedRibbon = {
        ribbonId: catalogRib.id,
        name: catalogRib.name,
        price: catalogRib.price,
        color: catalogRib.color
      };
    }
  }

  const calculatedTotal = +(baseSubtotal + accentSubtotal + wrappingPrice + ribbonPrice).toFixed(2);

  // Build human-readable summary string
  const baseSummary = validatedBaseFlowers.map(f => `${f.quantity}x ${f.name}`).join(', ');
  const accentSummary = validatedAccentBlooms.length > 0
    ? ` + ${validatedAccentBlooms.map(a => `${a.quantity}x ${a.name}`).join(', ')}`
    : '';
  const wrapSummary = ` wrapped in ${validatedWrapping.name}`;
  const ribbonSummary = validatedRibbon ? ` with ${validatedRibbon.name}` : '';
  const summaryText = `Custom Bouquet: ${baseSummary}${accentSummary}${wrapSummary}${ribbonSummary}`;

  return {
    isValid: true,
    calculatedTotal,
    breakdown: {
      baseSubtotal: +baseSubtotal.toFixed(2),
      accentSubtotal: +accentSubtotal.toFixed(2),
      wrappingPrice: +wrappingPrice.toFixed(2),
      ribbonPrice: +ribbonPrice.toFixed(2),
      totalStems: totalBaseStems + totalAccentStems
    },
    validatedBouquet: {
      baseFlowers: validatedBaseFlowers,
      accentBlooms: validatedAccentBlooms,
      wrapping: validatedWrapping,
      ribbon: validatedRibbon,
      cardMessage: (cardMessage || '').trim().slice(0, 500)
    },
    summaryText
  };
};
