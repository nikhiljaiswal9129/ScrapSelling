import mongoose from "../config/db.js";
import { Schema } from "mongoose";

const orderSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        profileImg: {
            type: String,
            default: "https://cdn.vectorstock.com/i/500p/17/61/male-avatar-profile-picture-vector-10211761.jpg"
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        roles: {
            type: [Schema.Types.ObjectId],
            ref: "role"            
        }
    }
);

export default mongoose.model('order', orderSchema);