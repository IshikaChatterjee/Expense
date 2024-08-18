// src/pages/api/login.js

import dbConnect from '@/lib/dbconnect';
import User from '../../models/User';
import Role from '../../models/Role';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // Find the user by username
      const user = await User.findOne({ username }).populate('role');
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // On successful login, return the user data (including role)
      res.status(200).json({
        username: user.username,
        role: user.role.name,
      });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
