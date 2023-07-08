import {eventEmmitter} from '../services/auction.service'
                
import {Market} from '../models/market.model'

import {AuctionType} from '../models/auction.model'

import {EventEmitter} from 'events'


export class AuctionEventsHandlers{

    private eventEmitter: EventEmitter;

    constructor(eventEmitter: EventEmitter){
        this.eventEmitter = eventEmitter;
    }

    registerEventHandlers() {
        console.log('Event FiredUp')
        this.eventEmitter.on('auctionCreated', async (auction) => {
            try{

                await this.updateMarket(auction);
            }

            catch(error){

                console.log('An error occured')
            }
        });
    }

    private async updateMarket( auction: AuctionType){

        const market = auction.market.toString()
        let auctionMarket = await Market.findById(market)

        let marketAuctionList:AuctionType[] = []
        auctionMarket?.auction.map(e => marketAuctionList.push(e))
        marketAuctionList.push(auction)

        await Market.findByIdAndUpdate(market, {auction: marketAuctionList}, {new: true, runValidators: true} )

    }
}