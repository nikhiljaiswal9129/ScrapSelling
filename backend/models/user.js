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
    address: String
})

export default mongoose.model('user', userSchema);