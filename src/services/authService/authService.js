import User from '../../models/auth/user.js';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt.js';

const refreshTokens = []; // Temporary storage for refresh tokens

export const authService = {
  register: async ({ username, email, password }) => {
    const userExists = await User.findOne({ 
      $or: [
        { username: username.toLowerCase() }, 
        { email: email.toLowerCase() }
      ] 
    });

    if (userExists) {
      const duplicateField = userExists.username === username.toLowerCase() ? 'Username' : 'Email';
      throw new Error(`${duplicateField} already exists`);
    }

    const user = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: password,
    });
    //password will be hashed when save into database

    return { id: user.id, username: user.username, email: user.email };
  },

  login: async ({ username, email, password }) => {
    const user = await User.findOne({ 
      $or: [
        { username: username.toLowerCase() }, 
        { email: email.toLowerCase() }
      ] 
    });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error('Invalid credentials');
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);

    return { accessToken, refreshToken };
  },

  resetPassword: async ({ email, newPassword }) => {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new Error('User not found');
    }

    user.password = password;
    //password will be hashed when saved into database
    await user.save();

    return { message: 'Password reset successfully' };
  },
};
