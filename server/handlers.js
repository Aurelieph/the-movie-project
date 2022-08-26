const tmdbKey = "2f1690ffc497ca72ea549460bdb184cf"

const { MongoClient } = require("mongodb");
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
    const isUser = await db.collection("users").findOne({ id: data.id });
    if (!isUser) {
      const newUser = await db.collection("users").insertOne(data);
      return res
        .status(200)
        .json({ status: 200, message: "user added", data: newUser });
    } else {
      const updateUser = await db.collection("users").updateOne({ id: data.id },{$set:data});
      return res
      .status(200)
      .json({ status: 200, message: "user updated", data: updateUser });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Something went wrong" });
  }
};

module.exports ={signUp}