import {Bidders} from './bidder.model'

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