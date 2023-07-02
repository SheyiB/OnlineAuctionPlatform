import express from 'express'

import { createAuction, deleteAuction, getAuction, getMarketAuctions, updateAuction } from '../controllers/auction'

export const auctionRouter = express.Router();

import {marketRouter} from './market.routes'

auctionRouter.route('/')
    .post(createAuction)
;

auctionRouter.route('/:id')
    .delete(deleteAuction)
    .put(updateAuction)
    .get(getAuction)


auctionRouter.route('market/:id')
    .get(getMarketAuctions)

auctionRouter.use('/:id/market', marketRouter)



