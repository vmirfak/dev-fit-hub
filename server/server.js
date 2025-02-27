import express from 'express';
import cors from 'cors';
import { registerUser, loginUser, logoutUser } from './controllers/authController.js';
import { getAllUsers } from './controllers/userController.js';
import verifyToken from './middlewares/authMiddleware.js';
import cookieParser from 'cookie-parser';
import passport from './config/config.js'

const app = express();

//Configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

//Authentication
app.post('/register', registerUser);
app.post('/login', loginUser);
app.post('/logout', logoutUser)

//Users
app.get('/getAllUsers', verifyToken, getAllUsers);

app.get('/', passport.authenticate('jwt-cookiecombo', { session: false }), (req, res) => {
  res.status(200).json({ message: 'Acesso autorizado', user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});