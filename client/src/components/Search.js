import { useState, useEffect } from "react";
import styled from "styled-components";

const Search = ({ suggestions, handleSelect, text ,setText}) => {
  // const Search = ({ suggestions, handleSelect ,categories}) =>{


  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

  return (
    <div>
      <StyledInput
        type="text"
        id="input"
        onChange={(e) => {
          setText(e.target.value);
          if (text.length >= 2){

            setFilteredSuggestions(
              suggestions.filter((item) =>
              item.title?.toLowerCase().includes(text.toLowerCase())
              )
              );
            }
          else setFilteredSuggestions([]);
        }}
        onKeyDown={(ev) => {
          switch (ev.key) {
            case "Enter": {
              handleSelect(filteredSuggestions[selectedSuggestionIndex]?.title);
              return;
            }
            case "ArrowUp": {
              if (selectedSuggestionIndex <= 0) setSelectedSuggestionIndex(0);
              else setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
              return;
            }
            case "ArrowDown": {
              if (filteredSuggestions.length > selectedSuggestionIndex + 1)
                setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
              else setSelectedSuggestionIndex(filteredSuggestions.length - 1);
              return;
            }
          }
        }}
        value={text}
      />
      <StyledButton
        onClick={() => {
          setText("");
          setFilteredSuggestions([]);
        }}
      >
        Clear
      </StyledButton>
      {filteredSuggestions.length !== 0 && (
        <StyledUl>
          {filteredSuggestions.map((suggestion, index) => {
            const isSelected = selectedSuggestionIndex === index ? true : false;
            return (
              <Suggestion
                onMouseEnter={() => {
                  setSelectedSuggestionIndex(index);
                }}
                key={`suggestion-${index}`}
                onClick={() => handleSelect(suggestion.title)}
                style={{
                  background: isSelected
                    ? "hsla(50deg, 100%, 80%, 0.25)"
                    : "transparent",
                }}
              >
                <span>({suggestion.media_type}) </span>
                <span>
                  {suggestion.title.substr(
                    0,
                    suggestion.title.toLowerCase().indexOf(text) + text.length
                  )}

                  <Prediction>
                    {suggestion.title.substr(
                      suggestion.title.toLowerCase().indexOf(text) + text.length
                    )}
                  </Prediction>
                  <Italic>in</Italic>
                  {/* <Category>{categories[suggestion.categoryId].name}</Category> */}
                </span>
              </Suggestion>
            );
          })}
        </StyledUl>
      )}
    </div>
  );
};

export default Search;

const StyledButton = styled.button`
  background-color: blue;
  color: white;
  width: 70px;
  height: 30px;
  border-radius: 5px;
  border: none;
`;
const StyledInput = styled.input`
  margin: 10px 10px 10px 0;
  width: 300px;
  height: 30px;
  border-radius: 5px;
  border: solid 1px lightgray;
  padding-left: 10px;
`;
const Suggestion = styled.li`
  padding: 15px;
  &:hover {
    background-color: rgb(255, 250, 228);
  }
`;
const StyledUl = styled.ul`
  box-shadow: 0 4px 10px 1px lightgray;
  padding: 10px;
  width: 380px;
`;
const Prediction = styled.span`
  font-weight: bold;
`;
const Italic = styled.span`
  font-style: italic;
  font-size: 14px;
  margin-right: 5px;
  margin-left: 5px;
`;
const Category = styled.span`
  font-style: italic;
  font-size: 14px;
  color: purple;
`;
