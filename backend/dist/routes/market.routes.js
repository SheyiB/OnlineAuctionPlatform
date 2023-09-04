"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.marketRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const market_1 = require("../controllers/market");
exports.marketRouter = express_1.default.Router();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
exports.marketRouter.route('/')
    .post(upload.single('file'), market_1.createMarket)
    .get(market_1.getAllMarkets);
exports.marketRouter.route('/:id')
    .delete(market_1.deleteMarket)
    .put(market_1.updateMarket)
    .get(market_1.getMarket);
exports.marketRouter.route('/auctioneer/:id')
    .get(market_1.getAuctioneerMarket);
