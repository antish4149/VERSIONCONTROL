import mongoose from "mongoose";
import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";

const createRepository = async (req, res) => {

    const { name, description, content, visibility, owner, } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ message: "Repository name is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(400).json({ message: "Invalid owner ID" });
        }

        const user = await User.findById(owner);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const repository = await Repository.create({ name, description, content, visibility, owner });
        res.status(201).json(repository);
    } catch (error) {
        console.log("Error during repository creation", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getRepository = async (req, res) => {
    res.send("Respository fetched");
}

const getRepositoryById = async (req, res) => {
    res.send("Respository fetched by ID");
}

const getRepositoryByName = async (req, res) => {
    res.send("Respository fetched by Name");
}

const updateRepository = async (req, res) => {
    res.send("Respository updated");
}

const getRepositoryForCurrUser = async (req, res) => {
    res.send("Respository fetched for current user");
}

const deleteRepository = async (req, res) => {
    res.send("Respository deleted");
}

const toogleVisibility = async (req, res) => {
    res.send("Visibility toggled");
}

const repoController = {
    createRepository, getRepository,
    getRepositoryById, getRepositoryByName,
    getRepositoryForCurrUser, toogleVisibility,
    updateRepository, deleteRepository
};

export default repoController;