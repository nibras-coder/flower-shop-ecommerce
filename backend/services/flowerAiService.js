import { bouquetCatalog } from '../data/bouquetCatalog.js';

/**
 * Modular Floral AI Service
 * Supports Google Gemini API as primary AI provider with environment secrets (GEMINI_API_KEY).
 * Includes an intelligent botanical pairing and floral color harmony fallback engine.
 */

// Heuristic botanical pairing rules for offline / keyless fallback
const getFallbackRecommendations = ({ baseFlowers = [], occasion = 'Celebration' }) => {
  const flowerNames = baseFlowers.map(f => (f.name || '').toLowerCase());
  const hasRose = flowerNames.some(n => n.includes('rose'));
  const hasLily = flowerNames.some(n => n.includes('lily'));
  const hasSunflower = flowerNames.some(n => n.includes('sunflower'));
  const hasPeony = flowerNames.some(n => n.includes('peony'));
  const hasOrchid = flowerNames.some(n => n.includes('orchid'));
  const hasTulip = flowerNames.some(n => n.includes('tulip'));

  let theme = 'Harmonious Botanical Meadow';
  let colorHarmony = 'A balanced blend of complementary tones and fresh botanical greens.';
  let recommendedAccents = [];
  let recommendedWrappingId = 'wrap-kraft';
  let floristAdvice = 'Keep flowers in cool, indirect sunlight and recut stems every 2 days.';

  if (hasRose || hasPeony) {
    theme = 'Romantic Luxe & Ethereal Halo';
    colorHarmony = 'Lush focal blooms are softened by airy white florets and silver-sage foliage, creating a dreamy, layered depth.';
    recommendedAccents = [
      {
        flowerId: 'accent-babys-breath',
        name: "Baby's Breath (Gypsophila)",
        suggestedQuantity: 3,
        reason: 'Adds an ethereal cloud-like halo that highlights the velvety petals of your focal roses and peonies.'
      },
      {
        flowerId: 'accent-eucalyptus',
        name: 'Silver Dollar Eucalyptus',
        suggestedQuantity: 3,
        reason: 'Provides aromatic organic draping and silvery sage tones that balance warm petals.'
      }
    ];
    recommendedWrappingId = 'wrap-glassine';
    floristAdvice = 'Gently strip lower foliage below water level to preserve floral clarity and maximize vase life.';
  } else if (hasSunflower) {
    theme = 'Sun-Drenched Countryside Bloom';
    colorHarmony = 'Vibrant golden sunflowers contrast against deep emerald ruscus and wild chamomile for joyful warmth.';
    recommendedAccents = [
      {
        flowerId: 'accent-chamomile',
        name: 'Matricaria Chamomile',
        suggestedQuantity: 4,
        reason: 'Daisy-like wild blossoms harmonize naturally with the sunny disks of your sunflowers.'
      },
      {
        flowerId: 'accent-ruscus',
        name: 'Italian Ruscus',
        suggestedQuantity: 3,
        reason: 'Lustrous emerald vines frame the tall stems and keep the arrangement grounded.'
      }
    ];
    recommendedWrappingId = 'wrap-kraft';
    floristAdvice = 'Sunflowers are vigorous water drinkers. Fill vase generously and refresh every 24 hours.';
  } else if (hasLily || hasOrchid) {
    theme = 'Haute Couture Editorial Grace';
    colorHarmony = 'Exquisite architectural flowers matched with cool steel blue thistle and lavender accents for dramatic sophistication.';
    recommendedAccents = [
      {
        flowerId: 'accent-thistle',
        name: 'Blue Thistle (Eryngium)',
        suggestedQuantity: 2,
        reason: 'Sculptural metallic blue cones provide avant-garde textural contrast against smooth petals.'
      },
      {
        flowerId: 'accent-eucalyptus',
        name: 'Silver Dollar Eucalyptus',
        suggestedQuantity: 3,
        reason: 'Gentle, modern greenery that allows grand focal stems to take center stage.'
      }
    ];
    recommendedWrappingId = 'wrap-matte-black';
    floristAdvice = 'Carefully pinch off pollen anthers on lilies as they open to protect petals and extend freshness.';
  } else if (hasTulip) {
    theme = 'Springtime Awakening';
    colorHarmony = 'Lively pastels combined with aromatic French lavender and baby’s breath evoke a dewy garden morning.';
    recommendedAccents = [
      {
        flowerId: 'accent-lavender',
        name: 'English French Lavender',
        suggestedQuantity: 3,
        reason: 'Adds sweet, relaxing botanical fragrance and delicate lilac verticality.'
      },
      {
        flowerId: 'accent-babys-breath',
        name: "Baby's Breath (Gypsophila)",
        suggestedQuantity: 2,
        reason: 'Softens crisp tulip contours and adds airy volume.'
      }
    ];
    recommendedWrappingId = 'wrap-linen';
    floristAdvice = 'Tulips continue to grow toward the light in water! Trim stems slightly shorter than companion blooms.';
  } else {
    // Default balanced selection
    recommendedAccents = [
      {
        flowerId: 'accent-eucalyptus',
        name: 'Silver Dollar Eucalyptus',
        suggestedQuantity: 2,
        reason: 'Versatile, cascading foliage that lends luxury volume to any arrangement.'
      },
      {
        flowerId: 'accent-babys-breath',
        name: "Baby's Breath (Gypsophila)",
        suggestedQuantity: 2,
        reason: 'Universal filler floret creating depth and gentle framing.'
      }
    ];
    recommendedWrappingId = 'wrap-silk-pink';
    floristAdvice = 'Keep bouquet in a cool room away from fruit bowls, as ripening fruit emits ethylene gas.';
  }

  // Adjust theme according to occasion if specified
  if (occasion === 'Romance') {
    theme = `Romantic: ${theme}`;
  } else if (occasion === 'Sympathy') {
    theme = `Serene Grace: ${theme}`;
    recommendedWrappingId = 'wrap-glassine';
  } else if (occasion === 'Celebration' || occasion === 'Birthday') {
    theme = `Festive Radiance: ${theme}`;
  }

  return {
    provider: 'botanical-harmony-engine',
    theme,
    colorHarmony,
    recommendedAccents,
    recommendedWrappingId,
    floristAdvice
  };
};

