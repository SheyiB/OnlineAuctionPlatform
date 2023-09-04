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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auctioneer = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuctioneerSchema = new mongoose_1.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    market: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Market' }],
    verified: { type: Boolean, default: false }
}, {
    timestamps: true
});
// For Saftey -> Before saving Encrypt Password using bcrypt
AuctioneerSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            next();
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        this.password = yield bcrypt_1.default.hash(this.password, salt);
    });
});
// For Session Mgt -> Create a method that creates a Signed JWT using the user id for session Mgt
AuctioneerSchema.methods.getSignedJwtToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};
// For Session Mgt -> Create a method that creates a Signed JWT using the user id for session Mgt
AuctioneerSchema.methods.getEmailVerifyToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.JWT_VERIFY_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};
// A Method that Checkes if Entered Password equals Hashed Password
AuctioneerSchema.methods.matchPassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(enteredPassword, this.password);
    });
};
exports.Auctioneer = (0, mongoose_1.model)('Auctioneer', AuctioneerSchema);
