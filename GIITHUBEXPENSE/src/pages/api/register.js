// src/pages/api/register.js

import dbConnect from '@/lib/dbconnect';
import User from '../../models/User';
import Role from '../../models/Role';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { username, password, role } = req.body;

    try {
      // Check if the username is already taken
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Find the role by name
      const userRole = await Role.findOne({ name: role });
      if (!userRole) {
        return res.status(400).json({ message: 'Role not found' });
      }

      // Create a new user
      const newUser = new User({
        username,
        password: hashedPassword,
        role: userRole._id,
      });

      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
