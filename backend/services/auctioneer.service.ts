import {AuctionType} from '../models/auction.model'

import {AuctionServie} from './auction.service'

import {Market, MarketType} from '../models/market.model'


const Auction = new AuctionServie()

export class AuctioneerServie{

    createAuction (body: AuctionType ){
        return new Promise<{auction: AuctionType}>(async(resolve, reject) =>{
            try{
                const {auction} = await Auction.createAuction(body);

                return resolve({auction})
            }
            catch(e: any){
                if(e.message.includes('validation failed')){
                    return reject({code: 400, message: e.message})
                }
                
                e.source = 'Create Auction Service';
                return reject(e)
            }

        })
    }


    getAuctioneerMarket (id: string ){
        return new Promise<{market: MarketType[]| null}>(async(resolve, reject) =>{
            try{
                const market: MarketType[] | null = await Market.find({owner: id});

                return resolve({market})
            }
            catch(e: any){
                if(e.message.includes('validation failed')){
                    return reject({code: 400, message: e.message})
                }
                
                e.source = 'Get Market Service';
                return reject(e)
            }

        })
    }


}