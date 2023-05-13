import {Schema, model} from 'mongoose';
import {Market} from './market.model'

export interface AuctioneerType{
    firstname: string;
    lastname: string;
    email: string;
    phone: number;
    password: string;
    market: Market;
    date: Date;
}

const auctioneerSchema = new Schema<AuctioneerType>({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true},
    password: {type: String, required: true},
    date: {type: Date, required: true},
    market: {type: Schema.Types.ObjectId, ref: 'Market' }
},
{
    timestamps: true
})

export const Auctioneer = model<AuctioneerType>('Auctioneer', auctioneerSchema)
