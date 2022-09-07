import deadpool from "./images/deadpool.jpg";
import styled from "styled-components";
import Header from "./Header";
import { useEffect, useState } from "react";
import { NUMBER_THUMBNAILS } from "../Constants";
import Thumbnails from "./Thumbnails";
import Popup from "./Popup";

const Homepage = () => {
  // const [thumbnailsTop20Movie, setThumbnailsTop20Movie] = useState([]);
  const [top20MovieWeek, setTop20MovieWeek] = useState([]);
  // const [thumbnailsTop20Tv, setThumbnailsTop20Tv] = useState([]);
  const [top20TvWeek, setTop20TvWeek] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPopupItem, setSelectedPopupItem] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=2f1690ffc497ca72ea549460bdb184cf"
    )
      .then((res) => res.json())
      .then((json) => {
        const maxValue = Math.min(json.results.length, 20);
        if (top20MovieWeek.length < maxValue) {
          for (let i = 0; i < maxValue; i++) {
            setTop20MovieWeek((prevArray) => [...prevArray, json.results[i]]);
          }
        }
      });
  }, [top20MovieWeek]);
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/tv/week?api_key=2f1690ffc497ca72ea549460bdb184cf"
    )
      .then((res) => res.json())
      .then((json) => {
        const maxValue = Math.min(json.results.length, 20);
        if (top20TvWeek.length < maxValue) {
          for (let i = 0; i < maxValue; i++) {
            setTop20TvWeek((prevArray) => [...prevArray, json.results[i]]);
          }
        }
      });
  }, [top20TvWeek]);

  // useEffect(() => {
  //   setThumbnailsTop20Movie(top20MovieWeek.slice(0, NUMBER_THUMBNAILS));
  // }, [top20MovieWeek]);
  // useEffect(() => {
  //   setThumbnailsTop20Tv(top20TvWeek.slice(0, NUMBER_THUMBNAILS));
  // }, [top20TvWeek]);

  return (
    <Wrapper>
            <Popup
        selectedPopupItem={selectedPopupItem}
        setSelectedPopupItem={setSelectedPopupItem}
        showDialog={showDialog} setShowDialog={setShowDialog}
      />
      {!showDialog?<Header />:<PlaceHolder/>}
      
      <FirstImage src={deadpool} />
      <Thumbnails
        // thumbnailsArray={thumbnailsTop20Movie}
        // setThumbnailsArray={setThumbnailsTop20Movie}
        moviesArray={top20MovieWeek}
        selectedPopupItem={selectedPopupItem}
        setSelectedPopupItem={setSelectedPopupItem}
        setShowDialog={setShowDialog}
      />
      <Thumbnails
        // thumbnailsArray={thumbnailsTop20Tv}
        // setThumbnailsArray={setThumbnailsTop20Tv}
        moviesArray={top20TvWeek}
        selectedPopupItem={selectedPopupItem}
        setSelectedPopupItem={setSelectedPopupItem}
        setShowDialog={setShowDialog}
      />
    </Wrapper>
  );
};

export default Homepage;

const Wrapper = styled.div`
  margin: 0;
  z-index: 1;
  top: 0px;
  /* position: static; */
  background-color: darkgray;
`;
const FirstImage = styled.img`
  /* position: static; */
  width: 100%;
  z-index: -1;
  /* top: 0px; */
  display: block;
  margin-top:calc(var(--header-height) * -1);
  /* margin-top:-80px; */
  /* top:var(----header-height); */
`;
export const PlaceHolder = styled.div`
  height: var(--header-height);
`;