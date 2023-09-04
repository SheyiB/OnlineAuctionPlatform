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
exports.getAuctionBids = exports.deleteBid = exports.updateBid = exports.getBid = exports.makeBid = void 0;
const bid_service_1 = require("../services/bid.service");
const events_1 = require("events");
const bid_events_1 = require("../events/bid.events");
const eventEmitter = new events_1.EventEmitter();
const bid_validator_1 = require("../validators/bid.validator");
const bidEventsHandlers = new bid_events_1.BidEventsHandlers(eventEmitter);
const Bid = new bid_service_1.BidService(eventEmitter);
bidEventsHandlers.registerBidEventHandlers();
const makeBid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, bid_validator_1.validateBidCreation)(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        const bid = yield Bid.makeBid(req.body);
        return res.status(201).json(bid);
    }
    catch (e) {
        return res.status(e.code ? e.code : 500).json({ success: false, message: e.message });
    }
});
exports.makeBid = makeBid;
const getBid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bid = yield Bid.getBid(req.params.id);
        return res.status(200).json(bid);
    }
    catch (e) {
        return res.status(e.code ? e.code : 500).json({ success: false, message: e.message });
    }
});
exports.getBid = getBid;
const updateBid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, bid_validator_1.validateBidUpdate)(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        const bid = yield Bid.updateBid(req.body, req.params.id);
        return res.status(201).json(bid);
    }
    catch (e) {
        return res.status(e.code ? e.code : 500).json({ success: false, message: e.message });
    }
});
exports.updateBid = updateBid;
const deleteBid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bid = yield Bid.deleteBid(req.params.id);
        return res.status(200).json(bid);
    }
    catch (e) {
        return res.status(e.code ? e.code : 500).json({ success: false, message: e.message });
    }
});
exports.deleteBid = deleteBid;
const getAuctionBids = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bid = yield Bid.getAuctionBids(req.params.auction);
        return res.status(200).json(bid);
    }
    catch (e) {
        return res.status(e.code ? e.code : 500).json({ success: false, message: e.message });
    }
});
exports.getAuctionBids = getAuctionBids;
