import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { GlobalContext } from "../GlobalContext";
import Header from "../Header";

const Friends = () => {
  const { currentUser, setCurrentUser, update, setUpdate,sentFriendsReq,receivedFriendsReq,friends } =
    useContext(GlobalContext);
  const [message, setMessage] = useState(null);
  

  const handleSendRequest = async (e) => {
    e.preventDefault();
    const { friendId } = e.target.elements;
    const data = {
      friend_id: friendId.value,
      myId: currentUser._id,
    };
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

  const handleRequest = async (action, friendId) => {
    const data = {
      action: action,
      myId: currentUser._id,
      friendId: friendId,
    };
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
      <Wrapper>
      <form onSubmit={handleSendRequest}>
        <p>Enter your friend's ID:</p>

        <input type="text" name="friendId" />
        <input type="submit" />
      </form>
      {receivedFriendsReq?.length > 0 && (
        <div>
          Request(s) received from:
          {receivedFriendsReq.map((friend) => {
            return (
              <div key={`friendSent-${friend._id}`}>
                {friend._id}-{friend.nickName} ({friend.firstName})
                <button
                  onClick={() => {
                    handleRequest("accept", friend._id);
                  }}
                >
                  accept
                </button>
                <button
                  onClick={() => {
                    handleRequest("refuse", friend._id);
                  }}
                >
                  refuse
                </button>
              </div>
            );
          })}
        </div>
      )}
      {sentFriendsReq?.length > 0 && (
        <div>
          Request(s) sent to:
          {sentFriendsReq.map((friend) => {
            return (
              <div key={`friendReceived-${friend._id}`}>
                {friend._id} ({friend.nickName})
                <button
                  onClick={() => {
                    handleRequest("remove", friend._id);
                  }}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
      )}
      {friends?.length > 0 && (
        <div>
          Friend(s):
          {friends.map((friend) => {
            return (
              <div key={`friendReceived-${friend._id}`}>
                <Link to={`/profile/${friend._id}`}>
                  {friend._id}-{friend.nickName} ({friend.firstName})
                </Link>
                <button
                  onClick={() => {
                    handleRequest("delete", friend._id);
                  }}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
      )}
      <div>{message}</div>
      </Wrapper>
    </div>
  );
};

export default Friends;

const Wrapper = styled.div`
display:inline-block;
margin:auto;
`