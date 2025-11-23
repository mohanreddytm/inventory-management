import express from 'express';
import { uploadCSV } from '../middlewares/multerConfig.js';
import { importProducts, exportProducts } from '../controllers/importExportController.js';

const router = express.Router();

router.post('/import', uploadCSV, importProducts);
router.get('/export', exportProducts);

export default router;

