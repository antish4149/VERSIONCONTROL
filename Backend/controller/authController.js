import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        if (!username || !password || !email) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        const user = await User.findOne({ username });

        if (user) {
            res.status(400).json({ message: "User already exits" });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json(({ token }));

    } catch (error) {
        console.log("Error in user registration", error.message);
        res.status(500).json({ message: "Internal server error" });
    }

}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            res.status(400).json({ message: "All filed required" });
            return;
        }

        const user = await User.findOne({ email });
        console.log(user);

        if (!user) {
            res.status(400).json({ message: "Invalid Credentials" });
            return;
        }

        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            res.status(400).json({ message: "Invalid Credentials" });
            return;
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token, userId: user._id });


    } catch (error) {
        console.log("Error in user login", error.message);
        res.status(500).json({ message: "Internal server error" });

    }
}

const logoutUser = (req, res) => {
    res.send("user logoit");
}

const authController = { registerUser, loginUser, logoutUser }
export default authController;