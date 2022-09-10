import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import Header from "../Header";

const Friends = () => {
  const { currentUser, setCurrentUser, update, setUpdate } =
    useContext(GlobalContext);
  const [message, setMessage] = useState(null);
  const [sentFriendsReq, setSentFriendsReq] = useState([]);
  const [receivedFriendsReq, setReceivedFriendsReq] = useState([]);

  useEffect(() => {
    setSentFriendsReq([])
    currentUser?.friendRequestSent?.map((el) => {
      fetch(`/user-id/${el.id}`)
        .then((res) => res.json())
        .then((json) => {
          json.data.date = el.date;
          setSentFriendsReq((sentFriendsReq) => [...sentFriendsReq, json.data]);
        });
    });
    setReceivedFriendsReq([])
    currentUser?.friendRequestReceived?.map((el) => {
      fetch(`/user-id/${el.id}`)
        .then((res) => res.json())
        .then((json) => {
          json.data.date = el.date;
          setReceivedFriendsReq((receivedFriendsReq) => [...receivedFriendsReq, json.data]);
        });
    });
  }, [currentUser]);

  const handleSendRequest = async (e) => {
    e.preventDefault();
    const { friendId } = e.target.elements;
    const data = {
      friend_id: friendId.value,
      myId: currentUser._id,
    };
    console.log(data);
    await fetch("/send-request", {
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

  const handleRequest = async (action,friendId) => {
    const data = {
      action:action,
      myId:currentUser._Id,
      friendId:friendId,
    }
    await fetch("/update-friend-request", {
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
  return (
    <div>
      <Header />
      {sentFriendsReq?.length > 0 && (
        <div>
          Request(s) received from:
          {sentFriendsReq.map((friend) => {
            return (
              <div key={`friendSent-${friend._id}`}>
                {friend._id} ({friend.firstName})
                <button
                  onClick={() => {
                    handleRequest("accept",{friendId:friend._id});
                  }}
                >
                  accept
                </button>
                <button onClick={() => {
                    handleRequest("refuse",{friendId:friend._id});
                  }}>refuse</button>
              </div>
            );
          })}
        </div>
      )}
      {receivedFriendsReq?.length > 0 && (
        <div>
          Request(s) sent to:
          {receivedFriendsReq.map((friend) => {
            return (
              <div key={`friendReceived-${friend._id}`}>
                {friend._id} ({friend.firstName})
                <button onClick={() => {
                    handleRequest("remove",{friendId:friend._id});
                  }}>X</button>
              </div>
            );
          })}
        </div>
      )}

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
