const express = require("express");
const morgan = require("morgan");
const { getMovieGenreList } = require("./handlers");

express()
  .use(morgan("tiny"))
  .use(express.json())
  .get("/fetch", function (req, res) {
    res.status(200).json({ message: "Hello World" });
  })
  // .get("/genre-movie-list", getMovieGenreList)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(8000, () => console.log(`Listening on port 8000`));
