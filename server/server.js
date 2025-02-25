import express from 'express';
import cors from 'cors';
import { registerUser, loginUser } from './controllers/authController.js';
import { getAllUsers } from './controllers/userController.js';
import verifyToken from './middlewares/authMiddleware.js';

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
}));
app.use(express.json());

//Authentication
app.post('/register', registerUser);
app.post('/login', loginUser);

//Users
app.get('/getAllUsers', verifyToken, getAllUsers);
app.get('/', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Acesso autorizado', user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});