import {Bidders} from './bidder.model';
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
    bidders: [Bidders],
    owner: Types.ObjectId
}

const auctionSchema = new Schema<AuctionType>({
    image: {type: String, required: true},
    item: {type: String, required: true},
    auctionType: {type: String, required: true},
    categroy: {type: String, required: true},
    startingPrice: {type: Number, required: true},
    winner: {type: String, required: true},
    status: {type: String, enum: ['pending', 'ongoing', 'completed'] ,default: 'pendng'},
    date: {type: Date, required: true},
    leadingBid: [ ],
    bidders: [{type: Schema.Types.ObjectId, ref: 'Bidders' }],
    owner: {type: Schema.Types.ObjectId, ref: 'Auctioneer' , required: true}
},
{
    timestamps: true
})

export const Auction = model<AuctionType>('Auction', auctionSchema)
