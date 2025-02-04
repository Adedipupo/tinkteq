import express from 'express';
import orderRouter from './order-route.js';

const router = express.Router();

router.get("/", (req, res) => {
  res.send("api is live!!");
});



router.use("/order", orderRouter);


export default router;
