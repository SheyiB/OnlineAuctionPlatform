import Joi from 'joi'
import {BidModel} from '../models/bid.model'

export const validateBidCreation = ( bidDetails : BidModel) => {
    const makeBidSchema = Joi.object().keys({
        bidOwner: Joi.string().required(),
        bidId: Joi.string().required(),
        bidValue: Joi.number().required(),
        auctionId: Joi.string().required(),
        bidTime: Joi.date().required()
    })

    return makeBidSchema.validate(bidDetails)
}

export const validateBidUpdate = ( bidDetails : BidModel) => {
    const makeBidSchema = Joi.object().keys({
        bidId: Joi.string().required(),
        bidValue: Joi.string().required(),
        bidTime: Joi.date().required()
    })

    return makeBidSchema.validate(bidDetails)
}

