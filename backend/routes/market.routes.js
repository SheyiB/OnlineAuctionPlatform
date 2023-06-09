import express from 'express';

import {createMarket, deleteMarket, updateMarket, getAllMarkets, getAuctioneerMarket } from '../controllers/market'


export const marketRouter = express.Router();

marketRouter.route('/')
    .post(createMarket)
    .get(getAllMarkets)
;

marketRouter.route('/:id')
    .delete(deleteMarket)
    .put(updateMarket)
    .get(getAuctioneerMarket)

