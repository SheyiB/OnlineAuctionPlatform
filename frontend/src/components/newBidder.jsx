import {Link} from 'react-router-dom'
import CryptoJS from 'crypto-js';
import { useState } from 'react';

import './newBidder.css'


const apiUrl = import.meta.env.VITE_APP_API_URL;


function generateShortBidderId(mongoObjectId, length = 6) {
    // Ensure the input is a string
    const str = String(mongoObjectId);
  
    // Generate a random string of 6 characters for uniqueness
    const randomString = CryptoJS.lib.WordArray.random(3).toString();
  
    // Concatenate the MongoDB object id and the random string
    const uniqueId = str + randomString;
  
    // Use the SHA-256 hashing algorithm
    const sha256Hash = CryptoJS.SHA256(uniqueId).toString();
  
    // Truncate the hashedId to the desired length
    const hashedId = sha256Hash.slice(0, length);
  
    return hashedId;
  }
  

  
const NewBidder = ({auctionId}) => {
    const [publicName, setPublicName] = useState()
    const bidId = `BID/USER/${Math.round(Math.random()*230)}`
    const shortBidderId = `BID/USER/${generateShortBidderId(auctionId, 5)}`;
    
    const updateBidders = async(bidderId, auctionId) =>{
   
        let auctionData = await fetch(`${apiUrl}/auction/${auctionId}`).then(d=> d.json())
        console.log(auctionData.auction)
        let vbidders = auctionData.auction.bidders
        if(!vbidders){
            vbidders = [bidderId]
        }
        else{
            vbidders.push(bidderId) 
        }
        console.log(vbidders)
        
        const response = await fetch(`${apiUrl}/auction/${auctionId}`,{
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json',
            },
            body: JSON.stringify({bidders: vbidders}),
        })
        .then(d => d.json())
        
        .catch((e)=>{console.log(e)})
    
    } 
    updateBidders(shortBidderId, auctionId)


    return (
        <div className="bid-confirmation">
            <span>
                Your Bid ID is: {shortBidderId}. Write it down as it is what you would use to redeem your prize .
                <input type='text' onChange={e=> setPublicName(e.target.value)} />
            </span>
            {/* <input type="email" /> */}
            {/* <button>Send</button> */}
            <div className="button-link">
            <button>
            <Link to={`/auction/${auctionId}`}>Proceed to Auction</Link>
            </button>
            </div>

        </div>

    )
}

export default NewBidder