"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auction = void 0;
const mongoose_1 = require("mongoose");
const auctionSchema = new mongoose_1.Schema({
    image: { type: String, required: true },
    item: { type: String, required: true },
    auctionType: { type: String, required: true },
    categroy: { type: String },
    startingPrice: { type: Number },
    winner: { type: String, default: " " },
    status: { type: String, enum: ['pending', 'ongoing', 'completed'], default: 'pending' },
    date: { type: Date, required: true },
    leadingBid: [],
    bids: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Bid' }],
    market: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Market' },
    bidders: [],
    duration: { type: Number, default: 1 },
    details: { type: String, required: true },
    endDate: { type: Date }
}, {
    timestamps: true
});
auctionSchema.pre('save', function (next) {
    // Ensure duration is available and greater than zero
    if (this.duration && this.duration > 0) {
        const { date, duration } = this;
        const durationInMilliseconds = duration * 3600000; // Convert duration to milliseconds
        // Get the time zone offset in minutes and convert it to milliseconds
        const timezoneOffsetMilliseconds = date.getTimezoneOffset() * 60000;
        // Calculate the endDate, considering the time zone offset
        const endDate = new Date(date.getTime() + durationInMilliseconds);
        this.endDate = endDate;
        this.date = date;
    }
    next();
});
exports.Auction = (0, mongoose_1.model)('Auction', auctionSchema);
