import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
import App from "./components/App";
import { GlobalProvider } from "./components/GlobalContext";
import GlobalStyles from "./GlobalStyles";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Auth0Provider
    domain="what2watch.us.auth0.com"
    clientId="DDPI68uXElQd5iJohJk1GVVExvlrHsVP"
    // redirectUri="http://localhost:3000/"
    redirectUri={window.location.origin}
  >
    <GlobalProvider>
      <GlobalStyles />
      <App />
    </GlobalProvider>
  </Auth0Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
