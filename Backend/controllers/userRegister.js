import Registration from '../models/Registration.js'; // Assuming Mongoose model
import jwt from 'jsonwebtoken'; // For JWT token generation
import bcrypt from 'bcryptjs'; // For password hashing and comparison
import dotenv from "dotenv";
dotenv.config()


const JWT_SECRET = process.env.JWT_SECRET;  // Ensure your .env file has JWT_SECRET

// User Registration
const userRegister = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        // Validate input
        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Check if the email is already registered
        const existingUser = await Registration.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        // Hash the password before saving to DB
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Registration({
            username,
            email,
            password: hashedPassword,  
            confirmPassword,  
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error in user registration:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// User Login
const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Ensure username and password are provided
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

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
       // Add this before using the key
    } catch (error) {
       
        console.error('Error in user login:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
    console.log('Secret Key:', JWT_SECRET); 
};

// Fetch User Details
const userDetails = async (req, res) => {
    try {
        // Only fetch the users and exclude passwords from the response
        const users = await Registration.find({},{}, { password: 1 });

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching user details:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const userProfile = async(req,res)=>{
    try {
        // Access the authenticated user's ID from the token
        const userId = req.user.id;

        // Fetch user details, excluding the password
        const user = await Registration.findById(userId).select({
            username: 1,
            email: 1,
            password: 1,
            confirmPassword: 1,
          });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            user,
            success: true,
            message: 'User profile fetched successfully',
           
        });
    } catch (error) {
        console.error('Error fetching profile:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }

}


export { userRegister, userLogin, userDetails, userProfile};


// cors cross origin resourse sharing is package used for handling the request errors while sending from frontend to backend 
//handling policy errors