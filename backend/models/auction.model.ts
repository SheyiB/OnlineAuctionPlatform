import {Bidders} from './bidder.model';
import {Schema, model} from 'mongoose';

export interface Auction{
    image: string,
    item : string,
    auctionType: string,
    id: string,
    categroy: string,
    date: Date,
    winner: string,
    startingPrice: number,
    leadingBid: [bid: number, bidder: string],
    bidders: [Bidders]
}

const auctionSchema = new Schema<Auction>({
    image: {type: String, required: true},
    item: {type: String, required: true},
    auctionType: {type: String, required: true},
    categroy: {type: String, required: true},
    startingPrice: {type: Number, required: true},
    winner: {type: String, required: true},
    date: {type: Date, required: true},
    leadingBid: [ ],
    bidders: [{type: Schema.Types.ObjectId, ref: 'Bidders' }]
},
{
    timestamps: true
})

export const Auction = model<Auction>('Auction', auctionSchema)
