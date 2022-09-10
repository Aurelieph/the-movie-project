import styled from "styled-components";

const Suggestion = ({
  handleSelect,
  index,
  text,
  suggestion,
  isSelected,
  selectedSuggestionIndex,
  setSelectedSuggestionIndex,
  title,
  date,
}) => {
  if (!title.toLowerCase().includes(text.toLowerCase())) {
    return "";
  } else
    return (
      <Wrapper
        onMouseEnter={() => {
          setSelectedSuggestionIndex(index);
        }}
        onClick={() => handleSelect(suggestion)}
        style={{
          background: isSelected
            ? "hsla(50deg, 100%, 80%, 0.25)"
            : "transparent",
        }}
      >
        {/* {console.log("suggestion.id",suggestion.id)} */}
        {suggestion.poster_path ? (
          <MovieImg
            src={`http://image.tmdb.org/t/p/w92/${suggestion.poster_path}`}
          />
        ) : (
          <ImgPlaceholder />
        )}
        <span>
          {title.substr(0, title.toLowerCase().indexOf(text.toLowerCase()))}

          <Prediction>
            {title.substr(
              title.toLowerCase().indexOf(text.toLowerCase()),

              text.length
            )}
          </Prediction>
          <span>
            {title.substr(
              title.toLowerCase().indexOf(text.toLowerCase()) + text.length
            )}
          </span>
          <Date>- {date?.substr(0, 4)}</Date>
          <Media>{suggestion.media_type}</Media>
        </span>
      </Wrapper>
    );
};

export default Suggestion;

const Wrapper = styled.li`
  padding: 15px;
  &:hover {
    cursor:pointer;
    background-color: rgb(255, 250, 228);
  }
  display: flex;
  align-items: center;
  height: 60px;
`;
const Media = styled.span`
  font-size: 10px;
  margin-left: 5px;
  font-style: italic;
  font-weight: bold;
`;
const MovieImg = styled.img`
  height: 60px;
  margin-right: 5px;
  &:hover {
    height: 110px;
    /* position:absolute; */
    margin-left: -15px;
  }
`;
const ImgPlaceholder = styled.div`
  height: 60px;
  margin-right: 5px;
  width: 45px;
  border: 1px solid gray;
`;
const Date = styled.span`
  font-size: 14px;
  margin-left: 10px;
`;

const Prediction = styled.span`
  font-weight: bold;
`;
