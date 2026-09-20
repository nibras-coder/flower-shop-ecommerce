import express from 'express';
import { getCatalog } from '../data/bouquetCatalog.js';
import { getFloralRecommendations } from '../services/flowerAiService.js';

const router = express.Router();

// @desc    Get master bouquet catalog (flowers, wrappings, ribbons, prices)
// @route   GET /api/custom-bouquet/catalog
// @access  Public
router.get('/catalog', (req, res) => {
  res.json(getCatalog());
});

// @desc    Get AI-driven complementary flower & styling recommendations
// @route   POST /api/custom-bouquet/ai-suggest
// @access  Public
router.post('/ai-suggest', async (req, res) => {
  try {
    const { baseFlowers, occasion, palettePreference } = req.body;
    const recommendations = await getFloralRecommendations({
      baseFlowers: baseFlowers || [],
      occasion: occasion || 'Celebration',
      palettePreference: palettePreference || 'Balanced'
    });
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to generate floral recommendations' });
  }
});

export default router;
