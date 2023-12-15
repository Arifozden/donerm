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
        default: "https://static3.depositphotos.com/1000152/162/i/600/depositphotos_1626147-stock-photo-helping-hand.jpg",
    },
}, { timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;