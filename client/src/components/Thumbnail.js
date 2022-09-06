import styled from "styled-components";

const Thumbnail = ({ id, movie ,selectedPopupItem,setSelectedPopupItem,setShowDialog}) => {

  const handleClick = (e)=>{
e.preventDefault()
    setSelectedPopupItem(movie)
    setShowDialog(true)
  }
  return (
    <Wrapper>
      {/* {movie.title} */}<Button onClick={handleClick}>
      <MovieImg src={`http://image.tmdb.org/t/p/w342/${movie.poster_path}`} />

      </Button>
    </Wrapper>
  );
};

export default Thumbnail;

const Wrapper = styled.div`
  height: 100%;
  margin: 0 10px;
`;

const MovieImg = styled.img`
max-height: calc(var(--thumbnails-banner-size) - 10px) ;
max-width:calc(100vw / ( var(--number-thumbnails) + 1 ) );
/* max-width:calc(100vw / 6 ); */
`
const Button = styled.button`
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
`