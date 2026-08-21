import { Server } from 'socket.io';

export const initSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
        }
    });

    io.on('connection', (socket) => {
        socket.on("join-room", (roomName) => {
            socket.join(roomName);
        });
    });

    return io;
};