import http from 'node:http';
import app from './app.js';
import { connectDB } from './config/db.js';
import { initSocket } from './socket/socket.js';
import { setupCLI } from './cli/commands.js';

async function startServer() {
    const port = process.env.PORT || 3000;

    await connectDB();

    const httpServer = http.createServer(app);
    initSocket(httpServer);

    httpServer.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

// Initialize CLI parsing
setupCLI(startServer).argv;


// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import { Server } from 'socket.io';
// import http from 'node:http';


// import yargs from "yargs";
// import { hideBin } from 'yargs/helpers';
// import initRepo from "./controller/init.js";
// import addRepo from "./controller/add.js";
// import pullRepo from "./controller/pull.js";
// import pushRepo from "./controller/push.js";
// import revertRepo from "./controller/revert.js";
// import commitRepo from "./controller/commit.js";

// import mainRouter from './routes/mainRoute.js';


// const argv = yargs(hideBin(process.argv))
//     .command("start", "Start Server", {}, startServer)
//     .command("init", "Initialize a new repository", {}, initRepo)
//     .command("add <file>", "Add a file to the repository", (yargs) => {
//         yargs.positional("file", {
//             describe: "File to add",
//             type: "string"
//         })
//     }, (args) => {
//         addRepo(args);
//     })
//     .command("commit <message>", "Commit changes to the repository", (yargs) => {
//         yargs.positional("message", {
//             describe: "Commit message",
//             type: "string"
//         })
//     }, (args) => {
//         commitRepo(args);
//     })
//     .command("pull", "Pull changes from the repository", {}, pullRepo)
//     .command("push", "Push changes to the repository", {}, pushRepo)
//     .command("revert <commitID>", "Revert changes in the repository", (yargs) => {
//         yargs.positional("commitID", {
//             describe: "Commit message",
//             type: "string"
//         })
//     }, revertRepo)
//     .demandCommand(1, "You need at least one command")
//     .help()
//     .argv;

// function startServer() {

//     const app = express();
//     const port = process.env.PORT;

//     app.use(cors({
//         origin: "*"
//     }));

//     app.use(express.json());
//     app.use(express.urlencoded({ extended: true }));

//     app.use("/", mainRouter);


//     const connectDB = async () => {
//         try {
//             await mongoose.connect(process.env.DB_URI);
//             console.log("Database connected successfully");
//         } catch (error) {
//             console.log(`Database connection error:${error}`);
//         }
//     }



//     const httpServer = http.createServer(app);
//     const io = new Server(httpServer, {
//         cors: {
//             origin: "*",
//             methods: ["GET", "POST", "PUT", "DELETE"],
//         }
//     });

//     io.on('connection', (socket) => {

//         socket.on("join-room", (roomName) => {
//             socket.join(roomName);
//         })
//     });

//     const db = mongoose.connection;

//     db.once("open", async () => {
//         console.log("Curd operation called");
//     })

//     httpServer.listen(port, () => {
//         console.log(`Server started on port ${port}`);
//         connectDB();
//     });

// }
