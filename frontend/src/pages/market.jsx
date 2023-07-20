import { useState, useEffect } from "react";
import AuctionComponent from "../components/auctionComponent";
import {useParams} from 'react-router-dom';
import './market.css'

const apiUrl = import.meta.env.VITE_APP_API_URL;


const Market  = () => {
    const patientMail = localStorage.getItem("patientMail")
    const [market, setMarket] = useState()
    const {marketId} = useParams();

    useEffect( () => {
        async function getMarket(){
            let marketData = await fetch(`${apiUrl}/market/${marketId}`).then(d=> d.json())
            setMarket(marketData)
        }

        getMarket();
    }, [])
       
   
    const auctions = [{auctionItem : "Stone", auctionType : "Silent Auction", itemImage: "stone.jpg", auctionDate: "12-Aug-2023", auctionDuration: "5days", startingBid: "None", status: "pending", id: "28bjsj92n*3@"}, {auctionItem : "Stone", auctionType : "Silent Auction", itemImage: "stone.jpg", auctionDate: "12-Aug-2023", auctionDuration: "5days", startingBid: "None", status: "pending", id: "28bjsj3492n*3@"}, {auctionItem : "Stone", auctionType : "Silent Auction", itemImage: "stone.jpg", auctionDate: "12-Aug-2023", auctionDuration: "5days", startingBid: "None", status: "pending", id: "28bjsj92n*3@!@" }, {auctionItem : "Stone", auctionType : "Silent Auction", itemImage: "stone.jpg", auctionDate: "12-Aug-2023", auctionDuration: "5days", startingBid: "None", status: "pending", id: "28bjsj92342134n*3@"}]
    return (
        <div className="auctions-container">
        <h1>Seyi's Big Shoe Auctions</h1>
        
        <div className='auction-market'>
        {market && market.market.auction.length>1 ? market.market.auction.map(auction => <AuctionComponent auctionItem={auction.item} auctionDate={auction.date} auctionDuration={auction.duration} auctionType={auction.auctionType} itemImage={auction.image} startingBid={auction.startingPrice} status={auction.status} key={auction._id} auctionId={auction._id}/>) : "No Auction Yet"}
        </div>
      </div>
      
    );
   };
   
   export default Market;