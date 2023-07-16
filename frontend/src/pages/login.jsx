import { useState } from "react";

const Login  = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    return (
    <div>
    <h1>YourAuction</h1>
    <h2>Login</h2>
    <form>
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