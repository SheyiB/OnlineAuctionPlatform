import express from 'express'

import multer from 'multer'

import {createMarket, getMarket , deleteMarket, updateMarket, getAllMarkets, getAuctioneerMarket } from '../controllers/market'

export const marketRouter = express.Router();


const upload = multer({ storage: multer.memoryStorage()});


marketRouter.route('/')
    .post(upload.single('file') ,createMarket)
    .get(getAllMarkets)
;

marketRouter.route('/:id')
    .delete(deleteMarket)
    .put(updateMarket)
    .get(getMarket)

marketRouter.route('/auctioneer/:id')
    .get(getAuctioneerMarket)


