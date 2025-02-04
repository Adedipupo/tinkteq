import express from 'express';
import { createOrder,getOrder, updateOrder } from '../controller/index.js';

const router = express.Router();


router.post("/create", createOrder);
router.get("/:id", getOrder);
router.patch("/:id", updateOrder);



export default router;
