import express from "express";
import { getAllUsers, getUsersById } from "../controllers/user.controller.js";

const router = express.Router();


//getting all user (for admin)---- 
router.get('/', getAllUsers);


//getting specific user (for particular user)---- 
router.get('/:id', getUsersById);

export default router;