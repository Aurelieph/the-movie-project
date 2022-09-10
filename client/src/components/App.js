import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Friends from "./userAccount/Friends";
import { GlobalContext } from "./GlobalContext";
import Homepage from "./Homepage";
import MyAccount from "./userAccount/MyAccount";
import Profile from "./userAccount/Profile";
import Signin from "./userAccount/Signin";
import Signout from "./userAccount/Signout";

function App() {
  const { currentUser,setCurrentUser } = useContext(GlobalContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/signout" element={<Signout />} />
        <Route exact path="/account" element={<MyAccount />} />
        <Route exact path="/friends" element={<Friends />} />
        <Route exact path="/profile/:id"
        element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
