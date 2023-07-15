import { useState } from "react";

const Signup  = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState(0)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [date, setDate] = useState('')
    const [isLoading, setIsLoading] = useState(false)
 
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
        <div>
        <h1>YourAuction</h1>
        <h2>SignUp</h2>

        
        <form onSubmit={onSubmit}>
            <label>FirstName</label>
            <input type="text" onChange={(e) => setFirstname(e.target.value)}  /><br/>
            
            <label>LastName</label>
            <input type="text"  required onChange={(e) => setLastname(e.target.value)} /><br/>
            
            <label>Email</label>
            <input type="email" required onChange={(e) => setEmail(e.target.value)} /><br/>
            
            <label>Phone</label>
            <input type="number" onChange={(e) => setPhone(Number(e.target.value))}/><br/>

            <label>Date Of Birth</label>
            <input placeholder="Date of Birth" type="date" onFocus={(e) => e.target.type='date'}   required onChange={(e) => setDate(e.target.value)} />
            

            <label>Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)}/><br/>
            
            <label>Confirm Password</label>
            <input type="password" onChange={(e) => onChangePassword(e)} /><br/>
            
            <button type="submit"> Login</button>
            
        </form>
        </div>
        
    );
   };
   
export default Signup;