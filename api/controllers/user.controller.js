import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Product from '../models/product.model.js';

export const test = (req,res) => {
    res.json({
        message: 'Api route working!!',
    });
};

export const updateUser = async (req,res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, "Can update only your own account"));
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            },
        }, {new: true});

        const {password, ...rest} = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req,res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, "Can delete only your own account"));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token");
        res.status(200).json("User deleted successfully");
    } catch (error) {
        next(error);
    }
};

export const getUserProducts = async (req,res, next) => {
    if( req.user.id === req.params.id){
        try {
            const products = await Product.find({userRef: req.params.id});
            res.status(200).json(products);
        } catch (error) {
           next(error); 
        }
    }
    else{
        return next(errorHandler(401, "Can get only view your own products"));}    
};

export const getUser = async (req,res, next) => {

    try {
        const user = await User.findById(req.params.id);

    if(!user) return next(errorHandler(404, "User not found"));

    const {password: pass, ...rest} = user._doc;

    res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
    
};