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
exports.MarketServie = void 0;
const market_model_1 = require("../models/market.model");
const fileUpload_1 = require("../helpers/fileUpload");
class MarketServie {
    createMarket(body, filePath) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const imagePath = yield (0, fileUpload_1.fileUpload)(filePath);
                body.image = imagePath;
                const market = yield market_model_1.Market.create(body);
                return resolve({ market });
            }
            catch (e) {
                if (e.message.includes('validation failed')) {
                    return reject({ code: 400, message: e.message });
                }
                e.source = 'Create Market Service';
                return reject(e);
            }
        }));
    }
    updateMarket(id, body) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const market = yield market_model_1.Market.findByIdAndUpdate(id, body, { runValidators: true, new: true });
                return resolve({ market });
            }
            catch (e) {
                if (e.message.includes('validation failed')) {
                    return reject({ code: 400, message: e.message });
                }
                e.source = 'Delete Market Service';
                return reject(e);
            }
        }));
    }
    deleteMarket(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const market = yield market_model_1.Market.findByIdAndDelete(id);
                return resolve({ market });
            }
            catch (e) {
                if (e.message.includes('validation failed')) {
                    return reject({ code: 400, message: e.message });
                }
                e.source = 'Delete Market Service';
                return reject(e);
            }
        }));
    }
    getAllMarkets() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const market = yield market_model_1.Market.find();
                return resolve({ market });
            }
            catch (e) {
                if (e.message.includes('validation failed')) {
                    return reject({ code: 400, message: e.message });
                }
                e.source = 'Get Market Service';
                return reject(e);
            }
        }));
    }
    getMarket(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const market = yield market_model_1.Market.findById(id).populate({
                    path: 'auction',
                    select: 'image item auctionType categroy date winner startingPrice status leadingBid bidders'
                });
                return resolve({ market });
            }
            catch (e) {
                if (e.message.includes('validation failed')) {
                    return reject({ code: 400, message: e.message });
                }
                e.source = 'Get Market Service';
                return reject(e);
            }
        }));
    }
    getAuctioneerMarket(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const market = yield market_model_1.Market.find({ owner: id });
                return resolve({ market });
            }
            catch (e) {
                if (e.message.includes('validation failed')) {
                    return reject({ code: 400, message: e.message });
                }
                e.source = 'Get Market Service';
                return reject(e);
            }
        }));
    }
}
exports.MarketServie = MarketServie;
