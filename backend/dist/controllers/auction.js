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
exports.updateAuction = exports.deleteAuction = exports.getMarketAuctions = exports.getAuction = exports.createAuction = void 0;
const auction_service_1 = require("../services/auction.service");
const events_1 = require("events");
const auction_events_1 = require("../events/auction.events");
const eventEmitter = new events_1.EventEmitter();
const auctionEventHandler = new auction_events_1.AuctionEventsHandlers(eventEmitter);
const Auction = new auction_service_1.AuctionServie(eventEmitter);
auctionEventHandler.registerEventHandlers();
const createAuction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const auction = yield Auction.createAuction(req.body, req.file);
        return res.status(201).json(auction);
    }
    catch (e) {
        return res.status(e.code ? e.code : 500).json({ success: false, message: e.message });
    }
});
exports.createAuction = createAuction;
const getAuction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const auction = yield Auction.getAuction(req.params.id);
        return res.status(201).json(auction);
    }
    catch (e) {
        return res.status(e.code ? e.code : 500).json({ success: false, message: e.message });
    }
});
exports.getAuction = getAuction;
const getMarketAuctions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const auction = yield Auction.getMarketAuctions(req.params.id);
        return res.status(201).json(auction);
    }
    catch (e) {
        return res.status(e.code ? e.code : 500).json({ success: false, message: e.message });
    }
});
exports.getMarketAuctions = getMarketAuctions;
const deleteAuction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const auction = yield Auction.deleteAuction(req.params.id);
        return res.status(204).json(auction);
    }
    catch (e) {
        return res.status(e.code ? e.code : 500).json({ success: false, message: e.message });
    }
});
exports.deleteAuction = deleteAuction;
const updateAuction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const auction = yield Auction.updateAuction(req.params.id, req.body);
        return res.status(200).json(auction);
    }
    catch (e) {
        return res.status(e.code ? e.code : 500).json({ success: false, message: e.message });
    }
});
exports.updateAuction = updateAuction;
