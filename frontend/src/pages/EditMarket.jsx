import { useEffect, useState } from 'react';
import ViewAuctionComponent from '../components/viewAuction';
import {useParams, useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom'
import NewAuction from '../components/newAuction';

const apiUrl = import.meta.env.VITE_APP_API_URL;



const EditMarket = () => {

    const auctioneerId = JSON.parse(localStorage.getItem("auctioneerdata"))
    const navigate = useNavigate();

    if (!auctioneerId || auctioneerId === '') {   
    useEffect(()=>{
      navigate('/');
    })
  }

  const {market, _id, firstname, lastname, email, phone } = auctioneerId

  const {marketId} = useParams();

  const [marketAuction, setMarketAuction] = useState()
  const [create, setCreate] = useState(false) 

  const toggleCreateAuction = () => {
    create ? setCreate(false) : setCreate(true)
}

  useEffect( () => {
      async function getMarketAutions(){
          let marketAuctions = await fetch(`${apiUrl}/market/${marketId}`).then(d=> d.json())
          setMarketAuction(marketAuctions.market.auction)
      }
      getMarketAutions();
  },[]) 
 
    console.log(marketAuction)
    return(
        <div className="view-auction-container">
              <h2 >{firstname}'s Auction</h2>
              <button className="create-market-button" onClick={toggleCreateAuction}>
                {create ? "Cancel" : "Create Auction"}
            </button>
            { create && (
                <div className="popup-container visible">
                <div className="popup-form" >
                    <NewAuction id={_id} />
                </div>
                </div>
            )}
            {marketAuction && ( marketAuction.map(auction => 
            <ViewAuctionComponent  
            auctionDetails={auction.details}
            auctionType={auction.autionType}
            date={auction.date}
            image={auction.image}
            item={auction.item}
            startingPrice={auction.startingPrice}
            key={auction._id}
            />) )} 
        </div>


    )
}

export default EditMarket;