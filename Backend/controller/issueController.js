import mongoose from "mongoose";
import Issue from "../models/issueModel.js";

const createIssue = async (req, res) => {
    const { title, description } = req.body;
    const id = req.params;
    try {
        if (!title) {
            return res.status(400).json({ message: "Issue title is required" });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid repository ID" });
        }
        const issue = new Issue({
            title,
            description,
            repository: id
        });
        const saveIssue = await issue.save();
        res.status(201).json({ message: "Issue created successfully", issueId: saveIssue._id });
    } catch (error) {
        console.log("Error during issue creation", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getIssue = async (req, res) => {
    try {
        const issues = await Issue.find().populate("repository");
        res.status(200).json(issues);
    } catch (error) {
        console.log("Error during issue fetching", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getIssueById = async (req, res) => {
    const { id } = req.params;
    try {
        const issue = await Issue.findById(id).populate("repository");
        if (!issue) {
            return res.status(404).json({ message: "Issue not found" });
        }
        res.status(200).json(issue);
    } catch (error) {
        console.log("Error during issue fetching", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}
const updateIssue = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        const issue = await Issue.findById(id);
        if (!issue) {
            return res.status(404).json({ message: "Issue not found" });
        }

        issue.title = title;
        issue.description = description;
        issue.status = status;

        const saveIssue = await issue.save();
        res.status(200).json({ message: "Issue updated successfully", issueId: saveIssue._id });
    } catch (error) {
        console.log("Error during issue updating", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteIssue = async (req, res) => {
    const { id } = req.params;
    try {
        const issue = await Issue.findById(id);
        if (!issue) {
            return res.status(404).json({ message: "Issue not found" });
        }
        await issue.deleteOne();
        res.status(200).json({ message: "Issue deleted successfully" });
    } catch (error) {
        console.log("Error during issue deletion", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}



const issueController = {
    createIssue, getIssue,
    getIssueById, updateIssue,
    deleteIssue
}

export default issueController;
