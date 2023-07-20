import {Bidders} from './bidder.model';
import {BidModel} from './bid.model'
import {Schema, model, Types} from 'mongoose';

export interface AuctionType{
    image: string,
    item : string,
    auctionType: string,
    id: string,
    categroy: string,
    date: Date,
    winner: string,
    startingPrice: number,
    status: string
    leadingBid: [bid: number, bidder: string],
    bids: Types.ObjectId[] ,
    market: Types.ObjectId,
    duration: number,
    details : string
}

const auctionSchema = new Schema<AuctionType>({
    image: {type: String, required: true},
    item: {type: String, required: true},
    auctionType: {type: String, required: true},
    categroy: {type: String},
    startingPrice: {type: Number},
    winner: {type: String, default: " "},
    status: {type: String, enum: ['pending', 'ongoing', 'completed'] ,default: 'pending'},
    date: {type: Date, required: true},
    leadingBid: [ ],
    bids: [{type: Schema.Types.ObjectId, ref: 'Bid' }],
    market: {type: Schema.Types.ObjectId, ref: 'Market'},
    duration: {type: Number},
    details: {type: String, required: true}
},
{
    timestamps: true
})

export const Auction = model<AuctionType>('Auction', auctionSchema)
