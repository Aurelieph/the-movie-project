const tmdbKey = "2f1690ffc497ca72ea549460bdb184cf";

const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);
// https://api.themoviedb.org/3/movie/76341?api_key=<<api_key>>
// https://api.themoviedb.org/3/movie/550?api_key=2f1690ffc497ca72ea549460bdb184cf

// curl --request GET \
//   --url 'https://api.themoviedb.org/3/movie/76341' \
//   --header 'Authorization: Bearer <<access_token>>' \
//   --header 'Content-Type: application/json;charset=utf-8'
// https://api.themoviedb.org/3/movie/550?api_key=2f1690ffc497ca72ea549460bdb184cf

// const getMovieGenreList = async (req, res)=>{
//   // try {
//   //   const response = await fetch("https//https://api.themoviedb.org/3/genre/tv/list?api_key=2f1690ffc497ca72ea549460bdb184cf")
//   //   return res.status(201).json({
//   //     status: 200,

//   //   });
//   // } catch (err) {
//   //   console.log(err);
//   //   res.status(500).json({ status: 500, message: "something went wrong" });
//   // }
// }

const signUp = async (req, res) => {
  const data = req.body;
  try {
    await client.connect();
    const db = client.db("what2watch");
    const isUser = await db.collection("users").findOne({ token: data.token });
    if (!isUser) {
      const newUser = await db.collection("users").insertOne(data);
      const addedUser = await db
        .collection("users")
        .findOne({ token: data.token });
      return res
        .status(201)
        .json({ status: 201, message: "user added", data: addedUser });
    } else {
      const updateUser = await db
        .collection("users")
        .updateOne({ token: data.token }, { $set: data });
      const updatedUser = await db
        .collection("users")
        .findOne({ token: data.token });
      return res
        .status(200)
        .json({ status: 200, message: "user updated", data: updatedUser });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
};
const getUser = async (req, res) => {
  const token = req.params.token;
  try {
    await client.connect();
    const db = client.db("what2watch");
    const isUser = await db.collection("users").findOne({ token: token });
    if (isUser) {
      return res
        .status(200)
        .json({ status: 200, message: "user found", data: isUser });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "the user was not found", data: token });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
};
const getUserByID = async (req, res) => {
  const id = req.params.id;
  try {
    await client.connect();
    const db = client.db("what2watch");
    const isUser = await db.collection("users").findOne({ _id: ObjectId(id) });
    if (isUser) {
      return res
        .status(200)
        .json({ status: 200, message: "user found", data: isUser });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "the user was not found", data: id });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong" });
  }
};

const sendFriendRequest = async (req, res) => {
  const data = req.body;
  // console.log("data.myId", data.myId);
  const today = new Date();
  try {
    await client.connect();
    const db = client.db("what2watch");

    const friend = await db
      .collection("users")
      .findOne({ _id: ObjectId(data.friend_id) });
    const currentUser = await db
      .collection("users")
      .findOne({ _id: ObjectId(data.myId) });
// console.log(currentUser)
    if (friend && currentUser) {
        requestAlreadyReceived = await friend.friendRequestReceived?.some((el) => {
          console.log("test")
          if (el.id === data.myId) {
            return true;
          }
          return false;
        });

      console.log("requestAlreadyReceived",requestAlreadyReceived)
      if (!requestAlreadyReceived) {
        const updateFriend = await db.collection("users").updateOne(
          { _id: ObjectId(data.friend_id) },
          {
            $addToSet: {
              friendRequestReceived: { id: data.myId, date: today },
            },
          }
          );
          console.log("updateFriend",updateFriend)
        const updateCurrentUser = await db.collection("users").updateOne(
          { _id: ObjectId(data.myId) },
          {
            $addToSet: {
              friendRequestSent: { id: data.friend_id, date: today },
            },
          }
        );
        return res.status(200).json({ status: 200, message: "request sent" });
      } else {
        return res
          .status(200)
          .json({ status: 202, message: "request already sent" });
      }
    } else {
      return res
        .status(404)
        .json({
          status: 404,
          message: "the user was not found",
          body: currentUser,
        });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
};
const handleFriendRequest = async (req, res) => {};

module.exports = {
  signUp,
  getUser,
  getUserByID,
  sendFriendRequest,
  handleFriendRequest,
};
