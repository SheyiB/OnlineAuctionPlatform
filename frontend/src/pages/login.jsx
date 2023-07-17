import { useState } from "react";
import { Link , useNavigate } from 'react-router-dom';
import {verify} from 'jsonwebtoken-esm'

const apiUrl = import.meta.env.VITE_APP_API_URL;
const apiKey = import.meta.env.VITE_APP_API_KEY;


const Login  = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auctioneer = {email, password}
        try {
          const response = await fetch(`${apiUrl}/auth/login`,{
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
            },
            body: JSON.stringify(auctioneer),
        })
        .then(d => d.json())
        
        .catch((e)=>{console.log(e)})

        const decoded = verify(response.token, apiKey);


        localStorage.setItem("auctioneerdata", response.auctioneer)
        console.log('Auctioneer Logged In')
        navigate('/dashboard')
      } catch (error) {
        
          console.error(error);
        }
      };
      

    
    return (
    <div>
    <h1>YourAuction</h1>
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} /><br/>
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} /><br/>
        <button type="submit"> Login</button>
        
    </form>
    </div>
    

    );
   };
   
export default Login;