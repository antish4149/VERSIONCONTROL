import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const getALLUsers = async (req, res) => {

    try {
        const allUsers = await User.find({});
        console.log(allUsers);
        res.status(200).json({ allUsers });
    } catch (error) {
        console.error("Error during get all user: ", error.message);
        res.status(500).json({ message: "Internl server error" })
    }
}

const getUserById = async (req, res) => {

    const id = req.params.id;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user);
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error during get  user by id: ", error.message);
        res.status(500).json({ message: "Internl server error" })
    }
}


const updateUser = async (req, res) => {
    const id = req.params.id;
    const { email, password } = req.body;

    try {
        let updatedField = {};


        if (email) updatedField.email = email;

        if (password) {

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            updatedField.password = hashPassword;
        }


        const user = await User.findByIdAndUpdate(id, updatedField, {
            new: true,
            runValidators: true
        });


        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        res.status(200).json({ message: "User updated successfully", user });

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


const deleteUser = async (req, res) => {

    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
        console.error("Error during delete user: ", error.message);
        res.status(500).json({ message: "Internl server error" })
    }
}

const userController = { getALLUsers, getUserById, updateUser, deleteUser }

export default userController