import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Name is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        condition:{
            type: String,
            required: [true, "Used is required"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
        },
        category: {
            type: String,
            required: [true, "Category is required"],
        },
        userRef: {
            type: String,
            required: [true],
        },
        phone:{
            type: String,
            required: [true, "Phone is required"],
        },
        address: {
            type: String,
            required: [true, "Address is required"],
        },
        email:{
            type: String,
            required: [true, "Email is required"],
        },
        images: {
            type: Array,
            required: [true, "Images is required"],
        },
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model("Product", productSchema);

export default Product;