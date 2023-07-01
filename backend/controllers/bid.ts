import {Request, Response} from 'express'

import {BidService} from '../services/bid.service';

import {validateBidCreation} from '../validators/bid.validator'

const Bid = new BidService();

export const makeBid = async (req: Request, res: Response) =>{
    try{
        const {error} = validateBidCreation(req.body)
        if(error){
            return res.status(400).json({success: false, message: error.details[0].message})
        }
        const bid = await Bid.makeBid(req.body);
        return res.status(201).json(bid)
    }  catch(e : any){
        return res.status(e.code? e.code : 500).json({success: false, message: e.message})
    }

}

export const getBid = async (req: Request, res: Response) =>{
    try{
        const bid = await Bid.getBid(req.params.id);
        return res.status(200).json(bid)
    }  catch(e : any){
        return res.status(e.code? e.code : 500).json({success: false, message: e.message})
    }

}

export const updateBid = async (req: Request, res: Response) =>{
    try{
        const bid = await Bid.updateBid(req.body, req.params.id);
        return res.status(201).json(bid)
    }  catch(e : any){
        return res.status(e.code? e.code : 500).json({success: false, message: e.message})
    }

}

export const deleteBid = async (req: Request, res: Response) =>{
    try{
        const bid = await Bid.deleteBid(req.params.id);
        return res.status(200).json(bid)
    }  catch(e : any){
        return res.status(e.code? e.code : 500).json({success: false, message: e.message})
    }

}

export const getAuctionBids = async (req: Request, res: Response) =>{
    try{
        const bid = await Bid.getAuctionBids(req.params.auction);
        return res.status(200).json(bid)
    }  catch(e : any){
        return res.status(e.code? e.code : 500).json({success: false, message: e.message})
    }

}


