// src/pages/api/roles.js

import dbConnect from '@/lib/dbconnect';
import Role from '../../models/Role';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const roles = await Role.find({});
      res.status(200).json({ roles });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
