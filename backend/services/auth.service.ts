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



    async verifyEmail (link: string){
        try{
            //Decode String

            //Ensure ID is valid

            //Update Databse to show Account has been verified
        }

        catch(e){
            
        }
    }
}

