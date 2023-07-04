import Joi from 'joi'
import {AuctioneerType, AuctioneerLogin} from '../models/auctionner.model'

export const validateAuction = ( signupDetails : AuctioneerType) => {
    
    const auctionSchema = Joi.object().keys({
        image: Joi.string().required(),
        item: Joi.string().required(),
        auctionType: Joi.number().required(),
        id :  Joi.string().required(),
        category: Joi.string().required(),
        date: Joi.date().required(),
        winner: Joi.date().required(),
        startingPrice: Joi.date().required(),
        status: Joi.date().required(),
        leadingBid: Joi.date().required(),
        bidders: Joi.date().required(),
        market: Joi.string()
    })

    return auctionSchema.validate(signupDetails)
}
