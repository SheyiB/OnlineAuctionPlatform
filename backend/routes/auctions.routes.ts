import express from 'express'

import { createAuction, deleteAuction, getAuction, getMarketAuctions, updateAuction } from '../controllers/auction'

export const auctionRouter = express.Router();

auctionRouter.route('/')
    .post(createAuction)
    .get(getAuction)
;

auctionRouter.route('/:id')
    .delete(deleteAuction)
    .put(updateAuction)
    .get(getMarketAuctions)


