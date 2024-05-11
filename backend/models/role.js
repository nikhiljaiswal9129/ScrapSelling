import mongoose from "../config/db.js";

const roleSchema = mongoose.Schema(
    {
        role: String
    },
    {
        timestamps: true
    }
);

export default mongoose.model('role', roleSchema);