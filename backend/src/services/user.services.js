import { prisma } from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const bycryptSalt = bcrypt.genSaltSync();
const { JWT_SECRET_KEY } = process.env;

const UserService = {
    async signUp(userData) {
        const { name, email, password } = userData;
        const encryptedPassword = bcrypt.hashSync(password, bycryptSalt);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: encryptedPassword
            }
        });

        const token = jwt.sign(user, JWT_SECRET_KEY)

        return { user, token }
    },

    async login(credentials) {
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Senha inválida');
        }

        const token = jwt.sign(user, JWT_SECRET_KEY);

        return { user, token };
    },

    async getProfile(token) {
        if (token) {
            const userAutenticated = jwt.verify(token, JWT_SECRET_KEY);

            return userAutenticated;
        } else {
            return null;
        }
    }
}

export default UserService;