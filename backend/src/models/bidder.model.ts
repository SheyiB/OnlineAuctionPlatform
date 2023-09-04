import {Schema, model} from 'mongoose';

export interface Bidders {
    id: string,
    email: string,
    bid: number
}


const bidderSchema = new Schema<Bidders>({
    id: {type: String, required: true},
    email: {type: String, required: true},
    bid: {type: Number, required: true},
},
{
    timestamps: true
})

export const Bidder = model<Bidders>('Bidders', bidderSchema)

