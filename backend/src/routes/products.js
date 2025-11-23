import express from 'express';
import {
  getAllProducts,
  searchProducts,
  createProduct,
  updateProduct,
  getProductHistory,
} from '../controllers/productsController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.get('/:id/history', getProductHistory);

export default router;

