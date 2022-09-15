import { useEffect, useState } from 'react';
import styled from "styled-components";
import star from '../images/star.png'

const Thumbnail = ({
  movie,
  selectedPopupItem,
  setSelectedPopupItem,
  setShowDialog,
  editMode,
  handleDeleteFromWatchlist,
  watchlistName
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    setSelectedPopupItem(movie);
    setShowDialog(true);
  };

  const [friendName, setFriendName] =useState(null)

  useEffect(()=>{
    if(watchlistName==="Recommendations"){
      fetch(`/user-id/${movie.recommended_by}`)
      .then(res => res.json())
      .then(json => {
        setFriendName(json.data.nickName)
        // console.log(movie)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },[])

  return (
    <Wrapper>
      {editMode && (
        <DeleteButton
          onClick={(e) => {
            // e.preventDefault();
            handleDeleteFromWatchlist(movie.id);
          }}
        >
          X
        </DeleteButton>
      )}
      <Button onClick={handleClick}>
        <MovieImg
          alt={movie.title ? movie.title : movie.name}
          title={movie.title ? movie.title : movie.name}
          src={`http://image.tmdb.org/t/p/w342/${movie.poster_path}`}
        />
      </Button>
      {watchlistName==="Recommendations"?<ImgStyle src={star} title={`by: ${friendName}`}/>:""
    }    </Wrapper>
  );
};

export default Thumbnail;

const Wrapper = styled.div`
  height: 100%;
  margin: 0 10px;
  position: relative;
`;

const MovieImg = styled.img`
  max-height: calc(var(--thumbnails-banner-size) - 10px);
  max-width: calc(80vw / (var(--number-thumbnails) + 2 ));
`;
const Button = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;
const DeleteButton = styled.button`
  position: absolute;
  background: white;
  color: inherit;
  height: 25px;
  top: 20px;
  left: calc(100% - 25px);
  margin-top: -20px;
  cursor: pointer;
`;
const ImgStyle = styled.img`
position:absolute;
left: calc(100% - 20px);
height:20px;
`;
