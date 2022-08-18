import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";

function App() {
  // const [message, setMessage] = useState("no")
  // useEffect(()=>{
  //   fetch("/fetch").then(res=>res.json()).then(data => setMessage(data.message)).catch(e=>console.log("error"))
  // })
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
