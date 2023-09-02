import {AuthService} from '../services/auth.service'
import {Request, Response} from "express";
import {validateLogin, validateSignup} from "../validators/auth.validator"


const auth = new AuthService();

export const signUp = async (req: Request, res: Response) =>{
    try{
        const {error } = validateSignup(req.body)
        if(error){
            return res.status(400).json({success: false, message: error.details[0].message})
        }
        const auctioneer = await auth.signUp(req.body);
        return res.status(201).json(auctioneer)
    }  catch(e : any){
        return res.status(e.code? e.code : 500).json({success: false, message: e.message})
    }
}

export const login = async (req: Request, res: Response) =>{
    try{
        const {error } = validateLogin(req.body)        
        if(error){
            return res.status(400).json({success: false, message: error.details[0].message})
        }        
        const {auctioneer, token } = await auth.login(req.body);       
        res.header('x-auth-token', token);
        return res.status(201).json({auctioneer, token});
    }  
    catch(e: any) {
            return res.status(e.status? e.status : 500).json({success: false, message: e.message})            
    }
}

export const verify = async (req: Request, res: Response) =>{
    try{
                
        const {message,status } = await auth.verifyEmail(req.params.id);       
        
        return res.status(201).json({message});
    }  
    catch(e: any) {
            return res.status(e.status? e.status : 500).json({success: false, message: e.message})            
    }
}
