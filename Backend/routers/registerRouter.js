import express from "express";
import { userRegister, userLogin, userDetails, userProfile } from "../controllers/userRegister.js";
import authenticateToken from '../middleware/middleware.js'; 

const router = express.Router();

// POST request for user registration
router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/users", userDetails);
router.get("/myprofile", authenticateToken, userProfile);

// POST request for adding fitness data


export default router;