/**
 * Main AI Recommendation Endpoint
 * Calls Gemini if GEMINI_API_KEY is defined in process.env, otherwise falls back gracefully.
 */
export const getFloralRecommendations = async ({ baseFlowers = [], occasion = 'Celebration', palettePreference = 'Balanced' }) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_gemini_api_key_here') {
    return getFallbackRecommendations({ baseFlowers, occasion });
  }

  try {
    const catalogAccents = bouquetCatalog.accentBlooms.map(b => `${b.name} (id: ${b.id}, color: ${b.color}, style: ${b.category})`).join('\n- ');
    const catalogWraps = bouquetCatalog.wrappings.map(w => `${w.name} (id: ${w.id}, style: ${w.color})`).join('\n- ');
    const userSelectedStems = baseFlowers.map(f => `${f.quantity || 1}x ${f.name} (${f.color || ''})`).join(', ');

    const prompt = `You are a master florist at Flora&Co., an ultra-luxury floral boutique.
A customer has chosen the following focal base flowers:
${userSelectedStems || 'Assorted seasonal flowers'}

Occasion/Vibe: ${occasion}
Palette preference: ${palettePreference}

Select the perfect complementary accent blooms and wrapping material ONLY from our exact catalog below:
Available Accent Blooms & Greenery:
- ${catalogAccents}

Available Wrapping Materials:
- ${catalogWraps}

Provide your recommendations strictly as valid JSON without markdown wrapping:
{
  "theme": "Arrangement style title (3 to 6 words)",
  "colorHarmony": "1-2 sentences explaining why the colors, textures, and flower shapes harmonize",
  "recommendedAccents": [
    {
      "flowerId": "id from catalog above",
      "name": "flower name from catalog",
      "suggestedQuantity": 2,
      "reason": "specific floral styling reason"
    }
  ],
  "recommendedWrappingId": "id from catalog above",
  "floristAdvice": "1 professional floral conditioning, water, or styling tip"
}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 600
        }
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.warn(`Gemini API responded with status ${response.status}. Falling back to botanical harmony engine.`);
      return getFallbackRecommendations({ baseFlowers, occasion });
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Clean JSON if Gemini wrapped in ```json ... ```
    const cleanedJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanedJson);

    return {
      provider: 'gemini-1.5-flash',
      theme: parsed.theme || 'Bespoke Floral Harmony',
      colorHarmony: parsed.colorHarmony || 'Expertly styled botanical pairing.',
      recommendedAccents: Array.isArray(parsed.recommendedAccents) ? parsed.recommendedAccents : [],
      recommendedWrappingId: parsed.recommendedWrappingId || 'wrap-glassine',
      floristAdvice: parsed.floristAdvice || 'Cut stems diagonally before placing in fresh water.'
    };
  } catch (error) {
    console.warn('AI recommendation error or timeout:', error.message);
    return getFallbackRecommendations({ baseFlowers, occasion });
  }
};
