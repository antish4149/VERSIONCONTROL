import express from "express";
import repoController from "../controller/repoController.js";

const repoRouter = express.Router();

repoRouter.post("/repo/create", repoController.createRepository);
repoRouter.get("/repo/all", repoController.getRepository);
repoRouter.get("/repp/:id", repoController.getRepositoryById);
repoRouter.get("/repo/:name", repoController.getRepositoryByName);
repoRouter.get("/repo/user", repoController.getRepositoryForCurrUser);
repoRouter.put("/repo/:id", repoController.updateRepository);
repoRouter.delete("/repo/:id", repoController.deleteRepository);
repoRouter.patch("/repo/toggle/:id", repoController.toogleVisibility);

export default repoRouter;