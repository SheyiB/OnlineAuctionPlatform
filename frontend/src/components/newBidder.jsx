const NewBidder = ({bidId}) => {
    return (
        <div>
            <span>
                Your Bid ID is : {bidId}
                write it down as it is what you would use to redeem your prize
                or supply your email to get it sent there
                <input type="email"/>
            </span>
        </div>
    )
}

export default NewBidder