import express from "express";
import userRouter from "./userRoute.js";

const mainRouter = express.Router();


mainRouter.use(userRouter);
mainRouter.get("/", (req, res) => {
    res.json({ message: "Welcome home" });
});



export default mainRouter;