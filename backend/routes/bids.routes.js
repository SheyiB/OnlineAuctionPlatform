import express from 'express';
import {deleteBid, getAuctionBids, getBid, makeBid, updateBid} from '../controllers/bid';

export const bidRouter = express.Router();


