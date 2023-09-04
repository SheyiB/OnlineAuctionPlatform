"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
exports.authRouter = express_1.default.Router();
exports.authRouter.post('/login', auth_1.login);
exports.authRouter.post('/signUp', auth_1.signUp);
exports.authRouter.post('/verify/:id', auth_1.verify);
