import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import Thumbnails from "../Movies/Thumbnails";

const Wishlist = ({ watchlistName, message, setMessage ,setShowDialog,selectedPopupItem,setSelectedPopupItem}) => {
  const { currentUser, update, setUpdate } = useContext(GlobalContext);
  const [watchList, setWatchlist] = useState([]);
  const [editMode, setEditMode] =useState(false)


  useEffect(()=>{
    setMessage(null)
  },[])
  useEffect(() => {
    setWatchlist([])

    const simpleList = currentUser?.watchlists?.find((el) => {
      return el.name === watchlistName;
    });
    simpleList?.list.map((el) => {
      fetch(
        `https://api.themoviedb.org/3/${el.media_type}/${el.id}?api_key=2f1690ffc497ca72ea549460bdb184cf`
      )
        .then((res) => res.json())
        .then((json) => {
          json.media_type=el.media_type
          setWatchlist((watchList) => [...watchList, json]);
        });
    });
  }, [currentUser]);


  const handleDeleteWatchList = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    const data = {
      name: e.target.name,
      myId: currentUser._id,
    };
    await fetch("/delete-watchlist", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        setMessage(json.message);
        setUpdate(!update);
      })
      .catch((err) => console.log(err));
  };

  const toggleEditMode = (e)=>{
    e.preventDefault()
    setEditMode(!editMode)
  }
  const handleDeleteFromWatchlist = async (movieId) => {
    // e.preventDefault();
    console.log("delete");
    const data = {
      myId: currentUser._id,
      name:watchlistName,
      movieId:movieId,
    }
    await fetch("/remove-from-watchlist", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        setUpdate(!update);
        setMessage(json.message)
      })
      .catch((err) => console.log(err));

  };
  return (
    <div>
      {watchlistName}
      {editMode&&<button onClick={handleDeleteWatchList} name={watchlistName}>
        x
      </button>}
      <button onClick={toggleEditMode}>{editMode?"done":"edit"}</button>
      <Thumbnails
        moviesArray={watchList}
        selectedPopupItem={selectedPopupItem}
        setSelectedPopupItem={setSelectedPopupItem}
        setShowDialog={setShowDialog}
        editMode={editMode}
        handleDeleteFromWatchlist={handleDeleteFromWatchlist}
      />
    </div>
  );
};

export default Wishlist;
