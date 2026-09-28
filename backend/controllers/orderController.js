import mongoose from 'mongoose';
import Order from '../models/Order.js';
import { validateAndCalculatePrice } from '../data/bouquetCatalog.js';
import { generateUniqueOrderNumber } from '../utils/orderNumberGenerator.js';

// @desc    Create new order (with dynamic bouquet pricing validation)
// @route   POST /api/orders
// @access  Public / Authenticated
export const createOrder = async (req, res) => {
  try {
    const {
      customerAddress,
      customerName,
      customerEmail,
      phone,
      deliveryWindow,
      customBouquet,
      totalPrice: clientTotalPrice,
      items: clientItems
    } = req.body;

    if (!customerAddress || customerAddress.trim() === '') {
      res.status(400);
      throw new Error('Customer delivery address is required');
    }

    let finalPrice = clientTotalPrice || 0;
    let finalItems = clientItems || 'Custom Floral Arrangement';
    let validatedBouquet = null;

    // Validate dynamic pricing if customBouquet is submitted
    if (customBouquet) {
      const validation = validateAndCalculatePrice(customBouquet);
      if (!validation.isValid) {
        res.status(400);
        throw new Error(validation.error || 'Custom bouquet configuration is invalid');
      }

      // Check price tampering (allowing +/- 0.05 rounding tolerance)
      if (clientTotalPrice !== undefined && Math.abs(clientTotalPrice - validation.calculatedTotal) > 0.05) {
        res.status(400);
        throw new Error(
          `Price validation failed: client submitted $${clientTotalPrice}, but backend verified total is $${validation.calculatedTotal}`
        );
      }

      finalPrice = validation.calculatedTotal;
      finalItems = validation.summaryText;
      validatedBouquet = validation.validatedBouquet;
    }

    const uniqueOrderNumber =
      (typeof req.body.orderNumber === 'string' && req.body.orderNumber.trim()) ||
      (await generateUniqueOrderNumber(Order));

    const orderData = {
      orderNumber: uniqueOrderNumber,
      customerAddress,
      customerName: customerName || 'Valued Customer',
      customerEmail: customerEmail || '',
      phone: phone || '',
      deliveryWindow: deliveryWindow || 'Deliver today before 6:00 PM',
      status: 'Pending',
      items: finalItems,
      totalPrice: finalPrice,
      customBouquet: validatedBouquet,
    };

    if (req.user) {
      orderData.user = req.user._id;
    }

    // Attempt creation with duplicate key retry protection
    let createdOrder;
    let attempts = 0;
    const maxRetries = 3;

    while (attempts < maxRetries) {
      try {
        if (attempts > 0) {
          orderData.orderNumber = await generateUniqueOrderNumber(Order);
        }
        createdOrder = await Order.create(orderData);
        break;
      } catch (err) {
        if (
          err.code === 11000 &&
          (err.keyPattern?.orderNumber || (err.message && err.message.includes('orderNumber')))
        ) {
          attempts++;
          if (attempts >= maxRetries) {
            throw err;
          }
        } else {
          throw err;
        }
      }
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    const statusCode = res.statusCode === 200 ? 400 : res.statusCode;
    res.status(statusCode).json({ message: error.message });
  }
};

// @desc    Get order details by ID or orderNumber
// @route   GET /api/orders/:id
// @access  Public / Authenticated
export const getOrderById = async (req, res) => {
  try {
    let order = null;
    if (mongoose.isValidObjectId(req.params.id)) {
      order = await Order.findById(req.params.id);
    }
    if (!order) {
      order = await Order.findOne({ orderNumber: req.params.id });
    }

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    const statusCode = res.statusCode === 200 ? 404 : res.statusCode;
    res.status(statusCode).json({ message: error.message });
  }
};

// @desc    Update order to delivered (by ID or orderNumber)
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin or Delivery Staff
export const updateOrderToDelivered = async (req, res) => {
  try {
    let order = null;
    if (mongoose.isValidObjectId(req.params.id)) {
      order = await Order.findById(req.params.id);
    }
    if (!order) {
      order = await Order.findOne({ orderNumber: req.params.id });
    }

    if (order) {
      order.status = 'Delivered';
      // Optionally we could record the time or who delivered it
      if (req.user) {
        order.deliveryDriver = req.user._id;
      }

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
