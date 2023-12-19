import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {test, updateUser, deleteUser, getUserProducts} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/products/:id', verifyToken, getUserProducts);

export default router;