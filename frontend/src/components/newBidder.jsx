import {Link} from 'react-router-dom'

import './newBidder.css'
const NewBidder = ({auctionId}) => {
    const bidId = `BID/USER/${Math.round(Math.random()*230)}`
    return (
        <div className="bid-confirmation">
            <span>
                Your Bid ID is: {bidId}. Write it down as it is what you would use to redeem your prize or supply your email to get it sent there.
            </span>
            <input type="email" />
            <button>Send</button>
            <div className="button-link">
            <button>
            <Link to={`/auction/${auctionId}`}>Proceed to Auction</Link>
            </button>
            </div>

        </div>

    )
}

export default NewBidder