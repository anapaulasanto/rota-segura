import { Router } from 'express';
import UserController from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/profile', UserController.profile);
userRouter.post('/signup', UserController.signUp);
userRouter.post('/login', UserController.login);
userRouter.post('/logout', UserController.logout);

export default userRouter;