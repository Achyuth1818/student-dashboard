import Fitness from '../models/Fitness.js'; // Import the Fitness model
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Registration from '../models/Registration.js';

// Add Fitness Data
const addFitnessData = async (req, res) => {
    try {
        // Log the incoming request body
        const { weight, age, sugarLevel, bloodPressure, heartRate, cholesterolLevel, exerciseDuration } = req.body;

        // Validate input
        if (!weight || !age || !sugarLevel || !bloodPressure || !heartRate || !cholesterolLevel || !exerciseDuration) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new fitness record
        const newFitnessData = new Fitness({
            userId: req.user.id, // Associate fitness data with the user
            weight,
            age,
            sugarLevel,
            bloodPressure,
            heartRate,
            cholesterolLevel,
            exerciseDuration,
        });

        await newFitnessData.save();

        res.status(201).json({ message: 'Fitness data added successfully!', data: newFitnessData });
    } catch (error) {
        console.error('Error adding fitness data:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get Fitness Data
const getFitnessData = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from the authenticated user
        const fitnessData = await Fitness.find({ userId }); // Filter by userId

        if (!fitnessData.length) {
            return res.status(404).json({ message: 'No fitness data found for this user.' });
        }

        res.status(200).json({ data: fitnessData });
    } catch (error) {
        console.error('Error fetching fitness data:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update Fitness Data
const updateFitnessData = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedFitnessData = await Fitness.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedFitnessData) {
            return res.status(404).json({ message: 'Fitness data not found.' });
        }

        res.status(200).json({ message: 'Fitness data updated successfully!', data: updatedFitnessData });
    } catch (error) {
        console.error('Error updating fitness data:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete Fitness Data
const deleteFitnessData = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedFitnessData = await Fitness.findByIdAndDelete(id);

        if (!deletedFitnessData) {
            return res.status(404).json({ message: 'Fitness data not found.' });
        }

        res.status(200).json({ message: 'Fitness data deleted successfully!' });
    } catch (error) {
        console.error('Error deleting fitness data:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const authenticateToken = (req, res, next) => {
    try {
        const token = req.headers['x-token'];

        if (!token) {
            return res.status(401).json({ error: 'Access denied. Token is missing!' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded user:', decoded); // Log the decoded user

        req.user = decoded; // Set the user object
        next(); // Proceed to the next middleware/route
    } catch (err) {
        console.error('Token verification error:', err.message);
        return res.status(403).json({ error: 'Invalid or expired token!' });
    }
};

const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await Registration.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate JWT token using user ID and secret
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Respond with success message and token
        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error('Error in user login:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export { addFitnessData, getFitnessData, updateFitnessData, deleteFitnessData };
