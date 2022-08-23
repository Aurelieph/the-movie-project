import deadpool from "./images/deadpool.jpg";
import styled from "styled-components";
import Header from "./Header";
import { useEffect, useState } from "react";
import Thumbnail from "./Thumbnail";
import { NUMBER_THUMBNAILS } from "../Constants";

const Homepage = () => {
  const [thumbnailsTop20Movie, setThumbnailsTop20Movie] = useState([]);
  const [top20MovieWeek, setTop20MovieWeek] = useState([]);

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
  }, []);

  useEffect(() => {
    setThumbnailsTop20Movie(top20MovieWeek.slice(0, NUMBER_THUMBNAILS));
  }, [top20MovieWeek]);

  const handleForward = () => {
    const firstElementId = thumbnailsTop20Movie[0].id;
    const lastElementPosition = top20MovieWeek
      .map((el) => el.id)
      .indexOf(thumbnailsTop20Movie[NUMBER_THUMBNAILS - 1].id);
    if (lastElementPosition < top20MovieWeek.length - 1) {
      setThumbnailsTop20Movie((prevArray) =>
        prevArray.filter((movie) => movie.id !== firstElementId)
      );
      setThumbnailsTop20Movie((prevArray) => [
        ...prevArray,
        top20MovieWeek[lastElementPosition + 1],
      ]);
    }
  };
  const handleBackward = () => {
    const lastElementId = thumbnailsTop20Movie[NUMBER_THUMBNAILS - 1].id;
    const firstElementPosition = top20MovieWeek
      .map((el) => el.id)
      .indexOf(thumbnailsTop20Movie[0].id);
    if (firstElementPosition > 0) {
      setThumbnailsTop20Movie((prevArray) =>
        prevArray.filter((movie) => movie.id !== lastElementId)
      );
      setThumbnailsTop20Movie((prevArray) => [
        top20MovieWeek[firstElementPosition - 1],
        ...prevArray,
      ]);
    }
  };

  return (
    <Wrapper>
      <Header />
      <FirstImage src={deadpool} />
      <Thumbnails>
        <ForwardButton onClick={handleBackward}>{"<"}</ForwardButton>
        {thumbnailsTop20Movie.map((thumbnail) => {
          return (
            <div key={`key-${thumbnail.id}`}>
              <Thumbnail movie={thumbnail} />
            </div>
          );
        })}
        <ForwardButton onClick={handleForward}>{">"}</ForwardButton>
      </Thumbnails>
    </Wrapper>
  );
};

export default Homepage;

const Wrapper = styled.div`
  margin: 0;
  z-index: 1;
  top: 0px;
  position: relative;
  /* background-color:yellow; */
  background-color: darkgray;
`;
const Thumbnails = styled.div`
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
const ForwardButton = styled.button``;
