const express = require("express");
const morgan = require("morgan");
const {
  signUp,
  getUser,
  getUserByID,
} = require("./handlers/accountHandlers");
const { sendFriendRequest, handleFriendRequest } = require("./handlers/friendsHandlers");
const {
  addToWatchList,
  createNewWatchlist,
  deleteWatchList,
  removeFromWatchList,
  sendRecommendation,
} = require("./handlers/listsHandlers");
require("dotenv").config();

express()
  .use(morgan("tiny"))
  .use(express.json())
  .get("/fetch", function (req, res) {
    res.status(200).json({ message: "Hello World" });
  })
  .get("/user/:token", getUser)
  .get("/user-id/:id", getUserByID)
  .post("/signup", signUp)
  .patch("/send-request", sendFriendRequest)
  .patch("/new-watchlist", createNewWatchlist)
  .patch("/delete-watchlist", deleteWatchList)
  .patch("/add-to-watchlist", addToWatchList)
  .patch("/remove-from-watchlist", removeFromWatchList)
  .patch("/update-friend-request", handleFriendRequest)
  .patch("/send-recommendation", sendRecommendation)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(8000, () => console.log(`Listening on port 8000`));
