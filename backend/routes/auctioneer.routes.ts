import express from 'express'

import {getMarket } from '../controllers/auctioneer'

export const auctioneerRouter = express.Router();

auctioneerRouter.route('/market')
    .post()
    .get(getMarket)
;

auctioneerRouter.route('/auction/:id')
    .delete()
    .get()
    .put()

