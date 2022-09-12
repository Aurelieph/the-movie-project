import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Suggestion from "./Suggestion";

const Search = ({ suggestions, handleSelect, text, setText, showDialog }) => {
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const [activeSugg, setActiveSugg] = useState(true);
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref && ref.current) {
        const myRef = ref.current;
        if (!myRef.contains(e.target)) {
          setActiveSugg(false);
        }
      }
    };
    document.addEventListener("click", handleClick);
    return (() => document.removeEventListener("click", handleClick))
  }, []);

  return (
    <div ref={ref}>
      <StyledInput 
        type="text"
        id="input"
        autoComplete="off"
        placeholder="Movie / TV-Show Title"
        onChange={(e) => {
          setActiveSugg(true)
          setText(e.target.value);
        }}
        onClick={() => setActiveSugg(true)}
        onKeyDown={(ev) => {
          switch (ev.key) {
            case "Enter": {
              handleSelect(suggestions[selectedSuggestionIndex]);
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
        }}
      >
        Clear
      </StyledButton>

      {suggestions.length !== 0 &&
        text.length > 2 &&
        showDialog === false &&
        activeSugg && (
          <StyledUl >
            {suggestions.map((suggestion, index) => {
              const isSelected =
                selectedSuggestionIndex === index ? true : false;
              return (
                <Suggestion
                  key={`suggestion-${suggestion.id}`}
                  suggestion={suggestion}
                  selectedSuggestionIndex={selectedSuggestionIndex}
                  setSelectedSuggestionIndex={setSelectedSuggestionIndex}
                  handleSelect={() => handleSelect(suggestion)}
                  index={index}
                  text={text}
                  isSelected={isSelected}
                  title={suggestion.title ? suggestion.title : suggestion.name}
                  date={
                    suggestion.release_date
                      ? suggestion.release_date
                      : suggestion.first_air_date
                  }
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
  border: none;
`;
const StyledInput = styled.input`
  margin: 10px 10px 10px 0;
  width: 300px;
  padding-left: 10px;
  z-index: 1;
`;

const StyledUl = styled.ul`
  box-shadow: 0 4px 10px 1px lightgray;
  padding: 10px;
  width: 380px;
  position: absolute;
  z-index: 1;
  background-color: white;
`;
