import { useState } from "react";
const Auction  = () => {
    const [status, setStatus] = useState("pending")

 return (
 <>
 <h1> Seyi Shoe Auction </h1>

 <img src="item.png" />
 <h1> Rare Ball ORB!</h1>
 <h2> This Ball was gotten from Mars in 1960</h2>
 <h2> Auction Type: VICKERY!!</h2>

 { status == "live"? 
 <>
 <span>
    <h1> Time Remaining </h1>
    <h2> 24:01 </h2>
    <h2> LIVE! </h2>
 </span>
 <span> 
    <h1>Bids</h1>
    <ul>
        <li> $5000 </li>
        <li> $2000 </li>
        <li> $1500 </li>
        <li> $300 </li>
        <li> $100 </li>
    </ul> 
 </span>

 <span>
    <h2>Highest Bid</h2>
    <h3>$5000</h3>
 </span>

 <div>
    <h3>Place Bid</h3>
    <label>Amount</label>
    <input type="number" placeholder="Enter Bid Amount"/>
    <button> Sumbit Bid </button>
 </div>
 </> : ""}
    {
        status == "ended" ? <span> Bid Ended Winning Bid : 30B</span> : ""
    }

{
        status == "pending" ? <span> Bid yet to start</span> : ""
    }
 </>
 );
};

export default Auction;