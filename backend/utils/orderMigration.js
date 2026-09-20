import { generateUniqueOrderNumber } from './orderNumberGenerator.js';

/**
 * Safely migrates existing Order documents that have null, missing, or empty orderNumbers.
 * Preserves all existing fields, delivery info, and order status without deleting any orders.
 *
 * @param {import('mongoose').Model} OrderModel
 * @returns {Promise<{ scanned: number, migratedCount: number }>}
 */
export const migrateOrderNumbers = async (OrderModel) => {
  try {
    const ordersWithoutNumber = await OrderModel.find({
      $or: [
        { orderNumber: { $exists: false } },
        { orderNumber: null },
        { orderNumber: '' }
      ]
    }).select('_id orderNumber').lean();

    if (!ordersWithoutNumber || ordersWithoutNumber.length === 0) {
      return { scanned: 0, migratedCount: 0 };
    }

    console.log(`[Migration] Found ${ordersWithoutNumber.length} order(s) missing orderNumber. Commencing safe migration...`);
    let migratedCount = 0;

    for (const order of ordersWithoutNumber) {
      const uniqueNumber = await generateUniqueOrderNumber(OrderModel);
      await OrderModel.updateOne(
        { _id: order._id },
        { $set: { orderNumber: uniqueNumber } }
      );
      console.log(`[Migration] Assigned orderNumber ${uniqueNumber} to existing order ${order._id}`);
      migratedCount++;
    }

    console.log(`[Migration] Successfully completed: ${migratedCount} order(s) migrated.`);
    return { scanned: ordersWithoutNumber.length, migratedCount };
  } catch (error) {
    console.error(`[Migration] Error during orderNumber migration: ${error.message}`);
    // Non-fatal to caller, but rethrow so caller can log if needed
    throw error;
  }
};
