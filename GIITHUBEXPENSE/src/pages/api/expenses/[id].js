import dbConnect from '@/lib/dbconnect';
import Expense from '../../../models/Expense';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const expense = await Expense.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!expense) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: expense });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
