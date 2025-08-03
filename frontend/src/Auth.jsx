import React,{useState} from "react";
import { Link } from 'react-router-dom';
import './Auth.css';
function Auth(){
  const [username,setusername] = useState('');
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  async function signup(e){
    try{
    e.preventDefault();
    if (username.trim().length > 0 && email.trim().length > 0 && password.trim().length > 0){
      const response = await fetch('https://m-auth.onrender.com/api/auth/register',{
        method:'POST',
        headers:{
        'content-type' : 'application/json'
        },
        body: JSON.stringify({username:username,email:email,password:password})
      })
      const data = await response.json(); 
      if (response.ok) { 
  alert('Signup successful!');
  setusername(''); 
  setpassword('');
  setemail('');
} else {
  alert(data.message); 
}
    }
  }catch(err){
    console.log(err);
  }
  }
 return(
  <form onSubmit={signup}>
    <p>Start your journey</p>
    <h3>Sign Up to XXXXX</h3>
    <label>User Name</label>
    <input type="text" placeholder="UserName" value={username} onChange={(e)=> setusername(e.target.value)} />
    <label>Email</label>
    <input type="text" placeholder="example@email.com" value={email}  onChange={(e)=> setemail(e.target.value)} />
    <label>Password</label>
     <input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) =>setpassword(e.target.value)}/>
      <input type="checkbox" onChange={() => setShowPassword(!showPassword)} />
      <label>Show Password</label>
    <button >Sign Up</button>
    <label>Have an account? <Link to="/Login">Sign In</Link></label>
  </form>
 )
}
export default Auth