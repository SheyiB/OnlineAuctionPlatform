import {Auction} from '../models/auction.model'

import {BidModel} from '../models/bid.model'
import {Types} from 'mongoose';

import {EventEmitter} from 'events'


export class BidEventsHandlers{

    private eventEmitter: EventEmitter;

    constructor(eventEmitter: EventEmitter){
        this.eventEmitter = eventEmitter;
    }

    registerBidEventHandlers() {
        console.log('Bid Event FiredUp')
        this.eventEmitter.on('bidCreated', async (bid) => {
            try{
                await this.updateAuctionForBidCreation(bid);
            }
            catch(error){
                console.log('An error occured while updating auction for Market creation')
            }
        });
    }

    private async updateAuctionForBidCreation( bid){

        const auction = bid.auctionId.toString()
        let bidAuction = await Auction.findById(auction)

        let auctionBids:Types.ObjectId[] = []
        bidAuction?.bids.map(e => auctionBids.push(e))
        console.log(bid.id)
        auctionBids.push(bid._id)

        await Auction.findByIdAndUpdate(auction, {bids: auctionBids}, {new: true, runValidators: true} )

    }

}