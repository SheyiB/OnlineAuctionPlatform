import express from 'express'

import { createAuction, deleteAuction, getAuction } from '../controllers/auction'

export const auctionRouter = express.Router();

auctionRouter.route('/')
    .post(createMarket)
    .get(getAllMarkets)
;

auctionRouter.route('/:id')
    .delete(deleteMarket)
    .put(updateMarket)
    .get(getAuctioneerMarket)


