import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MovieDetails from "./MovieDetails";
import PopupRecommendation from "./PopupRecommendation";
import WatchListsModule from "./PopupWatchListsModule";

const Popup = ({
  selectedPopupItem,
  setSelectedPopupItem,
  showDialog,
  setShowDialog,
}) => {
  const [creditInfo, setCreditInfo] = useState(null);
  const close = () => {
    setShowDialog(false);
    setSelectedPopupItem(null);
    setCreditInfo(null);
  };

  useEffect(() => {
    if (selectedPopupItem) {
      fetch(
        `https://api.themoviedb.org/3/${selectedPopupItem.media_type}/${selectedPopupItem.id}/credits?api_key=2f1690ffc497ca72ea549460bdb184cf`
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
          <WatchListsModule selectedPopupItem={selectedPopupItem} />
          <PopupRecommendation selectedPopupItem={selectedPopupItem} />
        </div>
        <CloseButton onClick={close}>X</CloseButton>
      </Wrapper>
    </StyledDialog>
  );
};

const CloseButton = styled.button`
  height: fit-content;
  position: absolute;
  right: 0px;
  top: 0px;
  cursor: pointer;
  text-align: center;
  padding: 2px 5px;
  &:hover {
    color: white;
  }
`;
const Wrapper = styled.div`
  display: flex;
  position: relative;
`;
const Poster = styled.img``;

const StyledDialog = styled(Dialog)`
  width: 80vw;
  z-index: 20;
  margin: 20px auto;
`;

const Title = styled.h3`
  border-top: 1px solid lightgray;
  margin: 10px 0;
  padding: 10px 0 5px 0;
`

export default Popup;
