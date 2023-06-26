import express from 'express';
import {deleteBid, getAuctionBids, getBid, makeBid, updateBid} from '../controllers/bid';

export const bidRouter = express.Router();

bidRouter.route('/')
.post(makeBid)

bidRouter.route('/:id')
.put(updateBid)
.delete(deleteBid)
.get(getBid)

bidRouter.route('/auctionBids/:auction')
