import express from "express";
import userRouter from "./userRoute.js";
import repoRouter from "./repoRouter.js";
import issueRouter from "./issueRouter.js";

const mainRouter = express.Router();


mainRouter.use(repoRouter);
mainRouter.use(userRouter);
mainRouter.use(issueRouter);

mainRouter.get("/", (req, res) => {
    res.json({ message: "Welcome home" });
});



export default mainRouter;