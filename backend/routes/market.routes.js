import express from 'express';

import {createMarket, deleteMarket, getMarket, updateMarket } from '../controllers/market'


export const marketRouter = express.Router();

marketRouter.route('/')
    .post(createMarket);

marketRouter.route('/:id')
    .delete(deleteMarket)
    .put(updateMarket)
    .get(getMarket)

