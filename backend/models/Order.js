import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    customerAddress: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
