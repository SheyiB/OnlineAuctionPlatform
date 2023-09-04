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
exports.deleteMarket = exports.getMarket = exports.getAuctioneerMarket = exports.getAllMarkets = exports.updateMarket = exports.createMarket = void 0;
const market_service_1 = require("../services/market.service");
const Market = new market_service_1.MarketServie();
const createMarket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const market = yield Market.createMarket(req.body, req.file);
        return res.status(201).json(market);
    }
    catch (e) {
        return res.status(e.code ? e.code : 500).json({ success: false, message: e.message });
    }
});
exports.createMarket = createMarket;
const updateMarket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const market = yield Market.updateMarket(req.params.id, req.body);
        return res.status(201).json(market);
    }
    catch (e) {
        return res.status(e.code ? e.code : 500).json({ success: false, message: e.message });
    }
});
exports.updateMarket = updateMarket;
const getAllMarkets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const market = yield Market.getAllMarkets();
        return res.status(201).json(market);
    }
    catch (e) {
        return res.status(e.code ? e.code : 500).json({ success: false, message: e.message });
    }
});
exports.getAllMarkets = getAllMarkets;
const getAuctioneerMarket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const market = yield Market.getAuctioneerMarket(req.params.id);
        return res.status(201).json(market);
    }
    catch (e) {
        return res.status(e.code ? e.code : 500).json({ success: false, message: e.message });
    }
});
exports.getAuctioneerMarket = getAuctioneerMarket;
const getMarket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const market = yield Market.getMarket(req.params.id);
        return res.status(201).json(market);
    }
    catch (e) {
        return res.status(e.code ? e.code : 500).json({ success: false, message: e.message });
    }
});
exports.getMarket = getMarket;
const deleteMarket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Market.deleteMarket(req.body);
        return res.status(204).json({ "message": "Market Deleted" });
    }
    catch (e) {
        return res.status(e.status ? e.status : 500).json({ success: false, message: e.message });
    }
});
exports.deleteMarket = deleteMarket;
