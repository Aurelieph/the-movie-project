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
      <Form onSubmit={handleSendRequest}>
        <p>Enter your friend's ID:</p>

        <InputIdStyle type="text" name="friendId" />
        <SubmitStyle type="submit" />
      </Form>
      {receivedFriendsReq?.length > 0 && (
        <div>
        <Title>
          Request(s) received from:
        </Title>
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
          <Title>
          Request(s) sent to:

          </Title>
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
          <Title>
          Friend(s):

          </Title>
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
display:flex;
margin:50px auto;
width:500px;
flex-direction: column;

`
const Form = styled.form`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
  justify-content: space-between;	
  align-items: center;

background-color:yellow;
padding:20px;
border-radius:20px;
height:35px;
margin:-20px -20px 0 -20px;
`
const FriendsStyle = styled.div`
background-color:yellow;
padding:20px;
border-radius:20px;
height:35px;
`
const SubmitStyle = styled.input`
margin-left:20px;
`
const InputIdStyle = styled.input`
margin-left:10px;
width:200px;
`

const Title = styled.h2`
  border-top: 1px solid lightgray;
  margin: 10px 0;
  padding: 10px 0 5px 0;
`