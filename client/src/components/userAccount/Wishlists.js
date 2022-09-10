import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { GlobalContext } from "../GlobalContext";
import Wishlist from "./Wishlist";

const Whishlists = ({setShowDialog,selectedPopupItem,setSelectedPopupItem,userInfo}) => {
  const { currentUser, update, setUpdate } = useContext(GlobalContext);
  const [message, setMessage] = useState(null);
  const [currentWatchListName, setCurrentWatchListName] = useState(null);
  const [updateLocal,setUpdateLocal]= useState(false)

  useEffect(()=>{
    if(userInfo?.watchlists){
      setCurrentWatchListName(userInfo?.watchlists[0]?.name)
// if(!currentWatchListName){
//   setCurrentWatchListName(userInfo?.watchlists[0]?.name)
  
// }
}
  },[userInfo,currentUser])


  const handleSelection = async (e) => {
    e.preventDefault();
    setCurrentWatchListName(e.target.value)
  }
  const handleCreation = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target.watchlist.value,
      myId: userInfo._id,
    };
    await fetch("/new-watchlist", {
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
        // setUpdateLocal(!updateLocal)
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleCreation}>
        <label>
          Create a watchlist
          <input type="text" placeholder="Watchlist name" name="watchlist" />
        </label>
        <input type="submit" />
      </form>
      {userInfo?.watchlists &&
      <List>
        <form onChange={handleSelection}>
          <label htmlFor="watchlist">Select:</label>
          <select id="watchlist" name="watchlist">
            {userInfo?.watchlists?.map((el) => {
              return (

                  <option key={`name-${el.name}`} value={el.name} >{el.name} </option>

              )
            })}
          </select>
        </form>
            <Wishlist
              key={`wishlist-${userInfo?._id}-${currentWatchListName}`}
              userInfo={userInfo}
              watchlistName={currentWatchListName}
              message={message}
              setMessage={setMessage}
              setShowDialog={setShowDialog}
              selectedPopupItem={selectedPopupItem}
              setSelectedPopupItem={setSelectedPopupItem}
            />
      </List>
}
      {message && <div>{message}</div>}
    </div>
  );
};

export default Whishlists;

const List = styled.div``;
