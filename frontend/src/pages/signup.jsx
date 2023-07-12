const Signup  = () => {
    return (
        <div>
        <h1>YourAuction</h1>
        <h2>SignUp</h2>
        <form>
            <label>FirstName</label>
            <input type="text" /><br/>
            
            <label>LastName</label>
            <input type="text" /><br/>
            
            <label>Email</label>
            <input type="email" /><br/>
            
            <label>Phone</label>
            <input type="number" /><br/>

            <label>Password</label>
            <input type="password" /><br/>
            
            <label>Confirm Password</label>
            <input type="password" /><br/>
            
            <button type="submit"> Login</button>
            
        </form>
        </div>
        
    );
   };
   
export default Signup;