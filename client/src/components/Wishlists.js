import { useContext, useState } from "react";
import styled from "styled-components";
import { GlobalContext } from "./GlobalContext";
import Wishlist from "./Wishlist";

const Whishlists = () =>{
  const { currentUser,update,setUpdate} = useContext(GlobalContext);
  const [message, setMessage] = useState(null);
  const [wishLists, setWishLists]= useState(null)

  const handleCreation = async (e)=>{
    e.preventDefault()
    console.log(e.target.watchlist.value)
    const data ={
      name:e.target.watchlist.value,
      myId: currentUser._id
    }
    await fetch("/new-watchlist",{
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
        setUpdate(!update)
      })
      .catch((err) => console.log(err))
  }
  return (
  <div>
    <form onSubmit={handleCreation}>
      <label> 
        Create a watchlist 
    <input type="text" placeholder="Watchlist name" name="watchlist"/>
      </label>
      <input type="submit"/>
    </form>

    <List>
      {currentUser?.watchlists?.map((el)=>{
        return(
          
          <Wishlist key={`wishlist-${currentUser._id}-${el.name}`} watchlist={el} message={message} setMessage={setMessage} />
          )
        })}
    </List>
        {message&&<div>{message}</div>}
    
    </div>)
}

export default Whishlists


const List = styled.div` 

`