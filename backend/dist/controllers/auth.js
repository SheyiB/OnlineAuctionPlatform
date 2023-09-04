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
exports.verify = exports.login = exports.signUp = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_validator_1 = require("../validators/auth.validator");
const auth = new auth_service_1.AuthService();
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, auth_validator_1.validateSignup)(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        const auctioneer = yield auth.signUp(req.body);
        return res.status(201).json(auctioneer);
    }
    catch (e) {
        return res.status(e.code ? e.code : 500).json({ success: false, message: e.message });
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = (0, auth_validator_1.validateLogin)(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        const { auctioneer, token } = yield auth.login(req.body);
        res.header('x-auth-token', token);
        return res.status(201).json({ auctioneer, token });
    }
    catch (e) {
        return res.status(e.status ? e.status : 500).json({ success: false, message: e.message });
    }
});
exports.login = login;
const verify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message, status } = yield auth.verifyEmail(req.params.id);
        return res.status(201).json({ message });
    }
    catch (e) {
        return res.status(e.status ? e.status : 500).json({ success: false, message: e.message });
    }
});
exports.verify = verify;
