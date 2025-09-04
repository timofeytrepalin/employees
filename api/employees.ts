import { VercelRequest, VercelResponse } from '@vercel/node';
import { employees } from '../mock/api.mock'

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    res.status(200).json(employees);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}