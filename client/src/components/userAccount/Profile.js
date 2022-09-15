import { useState } from 'react'
import styled from 'styled-components'
import Header from '../Header'
import bridesmaid from '../images/bridemaids.jpg'
import bridesmaid2 from '../images/bridemaids2.jpg'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../GlobalContext'
import { useNavigate, useParams } from 'react-router-dom'
import Popup from '../Movies/Popup'
import Whishlists from './Wishlists'
import { PlaceHolder } from '../Homepage'
import Search from '../Movies/Search'
import Wishlist from './Wishlist'

const Profile = () => {
  const [searchResults, setSearchResults] = useState([])
  const { isLoading } = useAuth0()
  const { currentUser, update } = useContext(GlobalContext)
  const [userInfo, setUserInfo] = useState(null)
  const params = useParams()
  const [text, setText] = useState('')
  const [selectedPopupItem, setSelectedPopupItem] = useState(null)
  const [showDialog, setShowDialog] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [message, setMessage] = useState(null)
  let navigate = useNavigate()
  const [editModeRec, setEditModeRec] = useState(false)
  const [editModeLists, setEditModeLists] = useState(false)

  const handleSelect = suggestion => {
    setShowDialog(true)
    setSelectedPopupItem(suggestion)
  }
  useEffect(() => {
    setUserInfo(null)
    setLoaded(false)
    fetch(`/user-id/${params.id}`)
      .then(res => res.json())
      .then(json => {
        if (json.status === 200) {
          setUserInfo(json.data)
        } else {
          console.log(json.message)
        }
        setLoaded(true)
      })
      .catch(err => {
        console.log(err)
      })
  }, [params.id, update])

  useEffect(() => {
    if (text.length > 2) {
      fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=2f1690ffc497ca72ea549460bdb184cf&query=${encodeURI(
          text
        )}`
      )
        .then(res => res.json())
        .then(json => {
          setSearchResults(
            json.results.filter(result => {
              return result.media_type === 'movie' || result.media_type === 'tv'
            })
          )
        })
    }
  }, [text])
  const toggleEditMode = (callback, state) => {
    // e.preventDefault()
    callback(!state)
  }

  if (isLoading) {
    return <div>Loading ...</div>
  }
  if (!userInfo && loaded === true) {
    if (!currentUser) {
      return navigate('/account')
    }
    return (
      <>
        <Header />
        <div>Page doesn't exist</div>
      </>
    )
  }

  if (
    !userInfo?.friends?.some(el => el.id === currentUser?._id) &&
    currentUser?._id !== userInfo?._id &&
    loaded === true
  ) {
    return (
      <>
        <Header />
        <div>you are not friend with this user</div>
      </>
    )
  }

  return (
    <div>
      <Popup
        selectedPopupItem={selectedPopupItem}
        setSelectedPopupItem={setSelectedPopupItem}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
      {!showDialog ? <Header /> : <PlaceHolder />}
      <Banner>
        <BannerImg src={bridesmaid2} />
      </Banner>
          <Strip/>
      <Wrapper>
        <ProfileInfo>

          <ProfilePicture />
          <Pseudo>{userInfo?.nickName} </Pseudo>is watching{' '}
          <MovieName> {userInfo?.watching} </MovieName>
        </ProfileInfo>
        <ProfileBody className='profile-body'></ProfileBody>
        <Search
          text={text}
          setText={setText}
          suggestions={searchResults}
          handleSelect={handleSelect}
          selectedPopupItem={selectedPopupItem}
          showDialog={showDialog}
        />

        <Title>
          Recommendations
          {currentUser?._id === userInfo?._id && (
            <EditButton
              onClick={() => toggleEditMode(setEditModeRec, editModeRec)}
              className={editModeRec ? "activeMode" : ""}
            >
              {editModeRec ? 'done' : 'edit'}
            </EditButton>
          )}
        </Title>

        <Wishlist
          key={`wishlist-${userInfo?._id}-Recommendations`}
          userInfo={userInfo}
          watchlistName='Recommendations'
          setShowDialog={setShowDialog}
          selectedPopupItem={selectedPopupItem}
          setSelectedPopupItem={setSelectedPopupItem}
          message={message}
          setMessage={setMessage}
          editMode={editModeRec}
          setEditMode={setEditModeRec}
        />

        <Title>
          My Watchlists
          {currentUser?._id === userInfo?._id && (
            <EditButton
              onClick={() => toggleEditMode(setEditModeLists, editModeLists)}
            className={editModeLists ? "activeMode" : ""}
            >
              {editModeLists ? 'done' : 'edit'}
            </EditButton>
          )}
        </Title>
        <Whishlists
          setShowDialog={setShowDialog}
          selectedPopupItem={selectedPopupItem}
          setSelectedPopupItem={setSelectedPopupItem}
          userInfo={userInfo}
          message={message}
          setMessage={setMessage}
          editMode={editModeLists}
          setEditMode={setEditModeLists}
        />
      </Wrapper>
    </div>
  )
}

export default Profile

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  top: var(--header-height);
  width: 80vw;
  margin: auto;
`


const Banner = styled.div`
  width: 100%;
  z-index: -1;
  top: 0px;
  height: var(--banner-height);
  overflow: hidden;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  margin-top: calc(var(--header-height) * -1);
`
const BannerImg = styled.img`
  min-width: 100vw;
  z-index: 2;
`

const ProfileInfo = styled.div`
  /* position: static; */
  margin: calc(var(--profile-image-size) / -2) auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin: calc(var(--profile-image-size) / -2) 0 0 50px; */
  width: var(--profile-image-size);
  color:gray;

`
const Strip = styled.div`
  position: absolute;
height:220px;
width:100%;
background-color:yellow;
/* background-color:rgb(48,52,67); */
z-index:-1;
`
const Pseudo = styled.div`
  font-size: 32px;
  margin: 10px 0;
  z-index: inherit;
  
`
const MovieName = styled.div`
  font-size: 24px;
  margin: 10px 0 10px;
  z-index: inherit;
`
const ProviderName = styled.div`
  z-index: inherit;
`

const ProfilePicture = styled.div`
  border-radius: 100%;
  width: var(--profile-image-size);
  height: var(--profile-image-size);
  background-image: url(${bridesmaid});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  z-index: 0;
`

const ProfileBody = styled.div`
  /* position: absolute; */
  top: var(--banner-height);
  left: calc(var(--profile-image-size) + 100px);
`

const SearchField = styled.input``

const Title = styled.h2`
  border-top: 1px solid lightgray;
  margin: 10px 0;
  padding: 10px 0 5px 0;
`
const DeleteButton = styled.button`
  margin-left: 10px;
  background-color: lightcoral;
`
const EditButton = styled.button`
  background-color: inherit;
  color: black;
  text-decoration: underline;
  border: none;
  font-style: italic;
  &.activeMode{
    color:green;
    font-weight:bold;
  }
`
