"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auctionRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const auction_1 = require("../controllers/auction");
exports.auctionRouter = express_1.default.Router();
const market_routes_1 = require("./market.routes");
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
exports.auctionRouter.route('/')
    .post(upload.single('file'), auction_1.createAuction);
exports.auctionRouter.route('/:id')
    .delete(auction_1.deleteAuction)
    .put(auction_1.updateAuction)
    .get(auction_1.getAuction);
exports.auctionRouter.route('market/:id')
    .get(auction_1.getMarketAuctions);
exports.auctionRouter.use('/:id/market', market_routes_1.marketRouter);
