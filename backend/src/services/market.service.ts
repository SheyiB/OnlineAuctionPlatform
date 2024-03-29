import { resolve } from 'path'
import {Market, MarketType} from '../models/market.model'

import {fileUpload} from '../helpers/fileUpload'

export class MarketServie{

    createMarket (body: MarketType, filePath: any ){
        return new Promise<{market: MarketType}>(async(resolve, reject) =>{
            try{
                const imagePath = await fileUpload(filePath)

                body.image = imagePath

                const market: MarketType = await Market.create(body);

                return resolve({market})
            }
            catch(e: any){
                if(e.message.includes('validation failed')){
                    return reject({code: 400, message: e.message})
                }
                
                e.source = 'Create Market Service';
                return reject(e)
            }

        })
    }

    updateMarket ( id:string, body: MarketType ){
        return new Promise<{market: MarketType|null}>(async(resolve, reject) =>{
            try{
                const market: MarketType | null = await Market.findByIdAndUpdate(id, body, {runValidators : true, new: true});

                return resolve({market})
            }
            catch(e: any){
                if(e.message.includes('validation failed')){
                    return reject({code: 400, message: e.message})
                }
                
                e.source = 'Delete Market Service';
                return reject(e)
            }

        })
    }


    deleteMarket (id: string ){
        return new Promise<{}>(async(resolve, reject) =>{
            try{
                const market: []| null = await Market.findByIdAndDelete(id);

                return resolve({market})
            }
            catch(e: any){
                if(e.message.includes('validation failed')){
                    return reject({code: 400, message: e.message})
                }
                
                e.source = 'Delete Market Service';
                return reject(e)
            }

        })
    }

    getAllMarkets (){
        return new Promise<{market: MarketType[]| null}>(async(resolve, reject) =>{
            try{
                const market: MarketType[] | null = await Market.find();

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

   getMarket (id: string ){
        return new Promise<{market: MarketType| null}>(async(resolve, reject) =>{
            try{
                const market: MarketType | null = await Market.findById(id).populate({
                    path: 'auction',
                    select: 'image item auctionType categroy date winner startingPrice status leadingBid bidders'
                });

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


   getAuctioneerMarket (id: string ){
    return new Promise<{market: MarketType| null}>(async(resolve, reject) =>{
        try{
            const market: MarketType | null | any = await Market.find({owner: id})

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