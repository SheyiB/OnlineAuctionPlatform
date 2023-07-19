import NewBidder from "./newBidder"
import { useState } from "react"
import './auctionComponent.css'

const AuctionComponent = ({auctionItem, auctionType, itemImage, auctionDate, auctionDuration, startingBid, status, auctionId}) => {
    const [bid, setBid] = useState(false)
    const toggleBid =() => {
        setBid(!bid)
    }
    return (
        <div className="auction-item">
      <img src={itemImage} alt="Auction Item" />
      <span className="auction-title">{auctionItem}</span>
      <span>Auction Type: {auctionType}</span>
      <span>Auction Date: {auctionDate.slice(0,10)}</span>
      <span>Auction Duration: {auctionDuration == null ? "1hour" : auctionDuration}</span>
      <span>Starting Bid: {startingBid}</span>
      <span>Status: {status}</span>
      <button onClick={toggleBid}>{bid ? "Cancel" : "Bid"}</button>
      <span>{bid ? <NewBidder auctionId={auctionId}/> : ""}</span>
    </div>
    )
}

export default AuctionComponent