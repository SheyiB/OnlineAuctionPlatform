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
exports.BidService = exports.eventEmmitter = void 0;
const bid_model_1 = require("../models/bid.model");
const events_1 = require("events");
exports.eventEmmitter = new events_1.EventEmitter();
class BidService {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    makeBid(bidDetails) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bid = yield bid_model_1.Bid.create(bidDetails);
                this.eventEmitter.emit('bidCreated', bid);
                resolve({ bid });
            }
            catch (e) {
                if (e.message.includes('validation failed')) {
                    return reject({ code: 400, message: e.message });
                }
                e.source = 'Create Bid Service';
                return reject(e);
            }
        }));
    }
    updateBid(bidDetails, bidId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let bid = yield bid_model_1.Bid.findById(bidId);
                if (!bid) {
                    reject({ code: 404, message: 'BID NOT FOUND' });
                }
                bid = yield bid_model_1.Bid.findByIdAndUpdate(bidId, bidDetails, { new: true, runValidators: true });
                resolve({ bid });
            }
            catch (e) {
                if (e.message.includes('validation failed')) {
                    return reject({ code: 400, message: e.message });
                }
                e.source = 'Update Bid Service';
                return reject(e);
            }
        }));
    }
    deleteBid(bidId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let bid = yield bid_model_1.Bid.findById(bidId);
                if (!bid) {
                    reject({ code: 404, message: 'BID NOT FOUND' });
                }
                bid = yield bid_model_1.Bid.findByIdAndDelete(bidId);
                resolve({ bid });
            }
            catch (e) {
                if (e.message.includes('validation failed')) {
                    return reject({ code: 400, message: e.message });
                }
                e.source = 'Delete Bid Service';
                return reject(e);
            }
        }));
    }
    getAuctionBids(auctionId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bids = yield bid_model_1.Bid.find({ auctionId });
                resolve(bids);
            }
            catch (e) {
                return reject(e);
            }
        }));
    }
    getBid(bidId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bid = yield bid_model_1.Bid.findById(bidId);
                resolve({ bid });
            }
            catch (e) {
                return reject(e);
            }
        }));
    }
}
exports.BidService = BidService;
