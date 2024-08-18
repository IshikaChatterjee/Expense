// src/pages/api/seed.js

import dbConnect from '@/lib/dbconnect';
import Role from '../../models/Role';

export default async function handler(req, res) {
  await dbConnect();

  try {
    const roles = ['admin', 'user'];

    for (const roleName of roles) {
      const roleExists = await Role.findOne({ name: roleName });
      if (!roleExists) {
        await Role.create({ name: roleName });
      }
    }

    res.status(200).json({ message: 'Roles seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}
