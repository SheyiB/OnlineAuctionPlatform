"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bidRouter = void 0;
const express_1 = __importDefault(require("express"));
const bid_1 = require("../controllers/bid");
exports.bidRouter = express_1.default.Router();
exports.bidRouter.route('/')
    .post(bid_1.makeBid);
exports.bidRouter.route('/:id')
    .put(bid_1.updateBid)
    .delete(bid_1.deleteBid)
    .get(bid_1.getBid);
exports.bidRouter.route('/auctionBids/:auction');
