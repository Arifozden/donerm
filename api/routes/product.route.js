import express from 'express';
import { createProduct, deleteProduct, updateProduct } from '../controllers/product.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create',verifyToken, createProduct);
router.delete('/delete/:id', verifyToken, deleteProduct);
router.post('/update/:id', verifyToken, updateProduct);

export default router;