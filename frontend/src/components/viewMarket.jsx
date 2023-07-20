const ViewMarketComponent = ({image, item, auctionType, startingPrice, aucionDetails, date}) => {
    return(
        <>
        <div>
            <image src={image} />
            <div>
                <h2>{item} </h2>
                <span>{auctionType}</span>
                <span>{date}</span>
                <span>  {auctionType !== "Free Penny" ? `Starting Bid : ${auctionType == 'english' || auctionType == 'duth' ? startingPrice : "No Starting Bid"}` : ` Bid Increment : ${startingPrice}`} </span>
                <p>{aucionDetails}</p>
            </div>
            <div>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
        </>
    )
}