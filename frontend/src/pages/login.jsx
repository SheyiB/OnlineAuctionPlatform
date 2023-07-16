import { useState } from "react";
import { Link , useNavigate } from 'react-router-dom';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

dotenv.config();

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;


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
         
        const decoded = jwt.verify(response.token, apiKey.toString('utf-8'))
        let auctioneerdata = await fetch(`${apiUrl}/market/${decoded.id}`).then(d=> d.json())
        auctioneerdatadata.password = ''
        localStorage.setItem("auctioneer", auctioneerdata)
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