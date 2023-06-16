import {BidModel, Bid} from '../models/bid.model'

export class BidService{

    makeBid(bidDetails: BidModel){
        return new Promise<{bid: BidModel}>(async(resolve, reject) => {
            try{
                const bid = await Bid.create(bidDetails)

                resolve({bid})
            }
            catch(e: any){
                if(e.message.includes('validation failed')){
                    return reject({code: 400, message: e.message})
                }
                
                e.source = 'Create Bid Service';
                return reject(e)
            }

        })
    }

    updateBid(bidDetails: BidModel, bidId: string){
        return new Promise<{bid: BidModel| null}>(async(resolve, reject) => {
            try{
                let bid = await Bid.findById(bidId)

                if (!bid){
                    reject({code: 404, message: 'BID NOT FOUND'})
                }

                bid = await Bid.findByIdAndUpdate(bidId, bidDetails, {new: true, runValidators: true})

                resolve({bid})
            }
            catch(e: any){
                if(e.message.includes('validation failed')){
                    return reject({code: 400, message: e.message})
                }
                
                e.source = 'Update Bid Service';
                return reject(e)
            }

        })
    }

    deleteBid(bidId: string){
        return new Promise<{}>(async(resolve, reject) => {
            try{
                let bid = await Bid.findById(bidId)

                if (!bid){
                    reject({code: 404, message: 'BID NOT FOUND'})
                }

                bid = await Bid.findByIdAndDelete(bidId)

                resolve({bid})
            }
            catch(e: any){
                if(e.message.includes('validation failed')){
                    return reject({code: 400, message: e.message})
                }
                
                e.source = 'Delete Bid Service';
                return reject(e)
            }

        })
    }

    getAuctionBids(auctionId: string){
        return new Promise<{}>(async (resolve, reject) =>{
            try{
                const bids = await Bid.find({auctionId})

                resolve(bids)

            }
            catch(e:any){
                return reject(e)
            }
        })
    }
}