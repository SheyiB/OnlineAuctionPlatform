import {Auction} from './auction.model'
import {Schema, model} from 'mongoose';
import {AuctioneerType} from './auctionner.model'

export interface Market{
    auction : [Auction],
    id: string,
    owner: AuctioneerType
}


const marketSchema = new Schema<Market>({
    id: {type: String, required: true},
    auction: [{type: Schema.Types.ObjectId, ref:'Auction'}],
    owner: {type: Schema.Types.ObjectId, ref:'Auctioneer'},
},
{
    timestamps: true
})

export const Market = model<Market>('Market', marketSchema )

