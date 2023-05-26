import {AuthService} from '../services/auth.service'
import {Request, Response} from "express";

const auth = new AuthService();

export const signUp = async (req: Request, res: Response) =>{
    try{
        const auctioneer = await auth.signUp(req.body);
        return res.status(201).json(auctioneer)
    }  catch(e : any){
        return res.status(e.code? e.code : 500).json({success: false, message: e.message})
    }
}

export const login = async (req: Request, res: Response) =>{
    try{        
        const {auctioneer, token } = await auth.login(req.body);       
        res.header('x-auth-token', token);
        return res.status(201).json({auctioneer, token});
    }  
    catch(e: any) {
            return res.status(e.status).json({success: false, message: e.message})            
    }
}
