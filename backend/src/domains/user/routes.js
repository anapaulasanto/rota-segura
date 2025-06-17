import { Router } from 'express';
import { prisma } from '../../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const router = Router();
const bycryptSalt = bcrypt.genSaltSync();
const { JWT_SECRET_KEY } = process.env;

router.get('/profile', async (req, res) => {
    const { token } = req.cookies;

    if (token) {
        jwt.verify(token, JWT_SECRET_KEY, {}, (error, userAutenticated) => { //verifica o token retornado do cookie, pode ter duas respostas, o erro ou o usuario autenticado
            if (error) { //se der erro, retorna o erro
                throw error
            }
            res.json(userAutenticated); //se achar o usuario relacionado ao token, retorna o usuario autenticado pro front
        });
    } else {
        res.json(null) //se não tiver token (nao estiver logado), retorna um objeto nulo
    }
});

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

        jwt.sign(user, JWT_SECRET_KEY, {}, (error, token) => { //cria o token para o usuario passado, faz um sign
            if (error) {
                throw error;
            }
            res.cookie('token', token,).json(user); //armazena o token no cookie, e retorna o usuario
        });

    } catch (error) {
        throw error;
    }
});

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
                res.cookie('token', token).json(user) //cria o cookie, armazena com o token e retorna o usuario

            } else {
                res.status(401).json({ message: 'Senha incorreta.' });
            }
        } else {
            res.status(404).json({ message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login: ' + error });
    }
});

router.post('/logout', async (req, res) => {
    res.clearCookie("token").json("Deslogado com sucesso")
 });

export default router;