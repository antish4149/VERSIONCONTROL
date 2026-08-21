import express from "express";
import userController from "../controller/userController.js";
import authController from "../controller/authController.js";

const userRouter = express.Router();

userRouter.post("/register", authController.registerUser);
userRouter.post("/login", authController.loginUser);
userRouter.post("/logout", authController.logoutUser);

userRouter.get("/users", userController.getALLUsers);
userRouter.get("/users/:id", userController.getUserById);
userRouter.put("/users:id", userController.updateUser);
userRouter.delete("/users:id", userController.deleteUser);

export default userRouter;