import { useState, useEffect } from "react";
import './auction.css'
import {useParams} from 'react-router-dom';
import demo from '../assets/demo.jpg'
import TimerComponent from "../components/timerComponent";
import jersey from '../assets/jersey.jpg';

const apiUrl = import.meta.env.VITE_APP_API_URL;

const Auction  = () => {
    const [status, setStatus] = useState("ended")
    const {auctionId} = useParams();
    const [auction, setAuction] = useState("")
    const [bidOwner, setBidOwner] = useState("")
    const [bidValue, setBidValue] = useState("")
    const [leadingBid, setLeadingBid] = useState(auction.startingPrice)
    const [leadingBidder, setLeadingBidder] = useState('')
    const [bids, setBids] = useState()
    const expirationTime = auction.endDate;

    console.log(auction)

    console.log(expirationTime)
    console.log(auction.date)
    useEffect( () => {
      async function getAuction(){
          let auctionData = await fetch(`${apiUrl}/auction/${auctionId}`).then(d=> d.json())
          setAuction(auctionData.auction)
        //  setStatus(auctionData.auction.status)
         setBids(auctionData.bids)
      }

      getAuction();
  }, [])
    
  const ndate = new Date(auction.date);
  const edate = new Date(auction.endDate)

    const submitBid = async() => {
         const time = new Date()
         const bid = {bidOwner: bidOwner, bidValue: bidValue, auctionId: auctionId, bidTime: time}
         console.log(bid)
         await fetch(`${apiUrl}/bids/`,{
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
            },
            body: JSON.stringify(bid),
        }).then(d => d.json()).catch((e)=>{console.log(e)})    
      }


      function isBidTimingValid(startTimeString, endTimeString) {
        const currentTime = new Date();
      
        const startTime = new Date(startTimeString);
        const endTime = new Date(endTimeString);
      
        if (currentTime < startTime) {
          // The auction has not started yet
          return 'The auction has not started. Bids are not valid.';
        } else if (currentTime >= startTime && currentTime <= endTime) {
          // The auction is in progress
          return 'The auction is in progress. Bids are valid.';
        } else {
          // The auction has ended
          return 'The auction has ended. Bids are not valid.';
        }
      }
      
      const updateAuction = async(details) => {

       const response = await fetch(`${apiUrl}/auction/${auctionId}`,{
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json',
            },
            body: JSON.stringify(details),
        })
        .then(d => d.json())
        
        .catch((e)=>{console.log(e)})

   
      }
    
   
   const onBidSubmit = async(bidValue, bidOwner)=>{
      
      if(auction.auctionType == 'english'){

            if(bidValue > leadingBid ){
              const data = {leadingBid: [{bidOwner, bidValue}]}
              updateAuction(data) 
              setLeadingBid(bidValue)
               setLeadingBidder(bidOwner)
               
               
            }
            else{
               return 'Invalid Bid, Bid Must be greater than Leading Bid'
            }
      }
      else if(auction.auctionType == 'dutch'){
               setLeadingBid(bidValue)
               setLeadingBidder(bidOwner)
               const data = {leadingBid: [{bidOwner, bidValue}], winner: bidOwner}
               updateAuction(data) 
               
               //endAuction
      }
      else if(auction.auctionType == 'sealedBid'){
        const data =""  
        setBids(...bids, [{bidOwner, bidValue}])

   }

   else if(auction.auctionType == 'vickery')  {
    if(bidValue > leadingBid ){
      setLeadingBid(bidValue)
      setLeadingBidder(bidOwner)
      setBids(...bids, [{bidOwner, bidValue}])
  
   }
   else{
      return 'Invalid Bid, Bid Must be greater than Leading Bid'
   }
    
   }

   else if(auction.auctionType == 'free penny'){
    if(bidValue >= auction.startingPrice){
      setLeadingBid(leadingBid+bidValue)
      setLeadingBidder(bidOwner)
    }
    else{
      return 'Bid must be greater than increment!'
    }
   }


   }

    

  if(auction){
   console.log(auction)
  }
 return (
   <>
   <div className="auction-page">
     <div className="auction-details">
       <h1 className="auction-page-heading-main">{auction && (auction.market.name) } Auctions</h1>
       <div className="auction-page-top">
       <img src={jersey} className="auction-page-image" alt="Item" />
       
       <div className="auction-description">
         <h1 className="auction-page-heading">{auction.item}</h1>
         <h2 className="auction-page-details">{auction.details ? auction.details : `Auction for ${auction.item}` }</h2>
         <h2 className="auction-page-subheading">Auction Type: {auction.auctionType}</h2>
         <h2 className="auction-page-subheading">Auction Status: {auction.status}</h2>
         <h2 className="auction-page-subheading">{auction.status == 'pending' ? `Auction Date : ${auction.date.slice(0,10)}` : ""}</h2>
         <h2 className="auction-page-subheading">Auction Start Time: {auction.date?  ndate.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric',  hour12: true,timeZone: 'UTC'}): ""}</h2>
         <h2 className="auction-page-subheading">Auction End Time: {auction.endDate?  edate.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric',  hour12: true,timeZone: 'UTC'}): ""}</h2>
        
       </div>
       </div>
       
       {status === "live" && (
         <TimerComponent  expirationTime={expirationTime}/>
       )}
     </div>
     <div className="auction-bids">
       {status === "live" && auction.auctionType !== 'sealed-bid' && (
         <>
           <h1 className="auction-page-heading">Bids</h1>
           <ul className="auction-bids-list">
             {auction.bids ? (
               auction.bids.map(bid => (
                 <li key={bid._id}>
                   <span>{bid.bidOwner}</span> <span>${bid.bidValue}</span>
                 </li>
               ))
             ) : (
               <p>No Bids Yet</p>
             )}
           </ul>
         </>
       )}
     </div>
     <div className="auction-highest-bid">
       {status === "live" && (
         <> {auction.auctionType !== 'silent bid'? <><h2 className="auction-page-subheading">Highest Bid</h2>
         <h3 className="auction-page-description">$5000</h3></> : ""} 
       
         </>
       )}
     </div>
     {status === "live" && (
       <form onSubmit={submitBid} className="auction-bid-form">
         <h3 className="auction-page-subheading">Place Bid</h3>
         <label className="auction-page-bid-label">Amount</label>
         <input type="number" onChange={e => setBidValue(e.target.value)} className="auction-page-bid-input" placeholder="Enter Bid Amount" />
         <br/><input type="text" onChange={e => setBidOwner(e.target.value)} placeholder="Enter your ID" />
         <br/><button className="auction-page-bid-button">Submit Bid</button>
       </form>
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