const { MongoClient, ObjectId, ReadConcern } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);

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
const addToWatchList = async (req, res)=>{
  const data = req.body;
  try {
    await client.connect();
    const db = client.db("what2watch");
      await db.collection("users").updateOne(
        { _id: ObjectId(data.myId) ,watchlists: { $elemMatch: { name: data.name }}},
        {
          $addToSet: {
            "watchlists.$.list":{id:data.movieId,media_type:data.media_type}
          },
        }
      );
      return res.status(200).json({
        status: 200,
        message: `movie was sucessfully added to your watchlist`,
      });
    // }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
}
const removeFromWatchList = async (req, res)=>{
  const data = req.body;
  try {
    await client.connect();
    const db = client.db("what2watch");
      const update = await db.collection("users").updateOne(
        { _id: ObjectId(data.myId) ,watchlists: { $elemMatch: { name: data.name }}},
        {
          $pull: {
            // "watchlists.$.list":{id:data.movieId,media_type:data.media_type}
            "watchlists.$.list":{id:data.movieId}
          },
        }
      );
      if(update.modifiedCount===0){
        return res.status(200).json({
          status: 200,
          message: `movie not removed from watchlist`,
        });

      }
      return res.status(200).json({
        status: 200,
        message: `movie was sucessfully removed from the watchlist`,
      });
    // }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
}

// const getElById = async (req, res)=>{

// }

module.exports = {
  addToWatchList,
  deleteWatchList,
  createNewWatchlist,
  removeFromWatchList
};
