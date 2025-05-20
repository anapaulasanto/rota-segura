import express from 'express';
import 'dotenv/config';
import { prisma } from './config/db.js';

const app = express();
const { port } = process.env

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

app.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)

  } catch (error) {
    res.status(500).json(error);
  }
})

app.get('/:id', async (req, res) => {
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

app.post('/', async (req, res) => {

})