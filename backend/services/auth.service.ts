import {Auctioneer, AuctioneerType,AuctioneerData, AuctioneerLogin} from '../models/auctionner.model'


export class AuthService{
	signUp (body: AuctioneerType){
        return new Promise<{auctioneer: AuctioneerType, token: string}>(async(resolve, reject) => {
            try{
                let existingUser = await Auctioneer.find({email : body.email})

                if(existingUser.length > 0){
                    return reject({code : 400, message: "Auctioneer Exist!"})
                }
                const auctioneer: AuctioneerData = await Auctioneer.create(body);
                
                const token = auctioneer.getSignedJwtToken();

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


}

