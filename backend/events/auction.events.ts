import {eventEmmitter} from '../services/auction.service'
                
import {Market} from '../models/market.model'

import {AuctionType} from '../models/auction.model'

eventEmmitter.on('auctionCreated', async (auction) => {
    try{
        console.log('Event FiredUp')
        const market = auction.market.toString()
        let auctionMarket = await Market.findById(market)

        let marketAuctionList:AuctionType[] = []
        auctionMarket?.auction.map(e => marketAuctionList.push(e))
        marketAuctionList.push(auction)

        await Market.findByIdAndUpdate(market, {auction: marketAuctionList}, {new: true, runValidators: true} )

    }
        catch(e:any){

    }
})