import { useState } from "react"

import './newAuction.css'; 
const apiUrl = import.meta.env.VITE_APP_API_URL;

const NewAuction = ({marketId}) => {
    
    const [item, setItem] = useState()
    const [auctionType, setAuctionType] = useState("english")
    const [category, setCategory] = useState()
    const [image, setImage] = useState()
    const [details, setDetails] = useState()
    const [date, setDate] = useState()
    const [startingPrice, setStartingPrice] = useState()
    const [duration, setDuration] = useState()

    // Helper function to format the date for the local time zone
    const formatLocalDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const localDateTimeString = date.toLocaleString('en-GB', {
        timeZone: 'UTC', // Specify the input date is in UTC format
        hour12: false, // Use 24-hour format
        });
        return localDateTimeString;
    };

  

    const createAuction = async(e) => {
        
        const dateString = date;
        const originalDate = new Date(dateString);
        const newDate = new Date(originalDate);
        newDate.setHours(newDate.getHours() + 1);
        const updatedDate = newDate.toISOString()

        let auction = {auctionType, item, category, image, details, date: updatedDate, startingPrice, duration, market: marketId}
        console.log(auction)
        await fetch(`${apiUrl}/auction/`,{
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
            },
            body: JSON.stringify(auction),
        })
    }

       return (
        <div className="auction-form-container-min">
            <form onSubmit={createAuction}>
                <label> Item Name </label><br/>
                <input type="text" onChange={(e) => setItem(e.target.value)}/><br/>

                <label> Details </label><br/>
                <input type="text" onChange={(e) => setDetails(e.target.value)}/><br/>
            
                <label>Select Auction Type</label> <br/>
                <select value={auctionType} onChange={(e)=>{setAuctionType(e.target.value)}}>
                    <option value="english">English</option>
                    <option value="dutch">Dutch</option>
                    <option value="silent bid">Silent Bid</option>
                    <option value="vickery">Vickery</option>
                    <option value="free-penny">Free Penny</option>
                </select><br/>


                <label> Image </label><br/>
                <input type="file" onChange={(e) => setImage(e.target.value)}/><br/>


                <label> Category </label><br/>
                <input type="text" onChange={(e) => setCategory(e.target.value)}/><br/>

                <label> Date </label><br/>
                <input type="datetime-local" onChange={(e) => setDate(e.target.value)} /><br/>

                <label> Starting/Bid Increment Price </label>
                <input type="number" onChange={(e) => setStartingPrice(e.target.value)}/><br/>

                <label> Duration  (in hours)</label><br/>
                <input type="number" onChange={(e) => setDuration(e.target.value)}/><br/>

                <button type="submit" > Create </button>
            </form>
        </div>
    )
}

export default NewAuction