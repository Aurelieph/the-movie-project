import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useAuth0();
  const [update, setUpdate] = useState(false);

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
      value={{ currentUser, setCurrentUser, setUpdate, update }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
