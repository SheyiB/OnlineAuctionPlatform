import express from 'express'

import { createAuction, deleteAuction, getAuction } from '../controllers/auction'

export const auctionRouter = express.Router();

auctionRouter.route('/')
    .post(createAuction)
    .get(getAuction)
;

auctionRouter.route('/:id')
    .delete(deleteMarket)
    .put(updateMarket)
    .get(getAuctioneerMarket)


