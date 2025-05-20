import express from 'express';
import 'dotenv/config';
import { prisma } from './config/db.js';
import bcrypt from 'bcryptjs';

const app = express();
const { port } = process.env
const bycryptSalt = bcrypt.genSaltSync();

app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)

  } catch (error) {
    res.status(500).json(error);
  }
})

app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(user);

  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
})

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const encryptedPassword = bcrypt.hashSync(password, bycryptSalt);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        encryptedPassword
      }
    })

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Preencha os campos obrigatórios' });
    }
    res.status(201).json(user);

  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
})

app.put('/user/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        name,
        email,
        password
      }
    })

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(user);

  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
})

app.delete('/user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.delete({
      where: {
        id: id
      }
    })

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(user);

  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})