import express from 'express';
import { createProduct, deleteProduct, updateProduct, getProduct } from '../controllers/product.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { get } from 'mongoose';

const router = express.Router();

router.post('/create',verifyToken, createProduct);
router.delete('/delete/:id', verifyToken, deleteProduct);
router.post('/update/:id', verifyToken, updateProduct);
router.get('/get/:id', getProduct);

export default router;