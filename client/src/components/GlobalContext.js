import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [movieGenreList, setMovieGenreList] = useState([]);
  const [movieTvList, setTvGenreList] = useState([]);
  const [currentUser,setCurrentUser] =useState(null)
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/tv/list?api_key=2f1690ffc497ca72ea549460bdb184cf"
    )
      .then((res) => res.json())
      .then((json) => {
        setMovieGenreList(json);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=2f1690ffc497ca72ea549460bdb184cf"
    )
      .then((res) => res.json())
      .then((json) => {
        setTvGenreList(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <GlobalContext.Provider value={{currentUser,setCurrentUser}}>{children}</GlobalContext.Provider>;
};
