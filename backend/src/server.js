import express from 'express';
import cors from 'cors';
import productsRoutes from './routes/products.js';
import importExportRoutes from './routes/importExport.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productsRoutes);
app.use('/api/products', importExportRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;

