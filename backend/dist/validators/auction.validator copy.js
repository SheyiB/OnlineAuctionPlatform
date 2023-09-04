"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuction = void 0;
const joi_1 = __importDefault(require("joi"));
const validateAuction = (signupDetails) => {
    const auctionSchema = joi_1.default.object().keys({
        image: joi_1.default.string().required(),
        item: joi_1.default.string().required(),
        auctionType: joi_1.default.number().required(),
        id: joi_1.default.string().required(),
        category: joi_1.default.string().required(),
        date: joi_1.default.date().required(),
        winner: joi_1.default.date().required(),
        startingPrice: joi_1.default.date().required(),
        status: joi_1.default.date().required(),
        leadingBid: joi_1.default.date().required(),
        bidders: joi_1.default.date().required(),
        market: joi_1.default.string()
    });
    return auctionSchema.validate(signupDetails);
};
exports.validateAuction = validateAuction;
