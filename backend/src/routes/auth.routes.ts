import express from 'express';
import {login, signUp, verify} from '../controllers/auth';

export const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/signUp', signUp);
authRouter.post('/verify/:id', verify);

