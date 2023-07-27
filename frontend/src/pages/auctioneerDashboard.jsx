import MarketComponent from '../components/marketComponent'
import NewMarket from '../components/newMarket';
import { useEffect, useState } from 'react';
import './dashboard.css'
import demo from '../assets/demo.jpg'

const apiUrl = import.meta.env.VITE_APP_API_URL;


const AuctioneerDashboard  = () => {

    const [create, setCreate] = useState(false) 
    const [auctioneermarket, setAuctioneerMarket] = useState()
    
    const auctioneer = JSON.parse(localStorage.getItem("auctioneerdata"))
    
    const {market, _id, firstname, lastname, email, phone } = auctioneer

    useEffect( () => {
        async function getAuctioneerMarket(){
            let market = await fetch(`${apiUrl}/market/auctioneer/${_id}`).then(d=> d.json())
            setAuctioneerMarket(market)
        }

        getAuctioneerMarket();
    },[])
    
    const toggleCreateMarket = () => {
         create ? setCreate(false) : setCreate(true)
    }
    return (
            <div className="dashboard-container">
            <h2 >{firstname}'s Auction</h2>
            <button className="create-market-button" onClick={toggleCreateMarket}>
                {create ? "Cancel" : "Create Market"}
            </button>
            { create && (
                <div className="popup-container visible">
                <span className="popup-form" >
                    <NewMarket id={_id} />
                </span>
                </div>
            )}

                    <>
                    {
                        <div className="markets-container">
                        <h1>Markets</h1>
                        <div className="market-row">
                        {auctioneermarket && auctioneermarket.market.length > 0 ? (
                            auctioneermarket.market.map(market => (
                            <MarketComponent
                                key={market._id}
                                details={market.details}
                                id={market._id}
                                image={demo}
                                name={market.name}
                        
                            />
                            ))
                        ) : (
                            <p>No Market</p>
                        )}
                        </div>
                    </div>
                   
                    
                    }
                    </>
            </div>

    );
   };
   
export default AuctioneerDashboard;