import MarketComponent from '../components/marketComponent'
import NewMarket from '../components/newMarket';
import { useEffect, useState } from 'react';
import './dashboard.css'

const apiUrl = import.meta.env.VITE_APP_API_URL;


const AuctioneerDashboard  = () => {

    const [mode, setMode] = useState('basic')
    const [create, setCreate] = useState(false) 
    const [auctioneermarket, setAuctioneerMarket] = useState()
    const auctioneer = JSON.parse(localStorage.getItem("auctioneerdata"))
    
    const {market, _id, firstname, lastname, email, phone } = auctioneer

    console.log(_id)
    useEffect( () => {
        async function getAuctioneerMarket(){
            let market = await fetch(`${apiUrl}/market/auctioneer/${_id}`).then(d=> d.json())
            setAuctioneerMarket(market)
        }

        getAuctioneerMarket();
    }, [])
    
    if(auctioneermarket){
        auctioneermarket.market.map( i => console.log(i))
    }
    
    const toggleCreateMarket = () => {
         create ? setCreate(false) : setCreate(true)
    }
    return (
            <div className="dashboard-container">
             <h2>{firstname}'s Auction</h2>
                {mode === 'basic' && (
                    <>
                    <div className="markets-container">
                        <h1>Markets</h1>
                        <div className="market-row">
                        {auctioneermarket && auctioneermarket.market.length > 1 ? (
                            auctioneermarket.market.map(market => (
                            <MarketComponent
                                key={market._id}
                                details={market.details}
                                id={market.id}
                                image={market.image}
                                name={market.name}
                            />
                            ))
                        ) : (
                            <p>No Market</p>
                        )}
                        </div>
                    </div>
                    <button className="create-market-button" onClick={toggleCreateMarket}>
                        {create ? "Cancel" : "Create Market"}
                    </button>
                    <span>{create && <NewMarket id={_id} />}</span>
                    </>
                )}

            {mode === 'view' && (
                <div className="view-auction-container">
                <h1>View Auction</h1>
                </div>
            )}

            {mode === 'edit' && (
                <div className="edit-container">
                {/* Content for edit mode */}
                </div>
            )}
            </div>

    );
   };
   
export default AuctioneerDashboard;