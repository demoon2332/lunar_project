import { authService } from '../../services/authService/authService.js';

export const authController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const user = await authService.register({ username, email, password });
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const tokens = await authService.login({ email, password });
      res.status(200).json(tokens);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      if (!email || !newPassword) {
        return res.status(400).json({ message: 'Email and new password are required' });
      }

      const response = await authService.resetPassword({ email, newPassword });
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};
