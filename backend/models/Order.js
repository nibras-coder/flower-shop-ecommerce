import mongoose from 'mongoose';
import { generateUniqueOrderNumber } from '../utils/orderNumberGenerator.js';

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: [true, 'Order number is required'],
      unique: true,
      trim: true,
    },
    customerAddress: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      default: 'Valued Customer',
    },
    customerEmail: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Out for Delivery', 'Delivered'],
      default: 'Pending',
    },
    deliveryDriver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    deliveryWindow: {
      type: String,
      default: 'Standard Delivery (Today)',
    },
    items: {
      type: String,
      default: 'Custom Floral Arrangement',
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    customBouquet: {
      baseFlowers: [
        {
          flowerId: { type: String, required: true },
          name: { type: String, required: true },
          unitPrice: { type: Number, required: true },
          quantity: { type: Number, required: true, min: 1 },
        },
      ],
      accentBlooms: [
        {
          flowerId: { type: String, required: true },
          name: { type: String, required: true },
          unitPrice: { type: Number, required: true },
          quantity: { type: Number, required: true, min: 1 },
        },
      ],
      wrapping: {
        wrappingId: { type: String },
        name: { type: String },
        price: { type: Number },
        color: { type: String },
      },
      ribbon: {
        ribbonId: { type: String },
        name: { type: String },
        price: { type: Number },
        color: { type: String },
      },
      cardMessage: {
        type: String,
        default: '',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Ensure every order has a unique, non-null order number before validation/save
orderSchema.pre('validate', async function () {
  if (!this.orderNumber) {
    this.orderNumber = await generateUniqueOrderNumber(this.constructor);
  }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
