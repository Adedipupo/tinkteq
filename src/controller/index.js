import OrderModel from "../model/index.js";
import { io } from '../socket/socket.js';

export const createOrder = async (req, res, next) => {
    try {
        if (!req.body.orderNumber) {
            return res.status(400).json({ message: "Order number is required" });
        }

        const existingOrder = await OrderModel.findOne({ orderNumber: req.body.orderNumber });
        if (existingOrder) {
            return res.status(400).json({ message: "Order number already exists" });
        }

        const order = new OrderModel(req.body);
        await order.save();
        // Emit to clients subscribed to this order's updates
        io.to(order._id.toString()).emit('orderUpdate', order); 
        res.status(201).json(order);
    } catch (err) {
        console.error("Error in createOrder:", err);
        res.status(400).json({ message: err.message });
    }
}

export const updateOrder = async (req, res, next) => {
    try {
        // Check if the status is valid according to the enum in the schema
        if (req.body.status && !['pending', 'dispatched', 'in-transit', 'delivered'].includes(req.body.status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const order = await OrderModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        // Emit to clients subscribed to this order's updates
        io.to(order._id.toString()).emit('orderUpdate', order); 
        res.json(order);
    } catch (err) {
        console.error("Error in updateOrder:", err);
        res.status(400).json({ message: err.message });
    }
}

export const getOrder = async (req, res, next) => {
    try {
        if (req.params.id) {
            const order = await OrderModel.findById(req.params.id);
            if (!order) return res.status(404).json({ message: 'Order not found' });
            return res.json(order);
        }
        const orders = await OrderModel.find();
        res.json(orders);
    } catch (err) {
        console.error("Error in getOrder:", err);
        res.status(500).json({ message: err.message });
    }
}