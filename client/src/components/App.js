import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";
import Homepage from "./Homepage";
import MyAccount from "./MyAccount";
import Profile from "./Profile";
import Signin from "./Signin";
import Signout from "./Signout";

function App() {
  const { currentUser,setCurrentUser } = useContext(GlobalContext);
  // const [message, setMessage] = useState("no")
  // useEffect(()=>{
  //   fetch("/fetch").then(res=>res.json()).then(data => setMessage(data.message)).catch(e=>console.log("error"))
  // })
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signout" element={<Signout />} />
        <Route path="/account" element={<MyAccount />} />
        <Route path="/profile/:id"
        element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
