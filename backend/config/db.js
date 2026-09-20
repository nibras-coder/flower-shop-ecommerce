import mongoose from 'mongoose';
import Order from '../models/Order.js';
import { migrateOrderNumbers } from '../utils/orderMigration.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Safe migration check: ensure existing documents have unique order numbers
    try {
      await migrateOrderNumbers(Order);
    } catch (migrationErr) {
      console.warn(`[Migration Warning] Could not complete orderNumber migration: ${migrationErr.message}`);
    }
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;