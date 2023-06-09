import {MarketServie} from '../services/market.service';

import {Request, Response} from "express";

const Market = new MarketServie();

export const createMarket = async (req: Request, res: Response) =>{
    try{
        const market = await Market.createMarket(req.body);
        return res.status(201).json(market)
    }  catch(e : any){
        return res.status(e.code? e.code : 500).json({success: false, message: e.message})
    }
}

export const updateMarket = async (req: Request, res: Response) =>{
    try{
        const market = await Market.updateMarket(req.params.id, req.body);
        return res.status(201).json(market)
    }  catch(e : any){
        return res.status(e.code? e.code : 500).json({success: false, message: e.message})
    }
}

export const getAllMarkets = async (req: Request, res: Response) =>{
    try{
        const market = await Market.getAllMarkets();
        return res.status(201).json(market)
    }  catch(e : any){
        return res.status(e.code? e.code : 500).json({success: false, message: e.message})
    }
}


export const getAuctioneerMarket = async (req: Request, res: Response) =>{
    try{
        const market = await Market.getAuctioneerMarket(req.params.id);
        return res.status(201).json(market)
    }  catch(e : any){
        return res.status(e.code? e.code : 500).json({success: false, message: e.message})
    }
}


export const deleteMarket = async (req: Request, res: Response) =>{
    try{
        await Market.deleteMarket(req.body);       
        return res.status(204).json({"message": "Market Deleted"});
    }  
    catch(e: any) {
            return res.status(e.status? e.status : 500).json({success: false, message: e.message})            
    }
}
