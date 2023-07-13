import AuctionComponent from "../components/auctionComponent";

const Market  = () => {
    const auctions = [{auctionItem : "Stone", auctionType : "Silent Auction", itemImage: "stone.jpg", auctionDate: "12-Aug-2023", auctionDuration: "5days", startingBid: "None", status: "pending", id: "28bjsj92n*3@"}, {auctionItem : "Stone", auctionType : "Silent Auction", itemImage: "stone.jpg", auctionDate: "12-Aug-2023", auctionDuration: "5days", startingBid: "None", status: "pending", id: "28bjsj3492n*3@"}, {auctionItem : "Stone", auctionType : "Silent Auction", itemImage: "stone.jpg", auctionDate: "12-Aug-2023", auctionDuration: "5days", startingBid: "None", status: "pending", id: "28bjsj92n*3@!@" }, {auctionItem : "Stone", auctionType : "Silent Auction", itemImage: "stone.jpg", auctionDate: "12-Aug-2023", auctionDuration: "5days", startingBid: "None", status: "pending", id: "28bjsj92342134n*3@"}]
    return (
    <div>
    <h1> Seyi's Big Shoe Auctions </h1>
    
    <div>

        {auctions.map(auction => <AuctionComponent auctionItem={auction.auctionItem} auctionDate={auction.auctionDate} auctionDuration={auction.auctionDuration} auctionType={auction.auctionType} itemImage={auction.itemImage} startingBid={auction.startingBid} status={auction.status} key={auction.id}/>)}

    </div>
        
    </div>
    
    );
   };
   
   export default Market;