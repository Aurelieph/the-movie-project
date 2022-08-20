import { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import bridesmaid from "./images/bridemaids.jpg";
import bridesmaid2 from "./images/bridemaids2.jpg";

const Profile = () => {
  const [watching, setWatching] = useState("Bridemaids");

  const handleSubmit = (e)=>{
    e.preventDefault()
    setWatching(e.target.movie.value)
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
          <Pseudo>Aurélie </Pseudo>is watching{" "}
          <MovieName> {watching} </MovieName>
          <ProviderName>on Netflix</ProviderName>
        </ProfileInfo>
        <ProfileBody>
          <form onSubmit={handleSubmit}>
          <SearchField type="text" name="movie" />
          <input type="submit" hidden />

          </form>
        </ProfileBody>
      </Wrapper>
      ;
    </div>
  );
};

export default Profile;

const Wrapper = styled.div`
  position: absolute;
  top: var(--header-height);
`;

const Banner = styled.div`
  position: absolute;
  width: 100%;
  /* z-index: 2; */
  top: 0px;
  height: var(--banner-height);
  overflow: hidden;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
`;
const BannerImg = styled.img`
  width: 100%;
  z-index: 2;
  top: 0px;
`;

const ProfileInfo = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: calc(var(--banner-height) - var(--header-height));
  margin: 0;
  width: 30vw;
`;
const Pseudo = styled.div`
  font-size: 32px;
  margin: 10px 0;
`;
const MovieName = styled.div`
  font-size: 24px;
  margin: 20px 0 10px;
`;
const ProviderName = styled.div``;

const ProfilePicture = styled.div`
  border-radius: 100%;
  width: var(--profile-image-size);
  height: var(--profile-image-size);

  background-image: url(${bridesmaid});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px; ;
`;

const ProfileBody = styled.div`
  position: fixed;
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  top: var(--banner-height);
  /* margin: 0 100px; */
  left: 30vw;
`;

const SearchField = styled.input``;
