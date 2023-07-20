import {Auction, AuctionType} from '../models/auction.model'

import {EventEmitter} from 'events'

export const eventEmmitter = new EventEmitter(); 

export class AuctionServie{

    private eventEmitter: EventEmitter;

    constructor(eventEmitter: EventEmitter){
        this.eventEmitter = eventEmitter
    }

    createAuction (body: AuctionType ){
        return new Promise<{auction: AuctionType}>(async(resolve, reject) =>{
            try{    
                const auction: AuctionType = await Auction.create(body);

                this.eventEmitter.emit('auctionCreated', auction);

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
                const auction: AuctionType | null = await Auction.findById(id).populate({
                    path : 'bids',
                    select : 'bidOwner auctionId bidTime id bidValue'
                });

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
                const auction: AuctionType[] | null = await Auction.find({market: id}).populate({
                    path : 'bids',
                    select : 'bidOwner auctionId bidTime id bidValue'
                });;

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
                const auction = await Auction.findById(id)

                if(auction == null){
                    return reject({message: 'Auction does not exist', code: 404})
                }

                await Auction.findByIdAndDelete(id);

                this.eventEmitter.emit('auctionDeleted', auction);

                return resolve({auction: null})
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