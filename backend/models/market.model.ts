import {AuctionType} from './auction.model'
import {Schema, model} from 'mongoose';
import {AuctioneerType} from './auctionner.model'

export interface MarketType{
    auction : [AuctionType],
    owner: AuctioneerType
}


const marketSchema = new Schema<MarketType>({
    auction: [{type: Schema.Types.ObjectId, ref:'Auction'}],
    owner: {type: Schema.Types.ObjectId, ref:'Auctioneer', required: true},
},
{
    timestamps: true
})

export const Market = model<MarketType>('Market', marketSchema )

