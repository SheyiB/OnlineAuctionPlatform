import {Schema, model, Types} from 'mongoose';
import {MarketType} from './market.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface AuctioneerType{
    firstname: string;
    lastname: string;
    email: string;
    phone: number;
    password: string;
    market: Types.ObjectId[];
    verified: boolean
}


export interface AuctioneerData extends AuctioneerType {
    getSignedJwtToken : () => string;
    matchPassword : () => string;
    getEmailVerifyToken : () => string;    
}


export interface AuctioneerLogin {
    email: string,
    password: string
}


const AuctioneerSchema = new Schema<AuctioneerType>({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: Number, required: true},
    password: {type: String, required: true},
    market: [{type: Schema.Types.ObjectId, ref: 'Market' }],
    verified: {type: Boolean, default: false}

},
{
    timestamps: true
})


// For Saftey -> Before saving Encrypt Password using bcrypt
AuctioneerSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

// For Session Mgt -> Create a method that creates a Signed JWT using the user id for session Mgt
AuctioneerSchema.methods.getSignedJwtToken = function() {
    return jwt.sign( {id: this._id}, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// For Session Mgt -> Create a method that creates a Signed JWT using the user id for session Mgt
AuctioneerSchema.methods.getEmailVerifyToken = function() {
    return jwt.sign( {id: this._id}, process.env.JWT_VERIFY_SECRET!, {
        expiresIn: process.env.JWT_EXPIRE
    })
}


// A Method that Checkes if Entered Password equals Hashed Password
AuctioneerSchema.methods.matchPassword = async function(enteredPassword: string ){
    return await bcrypt.compare(enteredPassword, this.password);
}



export const Auctioneer = model<AuctioneerData>('Auctioneer', AuctioneerSchema)
