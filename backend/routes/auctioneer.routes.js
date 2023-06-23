import express from 'express'

import { } from '../controllers/auctioneer'

export const auctioneerRouter = express.Router();

auctioneerRouter.route('/auction')
    .post()
    .get()
;

auctioneerRouter.route('/auction/:id')
    .delete()
    .get()
    .put()

auctioneerRouter.route('/market')
    .get()
    .post()

auctioneerRouter.route('/market/:id')
    .delete()
    .get()
    .put()

