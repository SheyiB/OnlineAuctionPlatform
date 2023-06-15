import {BidModel, Bid} from '../models/bid.model'

export class BidService{

    makeBid(bidDetails: BidModel){
        return new Promise<{}>(async(resolve, reject) => {
            try{
                const bid = await Bid.create(bidDetails)

                resolve(bid)
            }
            catch(e: any){
                
            }

        })
    }
}