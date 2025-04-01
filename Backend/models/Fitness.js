import mongoose from 'mongoose';
import Registration from './Registration.js';


const fitnessSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Registration', 
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    sugarLevel: {
        type: Number,
        required: true,
    },
    bloodPressure: {
        type: String, // e.g., "120/80"
        required: true,
    },
    heartRate: {
        type: Number, // e.g., beats per minute
        required: true,
    },
    cholesterolLevel: {
        type: Number, // e.g., mg/dL
        required: true,
    },
    exerciseDuration: {
        type: Number, // Duration in minutes
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Fitness = mongoose.model('Fitness', fitnessSchema);

export default Fitness;