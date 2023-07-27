import { useState } from "react";
import { useNavigate } from 'react-router-dom';


import './signup.css'

const Signup  = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState(0)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

 
  const createUser = async(firstname, lastname, email, phone, dob, password) => {
    const newUser = {firstname, lastname, email, phone, dob, password}
    let result;
    await fetch(`http://localhost:8080/auction-api/auth/signup`,{
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
            },
            body: JSON.stringify(newUser),
        }).then((x)=>{result =x}).catch((e)=>{result = e})

    return result;
    }
    const onSubmit = async(e) => {      
        if(password == confirmPassword){
            e.preventDefault()
            setIsLoading(true)
            const user = await createUser(firstname, lastname, email, phone, '12-05-2023' ,password)
            if(user.status == 201){
             // NotificationManager.success("Login Successful", "", 1000);
              //Router.push('/');

              console.log('Auctioneer Registered!')
              navigate('/')
            }
            else{
              setIsLoading(false)
              //NotificationManager.error("An Error Occured, please try again", "", 1000);
            }
        }
        else{
          e.preventDefault()
          setIsLoading(false)
          //NotificationManager.warning("Passwords do not Match", "", 900);      
        }
        
    }

    const onChangePassword = async(e) => {
        setConfirmPassword(e.target.value)
    
      }

    return (
      <div className="signup-container">
        <h1>YourAuction</h1>
        
        <h2>SignUp</h2>
        
        <form onSubmit={onSubmit}>
          
          <label>FirstName</label>
          <input type="text" className="input-field" onChange={(e) => setFirstname(e.target.value)} /><br/>
          
          <label>LastName</label>
          <input type="text" className="input-field" required onChange={(e) => setLastname(e.target.value)} /><br/>
          
          <label>Email</label>
          <input type="email" className="input-field" required onChange={(e) => setEmail(e.target.value)} /><br/>
          
          <label>Phone</label>
          <input type="number" className="input-field" onChange={(e) => setPhone(Number(e.target.value))} /><br/>
          
          <label>Password</label>
          <input type="password" className="input-field" onChange={(e) => setPassword(e.target.value)} /><br/>
          
          <label>Confirm Password</label>
          <input type="password" className="input-field" onChange={(e) => onChangePassword(e)} /><br/>
          
          <button type="submit" className="submit-button">Sign Up</button>
        </form>
      </div>

        
    );
   };
   
export default Signup;