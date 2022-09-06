import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";

const Wishlist = ({ watchlist, message, setMessage }) => {
  const { currentUser, update, setUpdate } = useContext(GlobalContext);

  const handleDeleteWatchList = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    const data = {
      name: e.target.name,
      myId: currentUser._id
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
      {watchlist.name}
      <button onClick={handleDeleteWatchList} name={watchlist.name}>
        x
      </button>
    </div>
  );
};

export default Wishlist;
