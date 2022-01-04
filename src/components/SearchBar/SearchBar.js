import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
const SearchBar = (props) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleKeyword = (e) => {
    e.preventDefault();
    dispatch({ type: "SEARCH", payload: { data: e.target.value } });
    setInput(e.target.value);
  };

  return (
    <div>
      <TextField
        value={input}
        onChange={(e) => handleKeyword(e)}
        label={props.label}
        type="search"
        color={props.color}
        style={props.style === undefined ? {} : props.style}
      />
    </div>
  );
};

export default SearchBar;
