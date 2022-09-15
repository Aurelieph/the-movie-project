import { useContext, useState } from 'react'
import styled from 'styled-components'
import { GlobalContext } from '../GlobalContext'

const WatchListsModule = ({ selectedPopupItem }) => {
  const { currentUser, setCurrentUser, update, setUpdate } =
    useContext(GlobalContext)
  const [message, setMessage] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    const data = {
      name: e.target.watchlist.value,
      myId: currentUser._id,
      movieId: selectedPopupItem.id,
      media_type: selectedPopupItem.media_type
    }
    await fetch('/add-to-watchlist', {
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
    <Wrapper>
      {currentUser && (
        <form onSubmit={handleSubmit}>
          <Title>Wishlist</Title>
          <label htmlFor='watchlist'>Add to:</label>
          <SelectStyle id='watchlist' name='watchlist'>
            {currentUser?.watchlists?.map(whatchlist => {
              if (whatchlist.name !== 'Recommendations') {
                return (
                  <option
                    key={`myWatchListKey-${whatchlist.name}`}
                    value={whatchlist.name}
                  >
                    {whatchlist.name}
                  </option>
                )
              }
            })}
          </SelectStyle>
          <ButtonStyle type='submit' />
        </form>
      )}
    </Wrapper>
  )
}

export default WatchListsModule

const Wrapper = styled.div`
  margin: 20px 40px;
  padding: 10px;
`
const Title = styled.h3``

export const ButtonStyle = styled.input`
  margin-left: 10px;
  border: solid 1px yellow;
  background-color: yellow;
  color: gray;
  &:hover {
    color: lightgray;
    background-color: white;
  }
`
export const SelectStyle = styled.select`
margin-left:10px;
  border: solid 1px yellow;
  cursor: pointer;
`
