import express from 'express';

import {createMarket, deleteMarket, getMarket, updateMarket } from '../controllers/market'


export const authRouter = express.Router();

authRouter.route('/')
    .post(createMarket);

authRouter.route('/:id')
    .delete(deleteMarket)
    .put(updateMarket)
    .get(getMarket)

