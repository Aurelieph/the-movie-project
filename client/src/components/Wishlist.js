import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import Thumbnails from "./Thumbnails";

const Wishlist = ({ watchlistName, message, setMessage ,setShowDialog,selectedPopupItem,setSelectedPopupItem}) => {
  const { currentUser, update, setUpdate } = useContext(GlobalContext);
  const [watchList, setWatchlist] = useState([]);

  useEffect(() => {
    const simpleList = currentUser?.watchlists?.find((el) => {
      return el.name === watchlistName;
    });
    // console.log(simpleList)
    simpleList?.list.map((el) => {
      fetch(
        `https://api.themoviedb.org/3/${el.media_type}/${el.id}?api_key=2f1690ffc497ca72ea549460bdb184cf`
      )
        .then((res) => res.json())
        .then((json) => {
          setWatchlist((watchList) => [...watchList, json]);
        });
    });
  }, []);

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
      // .then((res) => res)
      .then((json) => {
        setMessage(json.message);
        setUpdate(!update);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {console.log("test")}
      {watchlistName}
      <button onClick={handleDeleteWatchList} name={watchlistName}>
        x
      </button>
      <Thumbnails
        // thumbnailsArray={thumbnailsTop20Tv}
        // setThumbnailsArray={setThumbnailsTop20Tv}
        moviesArray={watchList}
        selectedPopupItem={selectedPopupItem}
        setSelectedPopupItem={setSelectedPopupItem}
        setShowDialog={setShowDialog}
      />
    </div>
  );
};

export default Wishlist;
