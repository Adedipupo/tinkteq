import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderNumber: String,
    orderName: String,
    price: Number,
    description: String,
    status: {
        type: String,
        enum: ['pending','dispatched', 'in-transit', 'delivered'],
        default: 'pending'
    },
    updatedAt: { type: Date, default: Date.now }
});

const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel;