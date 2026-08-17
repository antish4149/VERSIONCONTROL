import yargs from "yargs";
import { hideBin } from 'yargs/helpers';
import initRepo from "./controller/init.js";
import addRepo from "./controller/add.js";
import pullRepo from "./controller/pull.js";
import pushRepo from "./controller/push.js";
import revertRepo from "./controller/revert.js";
import commitRepo from "./controller/commit.js";

const argv = yargs(hideBin(process.argv))
    .command("init", "Initialize a new repository", {}, initRepo)
    .command("add <file>", "Add a file to the repository", (yargs) => {
        yargs.positional("file", {
            describe: "File to add",
            type: "string"
        })
    }, (args) => {
        addRepo(args);
    })
    .command("commit <message>", "Commit changes to the repository", (yargs) => {
        yargs.positional("message", {
            describe: "Commit message",
            type: "string"
        })
    }, (args) => {
        commitRepo(args);
    })
    .command("pull", "Pull changes from the repository", {}, pullRepo)
    .command("push", "Push changes to the repository", {}, pushRepo)
    .command("revert <commitID>", "Revert changes in the repository", (yargs) => {
        yargs.positional("commitID", {
            describe: "Commit message",
            type: "string"
        })
    }, revertRepo)
    .demandCommand(1, "You need at least one command")
    .help()
    .argv;
