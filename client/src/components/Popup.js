import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MovieDetails from "./MovieDetails";
import WatchListsModule from "./WatchListsModule";

const Popup = ({
  selectedPopupItem,
  setSelectedPopupItem,
  showDialog,
  setShowDialog,
}) => {
  // selectedPopupItem={selectedPopupItem} setSelectedPopupItem={setSelectedPopupItem}
  const [creditInfo, setCreditInfo] = useState(null);

  const close = () => {
    setShowDialog(false);
    setSelectedPopupItem(null);
    setCreditInfo(null);
  };

  useEffect(() => {
    if (selectedPopupItem?.media_type === "movie") {
      fetch(
        `https://api.themoviedb.org/3/movie/${selectedPopupItem.id}/credits?api_key=2f1690ffc497ca72ea549460bdb184cf`
      )
        .then((res) => res.json())
        .then((json) => {
          setCreditInfo(json);
        });
    } else if (selectedPopupItem?.media_type === "tv") {
      fetch(
        `https://api.themoviedb.org/3/tv/${selectedPopupItem.id}/credits?api_key=2f1690ffc497ca72ea549460bdb184cf`
      )
        .then((res) => res.json())
        .then((json) => {
          setCreditInfo(json);
        });
    }
  }, [selectedPopupItem]);

  return (
    <StyledDialog isOpen={showDialog} onDismiss={close} aria-label="View item">
      <Wrapper>
        <Poster
          src={`http://image.tmdb.org/t/p/w500/${selectedPopupItem?.poster_path}`}
        />
        <div>
          {selectedPopupItem?.media_type === "movie" && (
            <MovieDetails
              selectedPopupItem={selectedPopupItem}
              title={selectedPopupItem.title}
              creditInfo={creditInfo}
              date={selectedPopupItem.release_date}
            />
          )}
          {selectedPopupItem?.media_type === "tv" && (
            <MovieDetails
              selectedPopupItem={selectedPopupItem}
              title={selectedPopupItem.name}
              creditInfo={creditInfo}
              date={selectedPopupItem.first_air_date}
            />
          )}
          <WatchListsModule selectedPopupItem={selectedPopupItem}/>
        </div>
        <CloseButton onClick={close}>X</CloseButton>
      </Wrapper>
    </StyledDialog>
  );
};

const CloseButton = styled.button`
  /* width: fit-content; */
  height: fit-content;
  background-color: var(--secondary-color);
  position: absolute;
  right: 0px;
  top: 0px;
  color: gray;
  cursor: pointer;
  border: 1px solid lightgray;
  text-align: center;
  padding: 2px 5px;
  &:hover {
    color: white;
    /* border:none; */
  }
`;
const Wrapper = styled.div`
  display: flex;
  position: relative;
  /* z-index:20; */
`;
const Poster = styled.img`
  /* max-width: 50%;
  height: auto;
  max-height:80vh; */
`;

const StyledDialog = styled(Dialog)`
  width: 80vw;
  /* z-index:20; */
  margin: 20px auto;
`;

export default Popup;
