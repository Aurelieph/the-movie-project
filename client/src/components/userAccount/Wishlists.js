import { useContext } from 'react'
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
      })
      .catch(err => console.log(err))
  }
  return (
    <div>
      {currentUser?._id === userInfo?._id && editMode && (
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
