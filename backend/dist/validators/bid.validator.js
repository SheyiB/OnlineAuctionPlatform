"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBidUpdate = exports.validateBidCreation = void 0;
const joi_1 = __importDefault(require("joi"));
const validateBidCreation = (bidDetails) => {
    const makeBidSchema = joi_1.default.object().keys({
        bidOwner: joi_1.default.string().required(),
        bidValue: joi_1.default.number().required(),
        auctionId: joi_1.default.string().required(),
        bidTime: joi_1.default.date().required()
    });
    return makeBidSchema.validate(bidDetails);
};
exports.validateBidCreation = validateBidCreation;
const validateBidUpdate = (bidDetails) => {
    const makeBidSchema = joi_1.default.object().keys({
        bidId: joi_1.default.string().required(),
        bidValue: joi_1.default.string().required(),
        bidTime: joi_1.default.date().required()
    });
    return makeBidSchema.validate(bidDetails);
};
exports.validateBidUpdate = validateBidUpdate;
