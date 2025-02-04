import express from 'express';
import userRouter from './user-routes.js';
import authorRouter from './author-route.js';

const router = express.Router();

router.get("/", (req, res) => {
  res.send("api is live!!");
});



router.use("/user", userRouter);
router.use("/author", authorRouter);


export default router;
