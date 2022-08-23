const tmdbKey = "2f1690ffc497ca72ea549460bdb184cf"

// https://api.themoviedb.org/3/movie/76341?api_key=<<api_key>>
// https://api.themoviedb.org/3/movie/550?api_key=2f1690ffc497ca72ea549460bdb184cf

// curl --request GET \
//   --url 'https://api.themoviedb.org/3/movie/76341' \
//   --header 'Authorization: Bearer <<access_token>>' \
//   --header 'Content-Type: application/json;charset=utf-8'
// https://api.themoviedb.org/3/movie/550?api_key=2f1690ffc497ca72ea549460bdb184cf


const getMovieGenreList = async (req, res)=>{
  // try {
  //   const response = await fetch("https//https://api.themoviedb.org/3/genre/tv/list?api_key=2f1690ffc497ca72ea549460bdb184cf")
  //   return res.status(201).json({
  //     status: 200,

  //   });
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json({ status: 500, message: "something went wrong" });
  // }
}

module.exports ={getMovieGenreList}