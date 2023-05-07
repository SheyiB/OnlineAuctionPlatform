import {Auction} from './auction.model'
import {Schema, model} from 'mongoose';


export interface Market{
    auction : [Auction],
    id: string
}


const marketSchema = new Schema<Market>({
    id: {type: String, required: true},
    auction: [{type: Schema.Types.ObjectId, ref:'Auction'}],
},
{
    timestamps: true
})

export const Market = model<Market>('Market', marketSchema )

