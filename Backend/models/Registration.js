import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
          unique: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
        select:false,
        
    },
});


const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;
