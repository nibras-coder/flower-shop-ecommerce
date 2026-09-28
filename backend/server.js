import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dns from 'node:dns';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import customBouquetRoutes from './routes/customBouquetRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();

// Fix MongoDB Atlas SRV DNS resolution
dns.setServers(['8.8.8.8', '8.8.4.4']);

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/custom-bouquet', customBouquetRoutes);

app.get('/api/status', (req, res) => {
  res.json({ message: 'Flower Shop API is running reliably...' });
});

// Mount Error Middleware (Must be after routes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});