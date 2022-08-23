import styled from "styled-components";

const Thumbnail = ({ id, movie }) => {
  return (
    <Wrapper>
      {/* {movie.title} */}
      <MovieImg src={`http://image.tmdb.org/t/p/w342/${movie.poster_path}`} />
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