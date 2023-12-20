import Product from '../models/product.model.js';

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