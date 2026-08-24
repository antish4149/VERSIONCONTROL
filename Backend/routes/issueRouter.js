import express from "express";
import issueController from "../controller/issueController.js";

const issueRouter = express.Router();

issueRouter.post("/issue/create", issueController.createIssue);
issueRouter.get("/issue/all", issueController.getIssue);
issueRouter.get("/issue/:id", issueController.getIssueById);
issueRouter.put("/issue/update/:id", issueController.updateIssue);
issueRouter.delete("/issue/delete/:id", issueController.deleteIssue);

export default issueRouter;