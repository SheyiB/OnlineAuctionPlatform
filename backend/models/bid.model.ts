import {Schema, model} from 'mongoose';
import { AuctionType } from './auction.model';

export interface BidModel{
    bidOwner: string;
    bidId: string;
    bidValue: number;
    auctionId: AuctionType;
    bidTime: Date
}


const bidSchema = new Schema<BidModel>({
    bidOwner: {type: String, required: true},
    bidId: {type: String, required: true},
    auctionId: {type: Schema.Types.ObjectId, ref: 'Auction',  required: true},
    bidTime: {type: Date, required: true},
    bidValue: {type: Number, required: true},
    
   
},
{
    timestamps: true
})

export const Bid = model<BidModel>('Bid', bidSchema)
