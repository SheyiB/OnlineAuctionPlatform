import {Auction} from './auction.model'
import {Bidders} from './bidder.model'

export interface Market{
    auction : [Auction],
    bidders : [Bidders]
}