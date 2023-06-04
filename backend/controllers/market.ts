import {MarketServie} from '../services/market.service';

import {Request, Response} from "express";


const market = new MarketServie();

export const createMarket = async (req: Request, res: Response) =>{
    try{
        const auctioneer = await market.createMarket(req.body);
        return res.status(201).json(auctioneer)
    }  catch(e : any){
        return res.status(e.code? e.code : 500).json({success: false, message: e.message})
    }
}

export const updateMarket = async (req: Request, res: Response) =>{
    try{
        const auctioneer = await market.updateMarket(req.params.id, req.body);
        return res.status(201).json(auctioneer)
    }  catch(e : any){
        return res.status(e.code? e.code : 500).json({success: false, message: e.message})
    }
}



export const deleteMarket = async (req: Request, res: Response) =>{
    try{
        await market.deleteMarket(req.body);       
        return res.status(204).json({"message": "Market Deleted"});
    }  
    catch(e: any) {
            return res.status(e.status? e.status : 500).json({success: false, message: e.message})            
    }
}
