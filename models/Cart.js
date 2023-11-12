import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ProductID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    Quantity: {
        type: Number,
        required: true
    }
})

const Cart = mongoose.model('Cart', cartSchema); 

export default Cart