import Product from '../models/product.model.js';
import { errorHandler } from '../utils/error.js';

export const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        return res.status(201).json(product);
    } catch (error) {
        next(error);
    }
}

export const deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product) return next(errorHandler(404, "Product not found"));

    if(req.user.id !== product.userRef) return next(errorHandler(401, "Can delete only your own products"));

    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product deleted successfully");
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product) return next(errorHandler(404, "Product not found"));

    if(req.user.id !== product.userRef) return next(errorHandler(401, "You can update only your own products"));

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
};