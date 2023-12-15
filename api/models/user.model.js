import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://st2.depositphotos.com/1007566/12298/v/950/depositphotos_122983838-stock-illustration-kawaii-cartoon-heart.jpg",
    },
}, { timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;