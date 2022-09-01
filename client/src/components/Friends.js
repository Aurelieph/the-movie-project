import { useContext, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import Header from "./Header";

const Friends = () => {
  const { currentUser, setCurrentUser } = useContext(GlobalContext);
  const [message, setMessage] = useState(null);
  const handleSendRequest = async (e) => {
    e.preventDefault();
    const { friendId } = e.target.elements;
    const data = {
      friend_id: friendId.value,
      myId: currentUser._id,
    };
    console.log(data);
    await fetch(
      "/send-request",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
      )
      .then((res) => res.json())
      .then((json) => {
        setMessage(json.message);
      })
      .catch((err) => console.log(err))
  };
  return (
    <div>
      <Header />

      <form onSubmit={handleSendRequest}>
        <p>Enter your friend's ID:</p>

        <input type="text" name="friendId" />
        <input type="submit" />
      </form>
      <div>{message}</div>
    </div>
  );
};

export default Friends;
