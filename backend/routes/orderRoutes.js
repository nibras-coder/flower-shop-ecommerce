import express from 'express';
import { updateOrderToDelivered, updateOrderToAttempted, createOrder, getOrderById } from '../controllers/orderController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Optional authentication middleware: links user if token present, but allows guest orders
const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch {
      // Ignore token failure for guest orders
    }
  }
  next();
};

const router = express.Router();
router.post('/', optionalAuth, createOrder);
router.get('/:id', optionalAuth, getOrderById);
router.put('/:id/deliver', protect, authorize('Admin', 'Delivery Staff'), updateOrderToDelivered);
router.put('/:id/attempt', protect, authorize('Admin', 'Delivery Staff'), updateOrderToAttempted);

export default router;
