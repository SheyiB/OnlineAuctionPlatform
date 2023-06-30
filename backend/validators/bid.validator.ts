import Joi from 'joi'
import {BidModel} from '../models/bid.model'

export const validateBidCreation = ( bidDetails : BidModel) => {
    const makeBidSchema = Joi.object().keys({
        bidOwner: Joi.string().required(),
        bidId: Joi.string().required(),
        bidValue: Joi.string().required(),
        auctionId: Joi.string().required(),
        bidTime: Joi.date().required()
    })

    return makeBidSchema.validate(bidDetails)
}
