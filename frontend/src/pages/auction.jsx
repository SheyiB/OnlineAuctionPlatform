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
    const [leadingBid, setLeadingBid] = useState()
    const [leadingBidder, setLeadingBidder] = useState('')
    const [bids, setBids] = useState()
    const expirationTime = auction.endDate;
    const [bidsMade, setBidsMade] = useState(0)
    const [viewWinner, setViewWinner] = useState(false)
    const [bidWinner, setBidWinner ] = useState("")

  

    useEffect( () => {
      async function getAuction(){
          console.log('Auction Data Updated')
          let auctionData = await fetch(`${apiUrl}/auction/${auctionId}`).then(d=> d.json())
          setAuction(auctionData.auction)
          setStatus(isBidTimingValid(auctionData.auction.date, auctionData.auction.endDate))
          setBids(auctionData.bids)
          setLeadingBid(auction.leadingBid && auction.leadingBid.length > 1 ? auction.leadingBid[0].bidValue : auction.startingPrice)
          
  
      }

      getAuction();
  }, [bidsMade])


  const getWinner = () => {
    setViewWinner(true)
    if(auction.auctionType == 'vickery'){

      const sortedItems = auction.bids.sort((a, b) => b.bidValue - a.bidValue);

      const zaWinner = {bidOwner: sortedItems[0].bidOwner ,bidValue: sortedItems[0].bidValue, bidToPay: sortedItems[1].bidValue };
      console.log('WINNER!!!!')
      console.log(zaWinner)
      setBidWinner(zaWinner)
    }
    else if(auction.auctionType == 'free-penny'){
      
      const lastAddedBid = auction.bids[auction.bids.length - 1];
      setBidWinner(lastAddedBid.bidValue)
    }

    else{
      console.log("hjjj",auction.leadingBid[0].bidValue)
      setBidWinner(auction.leadingBid[0].bidValue)
    }

  }
  const submitBid = async(e) => {
    setBidsMade(bidsMade+1)
    console.log(bidsMade)
    e.preventDefault()
      if (isBidTimingValid(auction.date, auction.endDate) == 'live'){

        onBidSubmit(bidValue, bidOwner)
          
        
           
      }
     
  }
    
  console.log(auction)
 const ndate = new Date(auction.date);
  const edate = new Date(auction.endDate)

  const createBid = async() => {
    const time = new Date()
    const timeUTC = new Date(time.getTime() + time.getTimezoneOffset() * 60000);
    
    const bid = {bidOwner: bidOwner, bidValue: bidValue, auctionId: auctionId, bidTime: timeUTC}
    
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
        const startTimeUTC = new Date(startTime.getTime() + startTime.getTimezoneOffset() * 60000);

        const endTime = new Date(endTimeString);
        const endTimeUTC = new Date(endTime.getTime() + endTime.getTimezoneOffset() * 60000);

        //console.log(currentTime, startTimeUTC, endTimeUTC)
      
        if (currentTime < startTimeUTC) {
          //console.log(currentTime ,  startTime)
          // The auction has not started yet
          return 'pending';
        } else if (currentTime >= startTimeUTC && currentTime <= endTimeUTC) {
          // The auction is in progress
          return 'live';
        } else {
          // The auction has ended
          return 'ended';
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

    if(!auction.bidders.includes(bidOwner)){
        alert(`Invalid Bidder, Go to http://localhost:5173/market/${auctionId} to generate a bid id`)
        return false
    }
      
      if(auction.auctionType == 'english'){

          const leadBid = auction.leadingBid.length > 1? auction.leadingBid[0].bidValue : auction.startingPrice 
            
            if(bidValue > leadBid){
              console.log('Valid!')
              createBid()
              const data = {leadingBid: [{bidOwner, bidValue}]}

              setBids(...[{bidOwner, bidValue}])
              updateAuction(data) 
              setLeadingBid(bidValue)
              setLeadingBidder(bidOwner)
              return true
               
               
            }
            else{
              console.log(bidValue, leadBid)
               console.log('Invalid Bid, Bid Must be greater than Leading Bid')
               alert('Invalid Bid, Bid Must be greater than Leading Bid')
               return false
            }
      }
      else if(auction.auctionType == 'dutch'){
               setLeadingBid(bidValue)
               setLeadingBidder(bidOwner)
               const data = {leadingBid: [{bidOwner, bidValue}], winner: bidOwner}
               updateAuction(data) 
               return true
               
               //endAuction
      }
      else if(auction.auctionType == 'silent bid'){
        console.log("bidmade")
        console.log(auction.bids.length)
        if(auction && auction.bids.length < 1){
          
          createBid()
          const data = {leadingBid: [{bidOwner, bidValue}]}
          updateAuction(data) 
          setLeadingBid(bidValue)
        }
        else if(bidValue > auction.leadingBid[0].bidValue){
          createBid()
          const data = {leadingBid: [{bidOwner, bidValue}]}
          updateAuction(data) 
          setLeadingBid(bidValue)
        }
        else{
          createBid()
        }
        return true

   }

   else if(auction.auctionType == 'vickery')  {
    if(bidValue > leadingBid ){
      console.log('Valid!')
      createBid()
      const data = {leadingBid: [{bidOwner, bidValue}]}

      setBids(...[{bidOwner, bidValue}])
      updateAuction(data) 
      setLeadingBid(bidValue)
      setLeadingBidder(bidOwner)
      return true
       
       
  
   }
   else{
      console.log('Invalid Bid, Bid Must be greater than Leading Bid')
      alert('Invalid Bid, Bid Must be greater than Leading Bid')
      return false
   }
    
   }

   else if(auction.auctionType == 'free-penny'){
    const inc = auction.startingPrice
    console.log(bidValue, auction.leadingBid[0].bidValue, inc)
    if(bidValue - auction.leadingBid[0].bidValue >= inc){
      console.log('Valid!')
      createBid()
      const data = {leadingBid: [{bidOwner, bidValue}]}
      console.log(data)
      setBids(...[{bidOwner, bidValue}])
      updateAuction(data) 
      setLeadingBid(bidValue)
      setLeadingBidder(bidOwner)
      
      return true
    }
    else{
      alert( 'Bid must be greater than increment!')
      return false
    }
   }


   }

    

  // if(auction){
  //  console.log(auction)
  // }
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
         <h2 className="auction-page-subheading">Auction Status: {status}</h2>
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
           
           { auction && auction.auctionType !== 'silent bid' &&(
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
           </ul></>)}
         </>
       )}
     </div>
     <div className="auction-highest-bid">
       {status === "live" && auction.leadingBid && (
         <> {auction.auctionType !== 'silent bid'? 
         <>
         <h2 className="auction-page-subheading"> 
         {auction.auctionType == 'dutch' || auction.auctionType == 'free-penny' ?  "Current Bid" : "Highest Bid"}
         </h2>
         
         <h3 className="auction-page-description">
        
          ${auction.leadingBid.length > 1? auction.leadingBid[0].bidValue : auction.startingPrice}
        </h3>
        </> : ""} 
       
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
         <span>Bid Ended</span><br/>
         <button onClick={getWinner}>View Bid Winner</button>
         {viewWinner && ( <span> 
          
           {auction.auctionType !== 'vickery' ? `Winning Bid : $ ${bidWinner}` : `Winning Bid: ${bidWinner.bidValue} - Amount to Pay : ${bidWinner.bidToPay}`}
            {/* ${ auction.leadingBid? auction.leadingBid[0].bidValue : ""}   */}
           </span>)
          }
       </div>
     )}
     {status === "pending"  &&  ( 
       <div className="auction-page-section auction-page-pending-bid">
         <span>Bid yet to start</span>
       </div>
     )}
   </div>
 </>
 

 
 );
};

export default Auction;