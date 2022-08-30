import { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import bridesmaid from "./images/bridemaids.jpg";
import bridesmaid2 from "./images/bridemaids2.jpg";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import { useParams } from "react-router-dom";
import Search from "./Search";

const Profile = () => {
  // const [watching, setWatching] = useState("Bridemaids");
  const [searchResults, setSearchResults] = useState(null)
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { currentUser, setCurrentUser } = useContext(GlobalContext);
  const [userInfo, setUserInfo] = useState(null);
  const params = useParams();
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(`/user-id/${params.id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          setUserInfo(json.data);
          // console.log(json.message);
        } else {
          console.log(json.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=2f1690ffc497ca72ea549460bdb184cf&query=${encodeURI(text)}`
    )
      .then((res) => res.json())
      .then((json) => {
        // const maxValue = Math.min(json.results.length, 50);
        setSearchResults(json.results)
        console.log(json.results)
      });
  }, [text]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setWatching(e.target.movie.value);
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <Header />
      <Banner>
        <BannerImg src={bridesmaid2} />
      </Banner>
      <Wrapper>
        <ProfileInfo>
          <ProfilePicture />
          <Pseudo>{userInfo?.nickName} </Pseudo>is watching{" "}
          <MovieName> {userInfo?.watching} </MovieName>
          <ProviderName>on Netflix</ProviderName>
        </ProfileInfo>
        <ProfileBody className="profile-body">
          <form onSubmit={handleSubmit}>
            <SearchField type="text" name="movie" />
            <input type="submit" hidden />
          </form>
          <Search
          text={text} setText={setText}
            suggestions={searchResults}
            // categories={data.categories}
            handleSelect={(suggestion) => {
              window.alert(`Selected: ${suggestion}`);
            }}
          />
        </ProfileBody>
      </Wrapper>
    </div>
  );
};

export default Profile;

const Wrapper = styled.div`
  top: var(--header-height);
`;

const Banner = styled.div`
  width: 100%;
  z-index: -1;
  top: 0px;
  height: var(--banner-height);
  overflow: hidden;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  margin-top: calc(var(--header-height) * -1);
`;
const BannerImg = styled.img`
  min-width: 100vw;
  /* width: 100%; */
  z-index: 2;
`;

const ProfileInfo = styled.div`
  position: static;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin: calc(var(--banner-height) -  var(--profile-image-size) / 2 ); */
  /* top: calc(var(--banner-height) -  var(--profile-image-size) / 2 ); */
  margin: calc(var(--profile-image-size) / -2) 0 0 50px;
  width: var(--profile-image-size);
  z-index: 3;
`;
const Pseudo = styled.div`
  font-size: 32px;
  margin: 10px 0;
  z-index: inherit;
`;
const MovieName = styled.div`
  font-size: 24px;
  margin: 20px 0 10px;
  z-index: inherit;
`;
const ProviderName = styled.div`
  z-index: inherit;
`;

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
`;

const ProfileBody = styled.div`
  position: absolute;
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  top: var(--banner-height);
  /* margin: 0 100px; */
  left: calc(var(--profile-image-size) + 100px);
  z-index: 3;
`;

const SearchField = styled.input``;
