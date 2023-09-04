import Joi from 'joi'
import {AuctioneerType, AuctioneerLogin} from '../models/auctionner.model'

export const validateLogin = ( loginDetails : AuctioneerLogin) => {
    const loginSchema = Joi.object().keys({
        email :  Joi.string().required(),
        password: Joi.string().required()
    })

    return loginSchema.validate(loginDetails)
}

export const validateSignup = ( signupDetails : AuctioneerType) => {
    
    const signupSchema = Joi.object().keys({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        phone: Joi.number().required(),
        email :  Joi.string().required(),
        password: Joi.string().required(),
        dob: Joi.date().required(),
        market: Joi.string()
    })

    return signupSchema.validate(signupDetails)
}
