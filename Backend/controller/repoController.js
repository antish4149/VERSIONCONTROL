import mongoose from "mongoose";
import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";

const createRepository = async (req, res) => {

    const { name, description, content, visibility, owner, issues } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ message: "Repository name is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(400).json({ message: "Invalid owner ID" });
        }

        const repository = await Repository.create({
            name,
            description,
            content,
            visibility,
            owner,
            issues
        });

        const saveRepo = await repository.save();
        res.status(200).json({ message: "Repository created successfully", repositoryId: saveRepo._id });

    } catch (error) {
        console.log("Error during repository creation", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getRepository = async (req, res) => {
    try {
        const repositories = await Repository.find().populate("owner").populate("issues");
        res.status(200).json(repositories);
    } catch (error) {
        console.log("Error during repository fetching", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getRepositoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const repository = await Repository.findById(id).populate("owner").populate("issues");

        if (!repository) {
            return res.status(404).json({ message: "Repository not found" });
        }

        res.status(200).json(repository);
    } catch (error) {
        console.log("Error during repository fetching", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getRepositoryByName = async (req, res) => {
    const { name } = req.params;
    try {
        const repository = await Repository.findOne({ name }).populate("owner").populate("issues");

        if (!repository) {
            return res.status(404).json({ message: "Repository not found" });
        }

        res.status(200).json(repository);
    } catch (error) {
        console.log("Error during repository fetching", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateRepository = async (req, res) => {
    const { id } = req.params;
    const { description, content } = req.body;
    try {
        const repository = await Repository.findById(id);

        if (!repository) {
            return res.status(404).json({ message: "Repository not found" });
        }
        repository.description = description;
        repository.content.push(content);

        const updatedRepo = await repository.save();
        res.status(200).json({ message: "Repository updated successfully", repositoryId: updatedRepo._id });
    } catch (error) {
        console.log("Error during repository update", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getRepositoryForCurrUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const repositories = await Repository.find({ owner: userId }).populate("owner").populate("issues");

        if (!repositories || repositories.length === 0) {
            return res.status(404).json({ message: "Repository not found" });
        }
        res.status(200).json(repositories);
    } catch (error) {
        console.log("Error during repository fetching", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteRepository = async (req, res) => {
    const { id } = req.params;
    try {
        const repository = await Repository.findById(id);

        if (!repository) {
            return res.status(404).json({ message: "Repository not found" });
        }

        await repository.deleteOne();
        res.status(200).json({ message: "Repository deleted successfully" });
    } catch (error) {
        console.log("Error during repository deletion", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const toogleVisibility = async (req, res) => {
    const { id } = req.params;
    try {
        const repository = await Repository.findById(id);

        if (!repository) {
            return res.status(404).json({ message: "Repository not found" });
        }

        repository.visibility = !repository.visibility;

        const saveRepo = await repository.save();
        res.status(200).json({ message: "Repository visibility toggled successfully", repositoryId: saveRepo._id });
    } catch (error) {
        console.log("Error during repository visibility toggle", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const repoController = {
    createRepository, getRepository,
    getRepositoryById, getRepositoryByName,
    getRepositoryForCurrUser, toogleVisibility,
    updateRepository, deleteRepository
};

export default repoController;