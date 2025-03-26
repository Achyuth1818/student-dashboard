import express from "express";
import { userRegister,userLogin,userDetails,userProfile } from "../controllers/userRegister.js";  // Ensure correct import
import authenticateToken from '../middleware/middleware.js'; 

const router = express.Router();

// POST request for user registration
router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/users", userDetails);
router.get("/myprofile", authenticateToken,userProfile);

export default router;
