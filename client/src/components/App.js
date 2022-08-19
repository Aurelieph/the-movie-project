import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Profile from "./Profile";
import Signin from "./Signin";

function App() {
  // const [message, setMessage] = useState("no")
  // useEffect(()=>{
  //   fetch("/fetch").then(res=>res.json()).then(data => setMessage(data.message)).catch(e=>console.log("error"))
  // })
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
