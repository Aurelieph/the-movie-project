import deadpool from "./images/deadpool.jpg";
import styled from "styled-components";
import Header from "./Header";
import { useEffect, useState } from "react";
import { NUMBER_THUMBNAILS } from "../Constants";
import Thumbnails from "./Movies/Thumbnails";
import Popup from "./Movies/Popup";

const Homepage = () => {
  const [top20MovieWeek, setTop20MovieWeek] = useState([]);
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

  return (
    <Wrapper>
      <Popup
        selectedPopupItem={selectedPopupItem}
        setSelectedPopupItem={setSelectedPopupItem}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
      {!showDialog ? <Header /> : <PlaceHolder />}

      <FirstImage src={deadpool} />
      <div>
<Label>
Top 20 Movies
  </Label>
      <Thumbnails
        moviesArray={top20MovieWeek}
        selectedPopupItem={selectedPopupItem}
        setSelectedPopupItem={setSelectedPopupItem}
        setShowDialog={setShowDialog}
        />
        </div>
        <div>
        <Label>
Top 20 TV shows
  </Label>
      <Thumbnails
        moviesArray={top20TvWeek}
        selectedPopupItem={selectedPopupItem}
        setSelectedPopupItem={setSelectedPopupItem}
        setShowDialog={setShowDialog}
        />
        </div>
    </Wrapper>
  );
};

export default Homepage;

const Wrapper = styled.div`
  margin: 0;
  z-index: 1;
  top: 0px;
  background-color: white;
`;
const FirstImage = styled.img`
  width: 100%;
  z-index: -1;
  display: block;
  margin-top: calc(var(--header-height) * -1);
`;
export const PlaceHolder = styled.div`
  height: var(--header-height);
`;
export const Label = styled.div`
  position:absolute;
  z-index:1;
  margin-left:20px;
  margin-top:20px;
  background-color: yellow;
  font-weight:bold;
  padding:5px;
  border-radius:10px;
  color:gray;
`;
