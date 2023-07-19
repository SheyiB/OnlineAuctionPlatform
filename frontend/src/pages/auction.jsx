import { useState, useEffect } from "react";
import './auction.css'
import {useParams} from 'react-router-dom';

const apiUrl = import.meta.env.VITE_APP_API_URL;

const Auction  = () => {
    const [status, setStatus] = useState("live")
    const {auctionId} = useParams();
    const [auction, setAuction] = useState("")
    const [bidOwner, setBidOwner] = useState("")
    const [bidValue, setBidValue] = useState("")

    const submitBid = async( bidValue, bidOwner) => {
         const time = new Date()
         const bid = {bidOwner: bidOwner, bidValue: bidValue, auctionId: auctionId, bidTime: time}
         await fetch(`${apiUrl}/bids/`,{
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
            },
            body: JSON.stringify(bid),
        }).then(d => d.json()).catch((e)=>{console.log(e)})    
      }
   
   const onBidSubmit = async(bidValue)=>{
      
   }

    useEffect( () => {
      async function getAuction(){
          let auctionData = await fetch(`${apiUrl}/auction/${auctionId}`).then(d=> d.json())
          setAuction(auctionData.auction)
        //  setStatus(auctionData.auction.status)
      }

      getAuction();
  }, [])
     


  if(auction){
   console.log(auction)
  }
 return (
   <>
   <div className="auction-page">
     <h1 className="auction-page-heading">Seyi Shoe Auction</h1>
 
     <img src="item.png" className="auction-page-image" alt="Item" />
     <h1 className="auction-page-heading">Rare Ball ORB!</h1>
     <h2 className="auction-page-subheading">This Ball was gotten from Mars in 1960</h2>
     <h2 className="auction-page-subheading">Auction Type: {auction.auctionType}</h2>
 
     {status === "live" && (
       <>
         <div className="auction-page-section">
           <h1 className="auction-page-heading">Time Remaining</h1>
           <h2 className="auction-page-subheading">24:01</h2>
           <h2 className="auction-page-subheading">LIVE!</h2>
         </div>
         <div className="auction-page-section">
            { auction.auctionType !== 'sealed-bid' ? 
            <>
             <h1 className="auction-page-heading">Bids</h1>
           <ul className="auction-page-list">
             <li className="auction-page-list-item">$5000</li>
             <li className="auction-page-list-item">$2000</li>
             <li className="auction-page-list-item">$1500</li>
             <li className="auction-page-list-item">$300</li>
             <li className="auction-page-list-item">$100</li>
           </ul>
            </> : <p> Auction In Progress </p>  }
          
         </div>
 
         <div className="auction-page-section auction-page-highest-bid">
           <h2 className="auction-page-subheading">Highest Bid</h2>
           <h3 className="auction-page-description">$5000</h3>
         </div>
 
         <div className="auction-page-section auction-page-bid-form">
           <h3 className="auction-page-subheading">Place Bid</h3>
           <label className="auction-page-bid-label">Amount</label>
           <input type="number" className="auction-page-bid-input" placeholder="Enter Bid Amount" />
           <br/><input placeholder="enter your ID " />
           <br/>  <button className="auction-page-bid-button">Submit Bid</button>
         </div>
       </>
     )}
 
     {status === "ended" && (
       <div className="auction-page-section auction-page-ended-bid">
         <span>Bid Ended. Winning Bid: 30B</span>
       </div>
     )}
 
     {status === "pending" && (
       <div className="auction-page-section auction-page-pending-bid">
         <span>Bid yet to start</span>
       </div>
     )}
   </div>
 </>
 
 );
};

export default Auction;