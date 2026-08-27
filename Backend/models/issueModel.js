import mongoose from "mongoose";
import { Schema } from "mongoose";

const issueSchema = new Schema({
    titile: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["open", "closed"],
        default: "open"
    },
    repository: {
        type: Schema.Types.ObjectId,
        ref: "Repository",
        required: true
    },

});

const Issue = mongoose.model("Issue", issueSchema);
export default Issue;
