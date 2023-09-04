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
exports.AuctionServie = exports.eventEmmitter = void 0;
const auction_model_1 = require("../models/auction.model");
const events_1 = require("events");
const fileUpload_1 = require("../helpers/fileUpload");
exports.eventEmmitter = new events_1.EventEmitter();
class AuctionServie {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    createAuction(body, filePath) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const imagePath = yield (0, fileUpload_1.fileUpload)(filePath);
                body.image = imagePath;
                const auction = yield auction_model_1.Auction.create(body);
                this.eventEmitter.emit('auctionCreated', auction);
                return resolve({ auction });
            }
            catch (e) {
                if (e.message.includes('validation failed')) {
                    return reject({ code: 400, message: e.message });
                }
                e.source = 'Create Auction Service';
                return reject(e);
            }
        }));
    }
    getAuction(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const auction = yield auction_model_1.Auction.findById(id).populate([{
                        path: 'bids',
                        select: 'bidOwner auctionId bidTime id bidValue'
                    }, {
                        path: 'market',
                        select: 'name'
                    }]);
                return resolve({ auction });
            }
            catch (e) {
                if (e.message.includes('validation failed')) {
                    return reject({ code: 400, message: e.message });
                }
                e.source = 'Get Auction Service';
                return reject(e);
            }
        }));
    }
    getMarketAuctions(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const auction = yield auction_model_1.Auction.find({ market: id }).populate({
                    path: 'bids market',
                    select: 'bidOwner auctionId bidTime id bidValue'
                });
                return resolve({ auction });
            }
            catch (e) {
                if (e.message.includes('validation failed')) {
                    return reject({ code: 400, message: e.message });
                }
                e.source = 'Get Auction Service';
                return reject(e);
            }
        }));
    }
    deleteAuction(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const auction = yield auction_model_1.Auction.findById(id);
                if (auction == null) {
                    return reject({ message: 'Auction does not exist', code: 404 });
                }
                yield auction_model_1.Auction.findByIdAndDelete(id);
                this.eventEmitter.emit('auctionDeleted', auction);
                return resolve({ auction: null });
            }
            catch (e) {
                if (e.message.includes('validation failed')) {
                    return reject({ code: 400, message: e.message });
                }
                e.source = 'Delete Auction Service';
                return reject(e);
            }
        }));
    }
    updateAuction(id, body) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const auction = yield auction_model_1.Auction.findByIdAndUpdate(id, body, { runValidators: true, new: true });
                return resolve({ auction });
            }
            catch (e) {
                if (e.message.includes('validation failed')) {
                    return reject({ code: 400, message: e.message });
                }
                e.source = 'Delete Auction Service';
                return reject(e);
            }
        }));
    }
}
exports.AuctionServie = AuctionServie;
