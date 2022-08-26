const express = require("express");
const morgan = require("morgan");
const {signUp} = require("./handlers");
// user-546872
require("dotenv").config();

// const { auth } = require("express-openid-connect");
// require("dotenv").config();
// const { SECRET_AUTH } = process.env;

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: SECRET_AUTH,
//   baseURL: "http://localhost:3000",
//   clientID: "SuGYBIi8MIJZgS7xnscmzdPeisWeiB5v",
//   issuerBaseURL: "https://dev-l9wkf058.us.auth0.com",
// };

express()
  .use(morgan("tiny"))
  .use(express.json())
  .get("/fetch", function (req, res) {
    res.status(200).json({ message: "Hello World" });
  })
  .post("/signup",signUp)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(8000, () => console.log(`Listening on port 8000`));
