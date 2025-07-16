
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { User } from './models/User';
import { Topic } from './models/Topic';
import { registerValidation, loginValidation } from './validators/inputValidation';
import { authenticateToken, authenticateAdmin } from './middleware/validateToken';
import path from 'path';



dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));



mongoose.connect('mongodb://localhost:27017/testdb');

app.post('/api/user/register', registerValidation, async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     res.status(400).json({ errors: errors.array() });
return;
  }
  const { email, username, password, isAdmin } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser){ 
     res.status(403).json({ message: 'Email already in use.' }) 
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, username, password: hashedPassword, isAdmin });
  await newUser.save();

  res.json(newUser);
});

app.post('/api/user/login', loginValidation, async (req: Request, res: Response): Promise<void>=> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
 res.status(400).json({ errors: errors.array() });
return  
}
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user){
    
res.status(404).json({ message: 'User not found.' });
   return }
   
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
     res.status(401).json({ message: 'Invalid password.' });
return}

  const token = jwt.sign({ _id: user._id, username: user.username, isAdmin: user.isAdmin }, process.env.SECRET!);
  res.json({ token });
});

app.get('/api/topics', async (_, res) => {
  const topics = await Topic.find();
  res.json(topics);
});

app.post('/api/topic', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  const { title, content } = req.body;
  const { username } = req.user as any;
  const newTopic = new Topic({ title, content, username });
  await newTopic.save();
  res.json(newTopic);
});

app.delete('/api/topic/:id', authenticateAdmin, async (req: Request, res: Response): Promise<void> => {
  await Topic.findByIdAndDelete(req.params.id);
  res.json({ message: 'Topic deleted successfully.' });
});
app.get('/api/private', authenticateToken, (_req: Request, res: Response) : void=> {
  res.status(200).json({ message: 'This is protected secure route!' });
});



app.listen(3000, () => console.log('Server running on port 3000'));
/*import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt,{ JwtPayload } from 'jsonwebtoken';
import path from 'path';
import cors from 'cors';
import users from './models/users';
import { authenticateToken } from './middleware/auth';
import { User } from './models/types';
import passport from "./middleware/google-passport-config";
import e from 'express';
import { log } from 'util';

dotenv.config();


const app = express();
app.use(passport.initialize());
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
  if (!user ||!user.password|| !(await bcrypt.compare(password, user.password))) {
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


app.post('/api/user/login/google', passport.authenticate('google', {
  scope: ['profile','email'],

}));

app.get('/api/user/auth/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/login.html' }),
  
  async  (req: Request, res: Response) : Promise<void> => {
  
  try {
    const user = req.user as any;
    const existingUser = users.find(u => u.googleId === user.id);
const jwtPayload: any = {};

    
    if (!existingUser) {
      const newUser: User = {
        email: user.emails[0].value,
        googleId: user.id,
      };
      users.push(newUser);
      jwtPayload.email = newUser.email;
    } else {
      jwtPayload.email = existingUser.email;
      jwtPayload.id = existingUser.googleId;  
    }

    const token:string = jwt.sign(jwtPayload, process.env.SECRET as string, {
      expiresIn: '5m',
    });

     res.redirect("/index.html?token="+ token)

  } catch (error:any) {
    console.error('Error during external login::', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
    
  }}
);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/