const AuctionComponent = ({auctionItem, auctionType, itemImage, auctionDate, auctionDuration, startingBid, status}) => {
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

            <button>Bid</button>
            

        </div>
    )
}

export default AuctionComponent