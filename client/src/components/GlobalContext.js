import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [movieGenreList, setMovieGenreList] = useState([]);
  const [movieTvList, setTvGenreList] = useState([]);
  const [currentUser,setCurrentUser] =useState(null)
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [update,setUpdate]=useState(false)


  
  useEffect(() => {
    // fetch(
    //   "https://api.themoviedb.org/3/genre/tv/list?api_key=2f1690ffc497ca72ea549460bdb184cf"
    // )
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setMovieGenreList(json);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // fetch(
    //   "https://api.themoviedb.org/3/genre/movie/list?api_key=2f1690ffc497ca72ea549460bdb184cf"
    // )
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setTvGenreList(json);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

      
  }, []);

  useEffect(()=>{
    if(user){
      console.log("user.sub",user.sub)
      fetch(`/user/${user.sub}`)
      .then((res) => res.json())
      .then((json) => {
        console.log("json.data",json.data)
        if(json.status===200){
          setCurrentUser(json.data);
          console.log(json.message)
        }
        else{console.log(json.message)}
      })
      .catch((err) => {
        console.log(err);
      });

    }
  },[user,update])
  return <GlobalContext.Provider value={{currentUser,setCurrentUser,setUpdate,update}}>{children}</GlobalContext.Provider>;
};
