import styled from "styled-components";
import { NUMBER_THUMBNAILS } from "../Constants";
import Thumbnail from "./Thumbnail";

const Thumbnails = ({thumbnailsArray,setThumbnailsArray,moviesArray})=>{
  const handleForward = () => {
    const firstElementId = thumbnailsArray[0].id;
    const lastElementPosition = moviesArray
      .map((el) => el.id)
      .indexOf(thumbnailsArray[NUMBER_THUMBNAILS - 1].id);
    if (lastElementPosition < moviesArray.length - 1) {
      setThumbnailsArray((prevArray) =>
        prevArray.filter((movie) => movie.id !== firstElementId)
      );
      setThumbnailsArray((prevArray) => [
        ...prevArray,
        moviesArray[lastElementPosition + 1],
      ]);
    }
  };
  const handleBackward = () => {
    const lastElementId = thumbnailsArray[NUMBER_THUMBNAILS - 1].id;
    const firstElementPosition = moviesArray
      .map((el) => el.id)
      .indexOf(thumbnailsArray[0].id);
    if (firstElementPosition > 0) {
      setThumbnailsArray((prevArray) =>
        prevArray.filter((movie) => movie.id !== lastElementId)
      );
      setThumbnailsArray((prevArray) => [
        moviesArray[firstElementPosition - 1],
        ...prevArray,
      ]);
    }
  };

  return(      <Wrapper>
    <BackwardButton onClick={handleBackward}>{"<"}</BackwardButton>
    {thumbnailsArray.map((thumbnail) => {
      return (
        <div key={`key-${thumbnail.id}`}>
          <Thumbnail movie={thumbnail} />
        </div>
      );
    })}
    <ForwardButton onClick={handleForward}>{">"}</ForwardButton>
  </Wrapper>)
}

export default Thumbnails


const Wrapper = styled.div`
  position: relative;
  /* background-color:beige; */
  border-radius: 20px;
  width: 90vw;
  margin: auto;
  max-height: var(--thmubnails-banner-size);
  /* z-index:3; */
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FirstImage = styled.img`
  position: relative;
  width: 100%;
  z-index: -1;
  top: 0px;
  display: block;
`;
const BackwardButton = styled.button`
position:sticky;
left:0;

`;
const ForwardButton = styled.button`
position:sticky;
right:0;

`;