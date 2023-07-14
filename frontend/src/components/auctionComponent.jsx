import NewBidder from "./newBidder"
import { useState } from "react"

const AuctionComponent = ({auctionItem, auctionType, itemImage, auctionDate, auctionDuration, startingBid, status}) => {
    const [bid, setBid] = useState(false)
    const toggleBid =() => {
        setBid(!bid)
    }
    return (
        <div>
            <img src={itemImage} />
            <span>
                {auctionItem}
            </span>
            <span>
                Auction Type: {auctionType}
            </span>
            <span>
                Auction Date: {auctionDate}
            </span>
            <span>
                Auction Duration : {auctionDuration}
            </span>
            <span>
                Starting Bid: {startingBid}
            </span>
            <span>
                Status : {status}
            </span>

            
            <button onClick={toggleBid}> {bid ? "Cancel" :  "Bid" } </button>
            <span>{bid? <NewBidder/> : ""} </span>
            

        </div>
    )
}

export default AuctionComponent