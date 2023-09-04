"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignup = exports.validateLogin = void 0;
const joi_1 = __importDefault(require("joi"));
const validateLogin = (loginDetails) => {
    const loginSchema = joi_1.default.object().keys({
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required()
    });
    return loginSchema.validate(loginDetails);
};
exports.validateLogin = validateLogin;
const validateSignup = (signupDetails) => {
    const signupSchema = joi_1.default.object().keys({
        firstname: joi_1.default.string().required(),
        lastname: joi_1.default.string().required(),
        phone: joi_1.default.number().required(),
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
        dob: joi_1.default.date().required(),
        market: joi_1.default.string()
    });
    return signupSchema.validate(signupDetails);
};
exports.validateSignup = validateSignup;
