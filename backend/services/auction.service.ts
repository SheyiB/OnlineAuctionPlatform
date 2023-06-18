import {Auction, AuctionType} from '../models/auction.model'
import {Market} from '../models/market.model'


export class AuctionServie{

    createAuction (body: AuctionType ){
        return new Promise<{auction: AuctionType}>(async(resolve, reject) =>{
            try{    
                const auction: AuctionType = await Auction.create(body);

                const auctionId = auction.id
                
                const market = auction.market.toString()
                console.log(market)

                let auctionMarket = await Market.findById(market)

                let marketAuctionList = auctionMarket?.auction

                console.log(marketAuctionList,  market, auctionId)

              //  await Market.findByIdAndUpdate(market, {auction: marketAuctionList.auctionId} )

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

    getAuction (id: string ){
        return new Promise<{auction: AuctionType| null}>(async(resolve, reject) =>{
            try{
                const auction: AuctionType | null = await Auction.findById(id);

                return resolve({auction})
            }
            catch(e: any){
                if(e.message.includes('validation failed')){
                    return reject({code: 400, message: e.message})
                }
                
                e.source = 'Get Auction Service';
                return reject(e)
            }

        })
    }

    getMarketAuctions (id: string){
        return new Promise<{auction: AuctionType[]| null}>(async(resolve, reject) =>{
            try{
                const auction: AuctionType[] | null = await Auction.find({market: id});

                return resolve({auction})
            }
            catch(e: any){
                if(e.message.includes('validation failed')){
                    return reject({code: 400, message: e.message})
                }
                
                e.source = 'Get Auction Service';
                return reject(e)
            }

        })
    }

    deleteAuction (id: string ){
        return new Promise<{auction: null}>(async(resolve, reject) =>{
            try{
                const auction: null = await Auction.findByIdAndDelete(id);

                return resolve({auction})
            }
            catch(e: any){
                if(e.message.includes('validation failed')){
                    return reject({code: 400, message: e.message})
                }
                
                e.source = 'Delete Auction Service';
                return reject(e)
            }

        })
    }


    updateAuction (id: string, body: AuctionType ){
        return new Promise<{auction: AuctionType | null}>(async(resolve, reject) =>{
            try{
                const auction: AuctionType | null = await Auction.findByIdAndUpdate(id, body, {runValidators: true, new: true});

                return resolve({auction})
            }
            catch(e: any){
                if(e.message.includes('validation failed')){
                    return reject({code: 400, message: e.message})
                }
                
                e.source = 'Delete Auction Service';
                return reject(e)
            }

        })
    }
}