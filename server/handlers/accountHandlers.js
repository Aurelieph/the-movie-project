const tmdbKey = "2f1690ffc497ca72ea549460bdb184cf";

const { MongoClient, ObjectId, ReadConcern } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);
const signUp = async (req, res) => {
  const data = req.body;
  const dataUpdate={
    ...data,
    watchlists:[{name:"Recommendations",list:[]}]
  }
  console.log("dataUpdate",dataUpdate)
  try {
    await client.connect();
    const db = client.db("what2watch");
    const isUser = await db.collection("users").findOne({ token: dataUpdate.token });
    if (!isUser) {
      const newUser = await db.collection("users").insertOne(dataUpdate);
      const addedUser = await db
        .collection("users")
        .findOne({ token: dataUpdate.token });
      return res
        .status(201)
        .json({ status: 201, message: "user added", dataUpdate: addedUser });
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





module.exports = {
  signUp,
  getUser,
  getUserByID,
};
