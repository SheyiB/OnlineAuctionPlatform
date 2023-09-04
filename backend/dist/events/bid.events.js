"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidEventsHandlers = void 0;
const auction_model_1 = require("../models/auction.model");
class BidEventsHandlers {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    registerBidEventHandlers() {
        console.log('Bid Event FiredUp');
        this.eventEmitter.on('bidCreated', (bid) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.updateAuctionForBidCreation(bid);
            }
            catch (error) {
                console.log('An error occured while updating auction for Market creation');
            }
        }));
    }
    updateAuctionForBidCreation(bid) {
        return __awaiter(this, void 0, void 0, function* () {
            const auction = bid.auctionId.toString();
            let bidAuction = yield auction_model_1.Auction.findById(auction);
            let auctionBids = [];
            bidAuction === null || bidAuction === void 0 ? void 0 : bidAuction.bids.map(e => auctionBids.push(e));
            auctionBids.push(bid.id);
            yield auction_model_1.Auction.findByIdAndUpdate(auction, { bids: auctionBids }, { new: true, runValidators: true });
        });
    }
}
exports.BidEventsHandlers = BidEventsHandlers;
