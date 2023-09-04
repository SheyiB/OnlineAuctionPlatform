"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bid = void 0;
const mongoose_1 = require("mongoose");
const bidSchema = new mongoose_1.Schema({
    bidOwner: { type: String, required: true },
    //  bidId: {type: String, required: true},
    auctionId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Auction', required: true },
    bidTime: { type: Date, required: true },
    bidValue: { type: Number, required: true },
}, {
    timestamps: true
});
exports.Bid = (0, mongoose_1.model)('Bid', bidSchema);
