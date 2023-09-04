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
                await this.updateMarketForAuctionCreation(auction);
            }
            catch(error){
                console.log('An error occured while updating auction for Market creation')
            }
        });

        this.eventEmitter.on('auctionDeleted', async (auction) => {
            try{
                await this.updateMarketForAuctionDeletion(auction);
            }
            catch(error){
                console.log('An error occured while updating auction for Market Deletion')
            }
        });

    }

    private async updateMarketForAuctionCreation( auction: AuctionType){

        const market = auction.market.toString()
        let auctionMarket = await Market.findById(market)

        let marketAuctionList:AuctionType[] = []
        auctionMarket?.auction.map(e => marketAuctionList.push(e))
        marketAuctionList.push(auction)

        await Market.findByIdAndUpdate(market, {auction: marketAuctionList}, {new: true, runValidators: true} )

    }

    private async updateMarketForAuctionDeletion(auction: AuctionType){
        const market = auction.market.toString()
        let auctionMarket = await Market.findById(market)

        const position: number | undefined= auctionMarket?.auction.findIndex(e => e == auction)
        if(position!= -1){
            auctionMarket?.auction.splice(position!,1)
        }


        await Market.findByIdAndUpdate(market, {auction: auctionMarket?.auction}, {new: true, runValidators: true} )
 
        console.log('Auction Deleted')
    }

}