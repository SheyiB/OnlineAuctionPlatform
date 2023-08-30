import {Auctioneer, AuctioneerType,AuctioneerData, AuctioneerLogin} from '../models/auctionner.model'
import jwt from 'jsonwebtoken';

export class AuthService{
	signUp (body: AuctioneerType){
        return new Promise<{auctioneer: AuctioneerType, token: string}>(async(resolve, reject) => {
            try{
                let existingUser = await Auctioneer.find({email : body.email})

                if(existingUser.length > 0){
                    return reject({code : 400, message: "Auctioneer Exist!"})
                }
                const auctioneer: AuctioneerData = await Auctioneer.create(body);

                const verfiyToken = auctioneer.getEmailVerifyToken()
                const token = auctioneer.getSignedJwtToken();


                //Send mail based on verify-token s

                return resolve({auctioneer, token});
            }
            catch (e: any){
                if(e.message.includes('validation failed')){
                    return reject({code: 400, message: e.message})
                }
                
                e.source = 'Sign-Up Service';
                return reject(e)
            }
        })
    }


    login (body: AuctioneerLogin) {
        return new Promise<{auctioneer: string, token: string}>(async(resolve, reject) => {
            try{

                const {email, password} = body;

                const auctioneer : AuctioneerData | any= await Auctioneer.findOne({email: email}).select('+password');


                if (!auctioneer) reject('FALSE-INFO!');

 				const isMatch =  await auctioneer.matchPassword(password); 
                if(!isMatch) reject({status: 401, message:'Invalid Inforamtion Supplied!'});

                auctioneer.password = undefined;

                const token: string = auctioneer.getSignedJwtToken();

                if(!token) reject ('Could not Sign In Auctioneer');



                resolve({auctioneer, token} )
            }
            catch(e : any){
                e.source = 'Get Auctioneer Service';
                return reject(e)
            }
        })
    }

    async verifyEmail (link: string){
        try{
            //Decode String

            const id = jwt.verify(link, process.env.JWT_VERIFY_SECRET!)

            //Ensure ID is valid
            const auctionnerExsits = await Auctioneer.findById(id)

            if(auctionnerExsits){
            //Update Databse to show Account has been verified
            await Auctioneer.findByIdAndUpdate(id, {verfied: true }, {runValidators: true, new: true})                

            return ({"status": 200, "message" : "User successfully Verfied"})
            }

            else{
                return ({"status": 400, "message" : "Invalid Token"})

            }            

        }

        catch(e:any){
            
            return ({"status": 500, "message" : e.message})

        }
    }
}

