import { useState, useEffect } from "react";
import styled from "styled-components";
import Suggestion from "./Suggestion";

const Search = ({ suggestions, handleSelect, text, setText }) => {
  // const Search = ({ suggestions, handleSelect ,categories}) =>{

  // const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

  return (
    <div>
      <StyledInput
        type="text"
        id="input"
        autoComplete="off"
        onChange={(e) => {
          setText(e.target.value);
          // if (text.length >= 2) {
          //   setFilteredSuggestions(
          //     suggestions.filter((item) =>
          //       item.title?.toLowerCase().includes(text.toLowerCase())
          //     )
          //   );
          // } else setFilteredSuggestions([]);
        }}
        onKeyDown={(ev) => {
          switch (ev.key) {
            case "Enter": {
              handleSelect(suggestions[selectedSuggestionIndex]?.title);
              return;
            }
            case "ArrowUp": {
              if (selectedSuggestionIndex <= 0) setSelectedSuggestionIndex(0);
              else setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
              return;
            }
            case "ArrowDown": {
              if (suggestions.length > selectedSuggestionIndex + 1)
                setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
              else setSelectedSuggestionIndex(suggestions.length - 1);
              return;
            }
          }
        }}
        value={text}
      />
      <StyledButton
        onClick={() => {
          setText("");
          // setFilteredSuggestions([]);
        }}
      >
        Clear
      </StyledButton>
      
      {(suggestions.length !== 0 && text.length>2)&& (
        // {filteredSuggestions.length !== 0 && (
        <StyledUl>
          {suggestions.map((suggestion, index) => {
            // {filteredSuggestions.map((suggestion, index) => {
            const isSelected = selectedSuggestionIndex === index ? true : false;
            return (
              <Suggestion
                suggestion={suggestion}
                selectedSuggestionIndex={selectedSuggestionIndex}
                setSelectedSuggestionIndex={setSelectedSuggestionIndex}
                handleSelect={handleSelect}
                index={index}
                text={text}
                isSelected={isSelected}
                title={suggestion.title?suggestion.title:suggestion.name}
                date={suggestion.release_date?suggestion.release_date:suggestion.first_air_date}
              />
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

const StyledUl = styled.ul`
  box-shadow: 0 4px 10px 1px lightgray;
  padding: 10px;
  width: 380px;
`;
