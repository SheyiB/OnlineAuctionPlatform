const ViewMarketComponent = ({image, item, auctionType, startingPrice, auctionDetails, date}) => {
    return(
        <>
        <div className="view-market-container">
            <img src={image} alt="Market Item" className="view-market-image" />
            <div className="view-market-details">
            <h2 className="view-market-heading">{item}</h2>
            <span className="view-market-subheading">{auctionType}</span>
            <span className="view-market-subheading">{date}</span>
            <span className="view-market-subheading">
                {auctionType !== "Free Penny"
                ? `Starting Bid: ${
                    auctionType === "english" || auctionType === "dutch"
                        ? startingPrice
                        : "No Starting Bid"
                    }`
                : `Bid Increment: ${startingPrice}`}
            </span>
            <p className="view-market-description">{auctionDetails}</p>
            </div>
            <div className="view-market-buttons">
            <button className="view-market-button">Edit</button>
            <button className="view-market-button">Delete</button>
            </div>
        </div>
</>

    )
}

export default ViewMarketComponent;