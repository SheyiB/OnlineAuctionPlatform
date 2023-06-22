import {AuctionServie} from '../services/auction.service';

import {MarketServie} from '../services/market.service';

import {AuctioneerService} from '../services/auctioneer.service';

import {Request, Response} from "express";

const Auction = new AuctionServie();

const Market = new MarketServie();

const Auctioneer = new AuctioneerService();

export const createMarket = async (req: Request, res: Response) =>{
    try{
        const market = await Market.createMarket(req.body);
        return res.status(201).json(market)
    }  catch(e : any){
        return res.status(e.code? e.code : 500).json({success: false, message: e.message})
    }
}

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

export const deleteAuction = async (req: Request, res: Response) =>{
    try{
        const auction = await Auction.deleteAuction(req.params.id);
        return res.status(204).json(auction)
    }  catch(e : any){
        return res.status(e.code? e.code : 500).json({success: false, message: e.message})
    }

}

export const getMarket = async (req: Request, res: Response) =>{
    try{
        const auction = await Auctioneer.getAuctioneerMarket(req.params.id);
        return res.status(201).json(auction)
    }  catch(e : any){
        return res.status(e.code? e.code : 500).json({success: false, message: e.message})
    }

}


