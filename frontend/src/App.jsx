
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './Auth.jsx';   // Your signup page
import Login from './login.jsx'; // Your login page

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} /> 
      <Route path="/Login" element={<Login />} />
    </Routes>
  );
}

export default App;