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
exports.AuctionEventsHandlers = void 0;
const market_model_1 = require("../models/market.model");
class AuctionEventsHandlers {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    registerEventHandlers() {
        console.log('Event FiredUp');
        this.eventEmitter.on('auctionCreated', (auction) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.updateMarketForAuctionCreation(auction);
            }
            catch (error) {
                console.log('An error occured while updating auction for Market creation');
            }
        }));
        this.eventEmitter.on('auctionDeleted', (auction) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.updateMarketForAuctionDeletion(auction);
            }
            catch (error) {
                console.log('An error occured while updating auction for Market Deletion');
            }
        }));
    }
    updateMarketForAuctionCreation(auction) {
        return __awaiter(this, void 0, void 0, function* () {
            const market = auction.market.toString();
            let auctionMarket = yield market_model_1.Market.findById(market);
            let marketAuctionList = [];
            auctionMarket === null || auctionMarket === void 0 ? void 0 : auctionMarket.auction.map(e => marketAuctionList.push(e));
            marketAuctionList.push(auction);
            yield market_model_1.Market.findByIdAndUpdate(market, { auction: marketAuctionList }, { new: true, runValidators: true });
        });
    }
    updateMarketForAuctionDeletion(auction) {
        return __awaiter(this, void 0, void 0, function* () {
            const market = auction.market.toString();
            let auctionMarket = yield market_model_1.Market.findById(market);
            const position = auctionMarket === null || auctionMarket === void 0 ? void 0 : auctionMarket.auction.findIndex(e => e == auction);
            if (position != -1) {
                auctionMarket === null || auctionMarket === void 0 ? void 0 : auctionMarket.auction.splice(position, 1);
            }
            yield market_model_1.Market.findByIdAndUpdate(market, { auction: auctionMarket === null || auctionMarket === void 0 ? void 0 : auctionMarket.auction }, { new: true, runValidators: true });
            console.log('Auction Deleted');
        });
    }
}
exports.AuctionEventsHandlers = AuctionEventsHandlers;
