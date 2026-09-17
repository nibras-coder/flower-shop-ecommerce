import Order from '../models/Order.js';

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin or Delivery Staff
export const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

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
