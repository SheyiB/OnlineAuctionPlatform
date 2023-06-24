import {Request, Response} from 'express'

import {BidService} from '../services/bid.service';

const Bid = new BidService();

export const makeBid = async (req: Request, res: Response) =>{
    try{
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

