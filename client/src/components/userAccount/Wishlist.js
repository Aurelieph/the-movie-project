import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { GlobalContext } from '../GlobalContext'
import Thumbnails from '../Movies/Thumbnails'

const Wishlist = ({
  watchlistName,
  setMessage,
  setShowDialog,
  selectedPopupItem,
  setSelectedPopupItem,
  userInfo,
  editMode,
  setEditMode
}) => {
  const { currentUser, update, setUpdate } = useContext(GlobalContext)
  const [watchList, setWatchlist] = useState([])
  // const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setMessage(null)
  }, [])

  useEffect(() => {
    setWatchlist([])
    const simpleList = userInfo?.watchlists?.find(el => {
      return el.name === watchlistName
    })
    console.log("userInfo",userInfo)
    simpleList?.list.map(el => {
      fetch(
        `https://api.themoviedb.org/3/${el.media_type}/${el.id}?api_key=2f1690ffc497ca72ea549460bdb184cf`
      )
        .then(res => res.json())
        .then(json => {
          console.log(el)
          json.media_type = el.media_type
          json.recommended_by= el.recommended_by
          setWatchlist(watchList => [...watchList, json])
        })
    })
  }, [userInfo])

  const handleDeleteWatchList = async e => {
    e.preventDefault()
    const data = {
      name: e.target.name,
      myId: userInfo._id
    }
    await fetch('/delete-watchlist', {
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

  const toggleEditMode = e => {
    e.preventDefault()
    setEditMode(!editMode)
  }
  const handleDeleteFromWatchlist = async movieId => {
    const data = {
      myId: userInfo._id,
      name: watchlistName,
      movieId: movieId
    }
    await fetch('/remove-from-watchlist', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        setUpdate(!update)
        setMessage(json.message)
      })
      .catch(err => console.log(err))
  }
  return (
    <Wrapper>
      <SubWrapper>
        {watchlistName === 'Recommendations' ? (
          ''
        ) : (
          <Title>{watchlistName}</Title>
        )}


      {/* {currentUser?._id === userInfo?._id && (
        <EditButton onClick={toggleEditMode} >{editMode ? "done" : "edit"}</EditButton>
        )} */}
      {editMode && (
        <DeleteButton
          onClick={handleDeleteWatchList}
          name={watchlistName}
          hidden={watchlistName === 'Recommendations' ? true : false}
        >
          delete watchlist
        </DeleteButton>
      )}
            </SubWrapper>
      <Thumbnails
        moviesArray={watchList}
        selectedPopupItem={selectedPopupItem}
        setSelectedPopupItem={setSelectedPopupItem}
        setShowDialog={setShowDialog}
        editMode={editMode}
        handleDeleteFromWatchlist={handleDeleteFromWatchlist}
        watchlistName={watchlistName}
      />
    </Wrapper>
  )
}

export default Wishlist

const DeleteButton = styled.button`
  margin-left: 10px;
  background-color: lightcoral;
  border-radius:2px 5px;
`
const EditButton = styled.button`
  background-color: inherit;
  color: black;
  text-decoration: underline;
  border: none;
  font-style: italic;
`
const Wrapper = styled.div`
  max-width: 100%;
  /* background-color:red; */
  align-items: baseline;
`
const SubWrapper = styled.div`
margin-top:10px;`
const Title = styled.div`
  font-weight: normal;
  border: 1px solid lightgray;
  display:inline-block;
  padding:10px;
  border-radius:2px 5px;
`
