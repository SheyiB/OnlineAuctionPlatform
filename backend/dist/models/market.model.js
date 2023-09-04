"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Market = void 0;
const mongoose_1 = require("mongoose");
const marketSchema = new mongoose_1.Schema({
    auction: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Auction' }],
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Auctioneer', required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    details: { type: String, required: true }
}, {
    timestamps: true
});
exports.Market = (0, mongoose_1.model)('Market', marketSchema);
