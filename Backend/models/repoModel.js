import mongoose from "mongoose";
import { Schema } from "mongoose";

const RepoSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
    },

    content: [
        {
            type: String,
        }
    ],

    visibility: {
        type: String,
        enum: ["public", "private"],
        default: "public"
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    issues: [
        {
            type: Schema.Types.ObjectId,
            ref: "Issue",
            default: []
        }
    ],


});

const Repository = mongoose.model("Repository", RepoSchema);
export default Repository;