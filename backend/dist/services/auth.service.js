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
exports.AuthService = void 0;
const auctionner_model_1 = require("../models/auctionner.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    // ssignUp (body: AuctioneerType){
    //     return new Promise<{auctioneer: AuctioneerType, token: string}>(async(resolve, reject) => {
    //         try{
    //             let existingUser = await Auctioneer.find({email : body.email})
    //             if(existingUser.length > 0){
    //                 return reject({code : 400, message: "Auctioneer Exist!"})
    //             }
    //             const auctioneer: AuctioneerData = await Auctioneer.create(body);
    //             const verfiyToken = auctioneer.getEmailVerifyToken()
    //             const token = auctioneer.getSignedJwtToken();
    //             //Send mail based on verify-token s
    //             return resolve({auctioneer, token});
    //         }
    //         catch (e: any){
    //             if(e.message.includes('validation failed')){
    //                 return reject({code: 400, message: e.message})
    //             }
    //             e.source = 'Sign-Up Service';
    //             return reject(e)
    //         }
    //     })
    // }
    signUp(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if an auctioneer with the same email already exists
                const existingUser = yield auctionner_model_1.Auctioneer.find({ email: body.email });
                if (existingUser.length > 0) {
                    throw new Error('Auctioneer already exists');
                }
                // Create a new auctioneer
                const auctioneer = yield auctionner_model_1.Auctioneer.create(body);
                // Generate email verification token and JWT token
                const verifyToken = auctioneer.getEmailVerifyToken();
                const token = auctioneer.getSignedJwtToken();
                // Send an email with the verification token (implementation needed)
                return { auctioneer, token };
            }
            catch (error) {
                if (error.message.includes('validation failed')) {
                    // Handle validation errors gracefully
                    throw new Error('Invalid input data');
                }
                // Add source information to the error for better debugging
                error.source = 'AuthService - signUp';
                throw error; // Re-throw the error for the caller to handle
            }
        });
    }
    login(body) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = body;
                const auctioneer = yield auctionner_model_1.Auctioneer.findOne({ email: email }).select('+password');
                if (!auctioneer)
                    reject('FALSE-INFO!');
                const isMatch = yield auctioneer.matchPassword(password);
                if (!isMatch)
                    reject({ status: 401, message: 'Invalid Inforamtion Supplied!' });
                auctioneer.password = undefined;
                const token = auctioneer.getSignedJwtToken();
                if (!token)
                    reject('Could not Sign In Auctioneer');
                resolve({ auctioneer, token });
            }
            catch (e) {
                e.source = 'Get Auctioneer Service';
                return reject(e);
            }
        }));
    }
    verifyEmail(link) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Decode String
                const id = jsonwebtoken_1.default.verify(link, process.env.JWT_VERIFY_SECRET);
                //Ensure ID is valid
                const auctionnerExsits = yield auctionner_model_1.Auctioneer.findById(id);
                if (auctionnerExsits) {
                    //Update Databse to show Account has been verified
                    yield auctionner_model_1.Auctioneer.findByIdAndUpdate(id, { verfied: true }, { runValidators: true, new: true });
                    return ({ "status": 200, "message": "User successfully Verfied" });
                }
                else {
                    return ({ "status": 400, "message": "Invalid Token" });
                }
            }
            catch (e) {
                return ({ "status": 500, "message": e.message });
            }
        });
    }
}
exports.AuthService = AuthService;
