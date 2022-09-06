const tmdbKey = "2f1690ffc497ca72ea549460bdb184cf";

const { MongoClient, ObjectId, ReadConcern } = require("mongodb");
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
    return res.status(500).json({ status: 500, message: error });
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



const createNewWatchlist = async (req, res) => {
  const data = req.body;
  try {
    await client.connect();
    const db = client.db("what2watch");
    const check = await db.collection("users").findOne({
      _id: ObjectId(data.myId),
      watchlists: { $elemMatch: { name: data.name } },
    });

    if (check) {
      return res
        .status(202)
        .json({ status: 202, message: "watchlist name already exists" });
    } else {
      await db.collection("users").updateOne(
        { _id: ObjectId(data.myId) },
        {
          $push: {
            watchlists: { name: data.name, list: [] },
          },
        }
      );
      return res.status(200).json({
        status: 200,
        message: `watchlist '${data.name}' has been successfully created`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
};

const deleteWatchList = async (req, res) => {
  const data = req.body;
  try {
    await client.connect();
    const db = await client.db("what2watch");
    const statusDeleteWatchList = await db
      .collection("users")
      .updateOne(
        { _id: ObjectId(data.myId) },
        { $pull: { watchlists: { name: data.name } } },
      );
    return res.status(200).json({
      status: 200,
      message: "Successfully deleted",
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
};

module.exports = {
  signUp,
  getUser,
  getUserByID,
  createNewWatchlist,
  deleteWatchList,
};
