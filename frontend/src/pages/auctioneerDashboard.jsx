import MarketComponent from '../components/marketComponent'
import NewMarket from '../components/newMarket';
import { useState } from 'react';

const AuctioneerDashboard  = () => {
    const [create, setCreate] = useState(false) 
    const markets = [ { name: "Shoe Auction", id: "asjsj822h291opasj9", image: "shoe.png", details: "An Online Auction Store for making Shoes"}, { name: "Antique Auction", id: "asjsj822h291o34a23a9", image: "antique.png", details: "An Online Auction Store for selling Antiques"}]
    const toggleCreateMarket = () => {
         create ? setCreate(false) : setCreate(true)
    }
    return (
    <div>
        <h2> Seyi's Auction</h2>
        <div>
            <h1> Markets </h1>

            {markets.map(market => <MarketComponent details={market.details} id={market.id} image={market.image} name={market.name} key={market.id} />)}
        </div>

        <button onClick={toggleCreateMarket}>{create? "Cancel" : "Create Market"}  </button>

        <span> {create ? <NewMarket /> : "" } </span>
    </div>
    );
   };
   
export default AuctioneerDashboard;