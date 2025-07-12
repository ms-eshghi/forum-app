import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import cors from 'cors';
import users from './models/users';
import { authenticateToken } from './middleware/auth';
import { User } from './models/types';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));


app.post('/api/user/register', async (req: Request, res: Response): Promise<void>  => {
  const { email, password } = req.body;

  const existingUser = users.find(u => u.email === email);
  if (existingUser) { res.status(403).json({ error: 'User already exists' });
   return;
}
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = { email, password: hashedPassword };
  users.push(newUser);

  res.json(newUser);
});


app.get('/api/user/list', (_req: Request, res: Response) => {
  res.json(users);
});


app.post('/api/user/login', async (req: Request, res: Response) : Promise<void> => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
     res.status(403).json({ error: 'Invalid credentials' });
       return;

  }

  const token = jwt.sign({ email: user.email }, process.env.SECRET as string, {
    expiresIn: '1h',
  });

  res.json({ token });
});


app.get('/api/private', authenticateToken, (_req: Request, res: Response) : void=> {
  res.status(200).json({ message: 'This is protected secure route!' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
