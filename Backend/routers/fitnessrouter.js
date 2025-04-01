import express from "express";
import { addFitnessData, getFitnessData, updateFitnessData, deleteFitnessData } from "../controllers/fitnessController.js"; // Import the fitness controller and update and delete functions
import authenticateToken from '../middleware/middleware.js'; // Import the authentication middleware

const router = express.Router();

// POST request for adding fitness data
router.post("/fitness", authenticateToken, addFitnessData);

// GET request for fetching fitness data
router.get("/fitness", authenticateToken, getFitnessData);

// PUT request for updating fitness data
router.put("/fitness/:id", authenticateToken, updateFitnessData);

// DELETE request for deleting fitness data
router.delete("/fitness/:id", authenticateToken, deleteFitnessData);

export default router;
