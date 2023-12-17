import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        phone:{
            type: String,
            required: [true, "Phone is required"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        images: {
            type: Array,
            required: [true, "Images is required"],
        },
        category: {
            type: String,
            required: [true, "Category is required"],
        },
        userRef: {
            type: String,
            required: [true],
        },
        address: {
            type: String,
            required: [true, "Address is required"],
        },
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model("Product", productSchema);

export default Product;