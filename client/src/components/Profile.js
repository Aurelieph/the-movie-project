import styled from "styled-components";
import Header from "./Header";
import bridesmaid from "./bridemaids.jpg";
import bridesmaid2 from "./bridemaids2.jpg";

const Profile = () => {
  return (
    <div>
      <Header />
        <Banner>
          <BannerImg src={bridesmaid2}/>
        </Banner>
      <Wrapper>
        <ProfileBlock>
          <ProfilePicture />
          <Pseudo>Aurélie </Pseudo>is watching{" "}
          <MovieName> Bridemaids </MovieName>
          <ProviderName>on Netflix</ProviderName>
        </ProfileBlock>
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
  height:var(--banner-height);
  overflow:hidden;

`;
const BannerImg = styled.img`

  width: 100%;
  z-index: 2;
  top: 0px;
  

`;

const ProfileBlock = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top:calc( var(--banner-height) - var(--header-height))  ;
  margin:0 100px;
`;
const Pseudo = styled.div`
  font-size: 32px;
  margin:10px 0;
`;
const MovieName = styled.div`
  font-size: 24px;
  margin: 20px 0 10px;
`;
const ProviderName = styled.div``;

const ProfilePicture = styled.div`
  border-radius: 100%;
  width: var(--profile-image-size);
  height: var(--profile-image-size);;

  background-image: url(${bridesmaid});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`;
