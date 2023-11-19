import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    OrderID: { 
        type: mongoose.Types.ObjectId, 
        ref: 'Order',
        required: true 
    },
    ProductID: { 
        type: mongoose.Types.ObjectId, 
        ref: 'Product',
        required: true 
    },
    Quantity: { 
        type: Number,
         required: true
        },
    Price: { 
        type: Number, 
        required: true 
    },
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

export default OrderItem
