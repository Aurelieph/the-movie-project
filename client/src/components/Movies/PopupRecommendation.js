import { useContext, useState } from "react";
import styled from "styled-components";
import { GlobalContext } from "../GlobalContext";

const PopupRecommendation = ({ selectedPopupItem }) => {
  const { currentUser, setCurrentUser, update, setUpdate,friends } =
    useContext(GlobalContext);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      friendId: e.target.recommend.value,
      myId: currentUser._id,
      movieId: selectedPopupItem.id,
      media_type: selectedPopupItem.media_type,
    };
    console.log("data-recommend",data)
    await fetch("/send-recommendation", {
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
        // setUpdate(!update);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Wrapper>
      {currentUser && (
        <form onSubmit={handleSubmit}>
          <Title>Recommend it</Title>
          <label htmlFor="recommend">to:</label>
          <select id="recommend" name="recommend">
            {friends?.map((friend) => {
              return (
                <option
                  key={`recommend-${friend._id}`}
                  value={friend._id}
                  
                >
                  {`${friend.nickName}-${friend.firstName}`}
                </option>
              );
            })}
          </select>
          <input type="submit" />
        </form>
      )}
    </Wrapper>
  );
};

export default PopupRecommendation;

const Wrapper = styled.div`
margin: 20px 40px;
padding:10px;
`
const Title = styled.h3`

`