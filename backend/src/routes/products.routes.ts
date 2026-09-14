import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
} from '../controllers/products.controllers.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);

export default router;
