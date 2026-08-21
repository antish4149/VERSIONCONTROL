// config/db.js
import mongoose from 'mongoose';

export const connectDB = async () => {
    const db = mongoose.connection;

    // Event listener for when the database opens
    db.once("open", () => {
        console.log("Database connected successfully");
        console.log("CRUD operation called");
    });

    db.on("error", (err) => {
        console.error(`Database connection error: ${err}`);
    });

    await mongoose.connect(process.env.DB_URI);
};