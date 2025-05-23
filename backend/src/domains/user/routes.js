import { Router } from 'express';
import { prisma } from '../../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const router = Router();
const bycryptSalt = bcrypt.genSaltSync();
const { JWT_SECRET_KEY } = process.env;

router.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.json(users)

    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/profile', async (req, res) => {
    const { token } = req.cookies;
    console.log(token);

    if (token) {
        try {
            const userAutenticated = jwt.verify(token, JWT_SECRET_KEY);
            res.json(userAutenticated);

        } catch (error) {
            res.status(401).json({ message: 'Token inválido ou expirado' });
        }
    } else {
        res.json(null)
    }

});

router.get('/:id', async (req, res) => {
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

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, bycryptSalt);

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Preencha os campos obrigatórios' });
    }

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: encryptedPassword
            }
        })
        res.status(201).json(user);

    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (user) {
            const { name, id } = user; //retorna como response apenas esses dado, e nao o user completo com email e senha
            const isPasswordValid = bcrypt.compareSync(password, user.password);

            if (isPasswordValid) {
                const objUser = { name, email, id } //dados para utilizar os coookies
                const token = jwt.sign(objUser, JWT_SECRET_KEY)

                res.cookie('token', token).json(user)
                console.log(token);

            } else {
                res.status(401).json({ message: 'Senha incorreta.' });
            }
        } else {
            res.status(404).json({ message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login: ' + error });
    }
})

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

export default router;