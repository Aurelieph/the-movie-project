import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useAuth0();
  const [update, setUpdate] = useState(false);
  const [sentFriendsReq, setSentFriendsReq] = useState([]);
  const [receivedFriendsReq, setReceivedFriendsReq] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    setSentFriendsReq([]);
    currentUser?.friendRequestSent?.map((el) => {
      fetch(`/user-id/${el.id}`)
        .then((res) => res.json())
        .then((json) => {
          json.data.date = el.date;
          setSentFriendsReq((sentFriendsReq) => [...sentFriendsReq, json.data]);
        });
    });
    setReceivedFriendsReq([]);
    currentUser?.friendRequestReceived?.map((el) => {
      fetch(`/user-id/${el.id}`)
        .then((res) => res.json())
        .then((json) => {
          json.data.date = el.date;
          setReceivedFriendsReq((receivedFriendsReq) => [
            ...receivedFriendsReq,
            json.data,
          ]);
        });
    });
    setFriends([]);
    currentUser?.friends?.map((el) => {
      fetch(`/user-id/${el.id}`)
        .then((res) => res.json())
        .then((json) => {
          json.data.date = el.date;
          setFriends((friends) => [...friends, json.data]);
        });
    });
  }, [currentUser]);
  useEffect(() => {
    if (user) {
      fetch(`/user/${user.sub}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 200) {
            setCurrentUser(json.data);
          } else {
            console.log(json.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user, update]);
  return (
    <GlobalContext.Provider
      value={{ currentUser, setCurrentUser, setUpdate, update,sentFriendsReq,receivedFriendsReq,friends }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
