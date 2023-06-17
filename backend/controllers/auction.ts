import {AuctionServie} from '../services/auction.service';

import {Request, Response} from "express";

const Auction = new AuctionServie();

export const createAuction = async (req: Request, res: Response) =>{
    try{
        const auction = await Auction.createAuction(req.body);
        return res.status(201).json(auction)
    }  catch(e : any){
        return res.status(e.code? e.code : 500).json({success: false, message: e.message})
    }

}

export const getAuction = async (req: Request, res: Response) =>{
    try{
        const auction = await Auction.getAuction(req.params.id);
        return res.status(201).json(auction)
    }  catch(e : any){
        return res.status(e.code? e.code : 500).json({success: false, message: e.message})
    }

}

export const getMarketAuctions = async (req: Request, res: Response) =>{
    try{
        const auction = await Auction.getMarketAuctions(req.params.id);
        return res.status(201).json(auction)
    }  catch(e : any){
        return res.status(e.code? e.code : 500).json({success: false, message: e.message})
    }

}

export const deleteAuction = async (req: Request, res: Response) =>{
    try{
        const auction = await Auction.deleteAuction(req.params.id);
        return res.status(204).json(auction)
    }  catch(e : any){
        return res.status(e.code? e.code : 500).json({success: false, message: e.message})
    }

}

export const updateAuction = async (req: Request, res: Response) =>{
    try{
        const auction = await Auction.updateAuction(req.params.id, req.body);
        return res.status(200).json(auction)
    }  catch(e : any){
        return res.status(e.code? e.code : 500).json({success: false, message: e.message})
    }

}



