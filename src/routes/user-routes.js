import express from 'express';

const router = express.Router();


router.get("/", (req, res) => {
    res.json({ message: "user api is live!!" });
});


export default router;
