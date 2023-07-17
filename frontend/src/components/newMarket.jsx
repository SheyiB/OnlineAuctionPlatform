import { useState } from "react"

const apiUrl = import.meta.env.VITE_APP_API_URL;

const NewMarket = ({id}) => {
    
    const [name, setName] = useState()
    const [image, setImage] = useState()
    const [details, setDetails] = useState()
    
    const createMarket = async(e) => {

        let market = {name, image, details, owner: id}
        await fetch(`${apiUrl}/market/`,{
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
            },
            body: JSON.stringify(market),
        })

        

    }

    return (
        <div>
            <form onSubmit={createMarket}>
                <label> Name </label>
                <input type="text" onChange={(e) => setName(e.target.value)}/><br/>

                <label> Image </label>
                <input type="file" onChange={(e) => setImage(e.target.value)}/><br/>

                <label> Details </label>
                <input type="text" onChange={(e) => setDetails(e.target.value)}/><br/>

                <button type="submit" > Create </button>
            </form>
        </div>
    )
}

export default NewMarket