

// import Loginsign from './Components/Loginsign';
// import Belowbx from './Components/Belowbx'
// import Card from './Components/Card';

import Profile from './Components/Profile';
// import UserProfileCard from './Components/UserProfileCard'
import React from 'react';
import Loginsign from './Components/Loginsign';
import Belowbx from './Components/Belowbx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cart from './Components/Cart';
import Button from './Components/Button';
import AdminComponent from './Components/AdminComponent';
import Home from './Components/home/Home';
import Auth from './Components/Auth';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home/:id" element={<Belowbx />} />
        <Route path="/admin" element={<Auth><AdminComponent /></Auth>} />
        {/* <Route path="/cart" element={<Cart button={<Button />}/>} /> */}
        {/* <Route path="/signup" element={<Register />} /> */}
        {/* <Route path="/signup" element={<Loginsign />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
      </BrowserRouter>
  )
}

export default App;
