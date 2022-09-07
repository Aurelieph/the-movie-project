import { useContext, useState } from "react";
import { GlobalContext } from "./GlobalContext";

const WatchListsModule = ({selectedPopupItem}) => {
  const { currentUser, setCurrentUser, update, setUpdate } =
    useContext(GlobalContext);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedPopupItem);
    const data = {
      name: e.target.watchlist.value,
      myId: currentUser._id,
      movieId:selectedPopupItem.id
    };
    await fetch("/add-to-watchlist", {
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
        // setUpdate(!update)
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label for="watchlist">Add to:</label>
        <select id="watchlist" name="watchlist">
          {currentUser?.watchlists?.map((whatchlist) => {
            return <option value={whatchlist.name}>{whatchlist.name}</option>;
          })}
        </select>
        <input type="submit" />
      </form>
    </div>
  );
};

export default WatchListsModule;
