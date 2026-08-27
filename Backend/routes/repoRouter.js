import express from "express";
import repoController from "../controller/repoController.js";

const repoRouter = express.Router();

repoRouter.post("/repo/create", repoController.createRepository);
repoRouter.get("/repo/all", repoController.getRepository);
repoRouter.get("/repo/:id", repoController.getRepositoryById);
repoRouter.get("/repo/name/:name", repoController.getRepositoryByName);
repoRouter.get("/repo/user/:userId", repoController.getRepositoryForCurrUser);
repoRouter.put("/repo/update/:id", repoController.updateRepository);
repoRouter.delete("/repo/delete/:id", repoController.deleteRepository);
repoRouter.patch("/repo/toggle/:id", repoController.toogleVisibility);

export default repoRouter;