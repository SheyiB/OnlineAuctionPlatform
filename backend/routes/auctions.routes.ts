import express from 'express'


import multer from 'multer'

import { createAuction, deleteAuction, getAuction, getMarketAuctions, updateAuction } from '../controllers/auction'

export const auctionRouter = express.Router();

import {marketRouter} from './market.routes'


const upload = multer({ storage: multer.memoryStorage()});


auctionRouter.route('/')
    .post(upload.single('file'),createAuction)
;

auctionRouter.route('/:id')
    .delete(deleteAuction)
    .put(updateAuction)
    .get(getAuction)


auctionRouter.route('market/:id')
    .get(getMarketAuctions)

auctionRouter.use('/:id/market', marketRouter)



