"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bidder = void 0;
const mongoose_1 = require("mongoose");
const bidderSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    email: { type: String, required: true },
    bid: { type: Number, required: true },
}, {
    timestamps: true
});
exports.Bidder = (0, mongoose_1.model)('Bidders', bidderSchema);
