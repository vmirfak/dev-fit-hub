
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
  let { username, email, password } = req.body;

  username = validator.trim(username);
  email = validator.normalizeEmail(email);
  password = validator.escape(password);

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'E-mail inválido!' });
  }
  if (!validator.isLength(password, { min: 6 })) {
    return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres!' });
  }

  try {
    const existingUserByEmail = await prisma.user.findUnique({ where: { email } });
    if (existingUserByEmail) {
      return res.status(409).json({ message: 'E-mail já utilizado. Tente novamente com um novo e-mail!' });
    }

    const existingUserByUsername = await prisma.user.findUnique({ where: { username } });
    if (existingUserByUsername) {
      return res.status(409).json({ message: 'Utilizador já utilizado!' });
    }

    const defaultRole = await prisma.role.findUnique({ where: { name: "user" } });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        roleId: "2",
      },
    });

    res.status(201).json({
      message: 'Utilizador criado com sucesso!',
      user: { id: newUser.id, username: newUser.username, email: newUser.email }
    });

  } catch (error) {
    console.error('Erro ao criar Utilizador:', error);
    res.status(500).json({ message: 'Erro ao criar Utilizador!', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { role: true },
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilizador não encontrado!' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Senha incorreta!' });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('seshId', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 3600000,
    });

    res.status(200).json({
      user: {
        username: user.username,
        email: user.email,
        token,
        roleDesc: user.role.name,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login!', error: error.message });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie('seshId', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  });
  res.status(200).json({ message: 'Logout bem-sucedido!' });
};
