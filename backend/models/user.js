import mongoose from "../config/db.js";
import { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    weight: String,
    firstname: String,
    lastname: String,
    date: String,
    remarks: String,
    phoneno: String,
    email: String,
    time: String,
    address: String,
    isActive: {
        type: Boolean,
        default: true
    },
    userId: {
        type: [Schema.Types.ObjectId],
        ref: 'order',
        required: true
    },
})

export default mongoose.model('user', userSchema);