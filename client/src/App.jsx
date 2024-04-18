<<<<<<< HEAD

// import Loginsign from './Components/Loginsign';
// import Belowbx from './Components/Belowbx'
// import Card from './Components/Card';

import Profile from './Components/Profile';
// import UserProfileCard from './Components/UserProfileCard'
=======
import React from 'react';
import Loginsign from './Components/Loginsign';
import Belowbx from './Components/Belowbx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cart from './Components/Cart';
import Button from './Components/Button';
>>>>>>> 2793dede1c8576ab110cb191668b8a6fed954006
function App() {
  return (
<<<<<<< HEAD
     <div>
       {/* <Card/>
      <Loginsign/> */}
      {/* <Belowbx/> */}
      {/* <UserProfileCard/> */}
      <Profile/>

     </div>
=======
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Belowbx />} />
        <Route path="/cart" element={<Cart button={<Button />}/>} />
        <Route path="/signup" element={<Loginsign />} />
      </Routes>
    </BrowserRouter>
>>>>>>> 2793dede1c8576ab110cb191668b8a6fed954006
  )
}

export default App;
