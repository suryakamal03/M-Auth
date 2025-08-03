import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './login.css'
function Login(){
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');
  const [showPassword,setShowPassword] = useState(false);
async function login(e) { // <-- Accept the event 'e'
  e.preventDefault(); // <-- Stop the page from reloading

  try {
    const response = await fetch('https://m-auth.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Corrected 'content-type'
      },
      // This is the corrected body
      body: JSON.stringify({ email: email, password: password })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Login successful!');
      console.log('Received Token:', data.token);
      // IMPORTANT: Save the token to remember the user is logged in
      localStorage.setItem('userToken', data.token);
      // Here you would redirect to the main app page
    } else {
      // Show the error message from the server (e.g., "Invalid email or password")
      alert(data.message);
    }
  } catch (error) {
    console.error("Login request failed:", error);
    alert("An error occurred during login.");
  }
}
  return(
    <form onSubmit={login}>
        <p>Continue your journey</p>
        <h3>Login to XXXXXX</h3>
        <label>Email</label>
        <input type="text" placeholder="exmaple@gmail.com" value={email} onChange={(e)=> setemail(e.target.value)} />
        <label>Password</label>
        <input type={showPassword?'text':'password'} placeholder="Enter your password" value={password} onChange={(e)=> setpassword(e.target.value)}/>
        <input type="checkbox"  onChange={() => setShowPassword(!showPassword)} /><label>Show password</label>
        <button>Login</button>
        <label >New User<Link to="/">Create an account</Link></label>
    </form>
  )
}
export default Login  