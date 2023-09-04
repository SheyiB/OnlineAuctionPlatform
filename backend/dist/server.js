"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
//import Node packages
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
//import routes
const auth_routes_1 = require("./routes/auth.routes");
const market_routes_1 = require("./routes/market.routes");
const auctions_routes_1 = require("./routes/auctions.routes");
const bids_routes_1 = require("./routes/bids.routes");
//setup config
dotenv.config();
//instantiate Database
(0, db_1.db)();
if (!process.env.PORT) {
    console.log("Environmental Variables not found");
    process.exit(1);
}
const PORT = parseInt(process.env.PORT, 10);
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({ credentials: true }));
exports.app.use(express_1.default.json());
exports.app.use((0, morgan_1.default)('dev'));
exports.app.use('/auction-api/auth', auth_routes_1.authRouter);
exports.app.use('/auction-api/market', market_routes_1.marketRouter);
exports.app.use('/auction-api/auction', auctions_routes_1.auctionRouter);
exports.app.use('/auction-api/bids', bids_routes_1.bidRouter);
exports.app.get('/*', (req, res) => {
    res.send("Welcome To My Application");
});
exports.app.listen(PORT, () => {
    console.log(`Welcome to My Auction App`);
});
