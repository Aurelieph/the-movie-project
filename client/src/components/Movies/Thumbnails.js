import { useEffect, useState } from "react";
import styled from "styled-components";
import { NUMBER_THUMBNAILS } from "../../Constants";
import Thumbnail from "./Thumbnail";

const Thumbnails = ({
  moviesArray,
  selectedPopupItem,
  setSelectedPopupItem,
  setShowDialog,
  editMode,
  handleDeleteFromWatchlist,
}) => {
  const [thumbnailsArray, setThumbnailsArray] = useState([]);

  useEffect(() => {
    setThumbnailsArray(moviesArray.slice(0, NUMBER_THUMBNAILS));
  }, [moviesArray]);

  const handleForward = () => {
    const firstElementId = thumbnailsArray[0].id;
    const lastElementPosition = moviesArray
      .map((el) => el.id)
      .indexOf(
        thumbnailsArray[Math.min(NUMBER_THUMBNAILS, moviesArray.length) - 1].id
      );
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
    const lastElementId =
      thumbnailsArray[Math.min(NUMBER_THUMBNAILS, moviesArray.length) - 1].id;
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

  return (
    <Wrapper>
      <BackwardButton onClick={handleBackward}>{"<"}</BackwardButton>
      {thumbnailsArray.map((thumbnail) => {
        return (

            <Thumbnail key={`key-${thumbnail.id}`}
              movie={thumbnail}
              selectedPopupItem={selectedPopupItem}
              setSelectedPopupItem={setSelectedPopupItem}
              setShowDialog={setShowDialog}
              editMode={editMode}
              handleDeleteFromWatchlist={handleDeleteFromWatchlist}
            />

        );
      })}
      <ForwardButton onClick={handleForward}>{">"}</ForwardButton>
    </Wrapper>
  );
};

export default Thumbnails;

const Wrapper = styled.div`
  position: relative;
  /* border-radius: 20px; */
  margin: auto;
  max-height: var(--thmubnails-banner-size);
  display: flex;
  justify-content: center;
  align-items: center;
  max-width:100%;
  /* background-color:blue; */
`;
const BackwardButton = styled.button`
  position: sticky;
  left: 0;
`;
const ForwardButton = styled.button`
  position: sticky;
  right: 0;
`;
