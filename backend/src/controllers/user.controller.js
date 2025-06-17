import UserService from "../services/user.services.js";
import 'dotenv/config';

const UserController = {
    async profile(req, res) {
        const { token } = req.cookies;

        try {
            const userData = await UserService.getProfile(token);

            if (!userData) {
                return res.status(200).json(null);
            }
            res.status(200).json(userData);

        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar perfil.", error: error.message });
        }
    },

    async signUp(req, res) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Preencha os campos obrigatórios' });
        }

        try {
            const { user, token } = await UserService.signUp({ name, email, password });

            res.cookie('token', token,).json(user); //armazena o token no cookie, e retorna o usuario

        } catch (error) {
            throw error;
        }
    },

    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios' });
        }

        try {
            const { user, token } = await UserService.login({ email, password });

            res.cookie('token', token,).status(200).json(user);

        } catch (error) {
            throw error;
        }
    },

    logout(req, res) {
        res.clearCookie('token').status(200).json({ message: 'Deslogado com sucesso.' });
    }
}

export default UserController;