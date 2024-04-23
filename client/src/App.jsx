import React from 'react';
import Loginsign from './Components/Loginsign';
import Belowbx from './Components/Belowbx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cart from './Components/Cart';
import Button from './Components/Button';
import AdminComponent from './Components/AdminComponent';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Belowbx />} /> */}
        <Route path="/" element={<AdminComponent />} />
        <Route path="/cart" element={<Cart button={<Button />}/>} />
        <Route path="/signup" element={<Loginsign />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
