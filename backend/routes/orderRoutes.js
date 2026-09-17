import express from 'express';
import { updateOrderToDelivered } from '../controllers/orderController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.put('/:id/deliver', protect, authorize('Admin', 'Delivery Staff'), updateOrderToDelivered);

export default router;
