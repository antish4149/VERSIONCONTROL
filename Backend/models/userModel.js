import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    repositories: [
        {
            type: Schema.Types.ObjectId,
            ref: "Repository",
            default: []
        }
    ],

    FollowedUsers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: []
        }
    ],

    StarredRepositories: [
        {
            type: Schema.Types.ObjectId,
            ref: "Repository",
            default: []
        }
    ]
});

const User = mongoose.model("User", userSchema);
export default User;