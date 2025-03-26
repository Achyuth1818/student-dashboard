import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware to verify JWT token from the 'x-token' header.
 */
const authenticateToken = (req, res, next) => {
    try {
        // Get token from x-token header
        const token = req.headers['x-token'];

        if (!token) {
            return res.status(401).json({ error: 'Access denied. Token is missing!' });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach decoded user data to the request object
        req.user = decoded;

        next(); // Proceed to the next middleware/route
    } catch (err) {
        console.error('Token verification error:', err.message);
        return res.status(403).json({ error: 'Invalid or expired token!' });
    }
};

export default authenticateToken;
