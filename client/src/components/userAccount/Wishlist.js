import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { GlobalContext } from "../GlobalContext";
import Thumbnails from "../Movies/Thumbnails";

const Wishlist = ({
  watchlistName,
  setMessage,
  setShowDialog,
  selectedPopupItem,
  setSelectedPopupItem,
  userInfo,
}) => {
  const { currentUser, update, setUpdate } = useContext(GlobalContext);
  const [watchList, setWatchlist] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setMessage(null);
  }, []);

  useEffect(() => {
    setWatchlist([]);
    const simpleList = userInfo?.watchlists?.find((el) => {
      return el.name === watchlistName;
    });
    simpleList?.list.map((el) => {
      fetch(
        `https://api.themoviedb.org/3/${el.media_type}/${el.id}?api_key=2f1690ffc497ca72ea549460bdb184cf`
      )
        .then((res) => res.json())
        .then((json) => {
          json.media_type = el.media_type;
          setWatchlist((watchList) => [...watchList, json]);
        });
    });
  }, [userInfo]);

  const handleDeleteWatchList = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name,
      myId: userInfo._id,
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

  const toggleEditMode = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  };
  const handleDeleteFromWatchlist = async (movieId) => {
    const data = {
      myId: userInfo._id,
      name: watchlistName,
      movieId: movieId,
    };
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
        setMessage(json.message);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Wrapper>
      {watchlistName}
      {editMode && (
        <Button onClick={handleDeleteWatchList} name={watchlistName} hidden={watchlistName==="Recommendations"?true:false}>
          delete watchlist
        </Button>
      )}
      {currentUser?._id === userInfo?._id && (
        <Button onClick={toggleEditMode} >{editMode ? "done" : "edit"}</Button>
      )}
      <Thumbnails
        moviesArray={watchList}
        selectedPopupItem={selectedPopupItem}
        setSelectedPopupItem={setSelectedPopupItem}
        setShowDialog={setShowDialog}
        editMode={editMode}
        handleDeleteFromWatchlist={handleDeleteFromWatchlist}
      />
    </Wrapper>
  );
};

export default Wishlist;

const Button = styled.button`
margin-left:10px;
`
const Wrapper= styled.div`
max-width:100%;
/* background-color:red; */
`
