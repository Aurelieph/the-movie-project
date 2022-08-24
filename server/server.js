const express = require("express");
const morgan = require("morgan");
const { getMovieGenreList } = require("./handlers");
// user-546872
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
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
  // // auth router attaches /login, /logout, and /callback routes to the baseURL
  // .use(auth(config))
  .get("/fetch", function (req, res) {
    res.status(200).json({ message: "Hello World" });
  })
  // .get("/genre-movie-list", getMovieGenreList)

  // // req.isAuthenticated is provided from the auth router
  // .get("/", (req, res) => {
  //   res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
  // })
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(8000, () => console.log(`Listening on port 8000`));
