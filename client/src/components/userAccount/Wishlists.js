import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { GlobalContext } from '../GlobalContext'
import Wishlist from './Wishlist'

const Whishlists = ({
  setShowDialog,
  selectedPopupItem,
  setSelectedPopupItem,
  userInfo,
  message,
  setMessage,
  editMode,
  setEditMode
}) => {
  const { currentUser, update, setUpdate } = useContext(GlobalContext)
  const [currentWatchListName, setCurrentWatchListName] = useState(null)
  const [updateLocal, setUpdateLocal] = useState(false)

  //   useEffect(()=>{
  //     if(userInfo?.watchlists){
  //       setCurrentWatchListName(userInfo?.watchlists[0]?.name)
  // // if(!currentWatchListName){
  // //   setCurrentWatchListName(userInfo?.watchlists[0]?.name)

  // // }
  // }
  //   },[userInfo,currentUser])

  // const handleSelection = async (e) => {
  //   e.preventDefault();
  //   setCurrentWatchListName(e.target.value)
  // }
  const handleCreation = async e => {
    e.preventDefault()
    const data = {
      name: e.target.watchlist.value,
      myId: userInfo._id
    }
    await fetch('/new-watchlist', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        setMessage(json.message)
        setUpdate(!update)
        // setUpdateLocal(!updateLocal)
      })
      .catch(err => console.log(err))
  }
  return (
    <div>
      {currentUser?._id === userInfo?._id && editMode &&(
        <form onSubmit={handleCreation}>
          <label>
            Create a watchlist
            <input type='text' placeholder='Watchlist name' name='watchlist' />
          </label>
          <Button type='submit' />
        </form>
      )}
      {userInfo?.watchlists && (
        <List>
          {/* <form onChange={handleSelection}>
          <label htmlFor="watchlist">Select:</label>
          <select id="watchlist" name="watchlist">
            {userInfo?.watchlists?.map((el) => {
              return (

                  <option key={`name-${el.name}`} value={el.name} >{el.name} </option>

              )
            })}
          </select>
        </form> */}
          {userInfo?.watchlists?.map(el => {
            if (el.name !== 'Recommendations') {
              return (
                <Wishlist
                  key={`wishlist-${userInfo?._id}-${el.name}`}
                  userInfo={userInfo}
                  watchlistName={el.name}
                  message={message}
                  setMessage={setMessage}
                  setShowDialog={setShowDialog}
                  selectedPopupItem={selectedPopupItem}
                  setSelectedPopupItem={setSelectedPopupItem}
                  editMode={editMode}
                  setEditMode={setEditMode}
                />
              )
            }
          })}
        </List>
      )}
      {message && <div>{message}</div>}
    </div>
  )
}

export default Whishlists

const List = styled.div``
const Button = styled.input`
  cursor: pointer;
  color: white;
  background-color: lightgray;
  &:hover {
    color: lightgray;
    background-color: white;
  }
`
