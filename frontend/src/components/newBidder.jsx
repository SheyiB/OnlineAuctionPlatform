const NewBidder = () => {
    const bidId = `BID/USER/${Math.round(Math.random()*230)}`
    return (
        <div>
            <span>
                Your Bid ID is : {bidId}
                write it down as it is what you would use to redeem your prize
                or supply your email to get it sent there
                <input type="email"/>
                <button>send</button>
                <button>Proceed to Auction</button>
            </span>
        </div>
    )
}

export default NewBidder