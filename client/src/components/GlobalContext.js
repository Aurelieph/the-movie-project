import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [movieGenreList, setMovieGenreList] = useState([]);
  const [movieTvList, setTvGenreList] = useState([]);
  const [currentUser,setCurrentUser] =useState(null)
  const { user, isAuthenticated, isLoading } = useAuth0();


  
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

  useEffect(()=>{
    if(user){
      console.log("user.sub",user.sub)
      fetch(`/user/${user.sub}`)
      // fetch(`/user/${encodeURI(user.sub)}`)
      .then((res) => res.json())
      .then((json) => {
        setCurrentUser(json.data);
      })
      .catch((err) => {
        console.log(err);
      });

    }
  },[user])
  return <GlobalContext.Provider value={{currentUser,setCurrentUser}}>{children}</GlobalContext.Provider>;
};
