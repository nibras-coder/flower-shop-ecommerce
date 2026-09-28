import crypto from 'node:crypto';

/**
 * Generates a random 6-digit order number candidate with the PH- prefix
 * to match existing order numbering conventions (e.g., PH-139969, PH-878655).
 */
export const generateOrderNumberCandidate = () => {
  // Use crypto.randomInt for cryptographically secure, uniform distribution [100000, 999999]
  const randomDigits = crypto.randomInt(100000, 1000000);
  return `PH-${randomDigits}`;
};

/**
 * Ensures a generated order number is unique against the database.
 * Falls back to high-entropy timestamp suffix if multiple random attempts collide.
 *
 * @param {import('mongoose').Model} OrderModel
 * @returns {Promise<string>} Unique order number
 */
export const generateUniqueOrderNumber = async (OrderModel) => {
  const maxAttempts = 10;
  let attempts = 0;

  while (attempts < maxAttempts) {
    attempts++;
    const candidate = generateOrderNumberCandidate();
    const existing = await OrderModel.findOne({ orderNumber: candidate }).select('_id').lean();
    if (!existing) {
      return candidate;
    }
  }

  // Fallback in case of dense collisions: append high-precision time slice + random digits
  const timeSuffix = Date.now().toString().slice(-6);
  const randomFallback = crypto.randomInt(100, 1000);
  return `PH-${timeSuffix}${randomFallback}`;
};
