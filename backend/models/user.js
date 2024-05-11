import mongoose from "../config/db.js";

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
    }
})

export default mongoose.model('user', userSchema);