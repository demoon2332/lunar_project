import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateAccessToken = (user) => {
    return jwt.sign(
        {id: user._id, username: user.username, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: '15m'}
    );
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        {id: user._id},
        process.env.JWT_REFRESH_SECRECT,
        {expiresIn: '7d'}
    )
}

export { generateAccessToken, generateRefreshToken };