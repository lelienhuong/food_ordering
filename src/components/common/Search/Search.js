import React from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";

function Search(props) {
  const animatedComponents = makeAnimated();
  let optionsInBillCreate = useSelector((state) => state.options);
  let options = [];
  if (props.name === "listGuestIDs") {
    options = props.options;
  } else {
    let selectionFieldName = `${props.name}Option`;
    options = optionsInBillCreate[selectionFieldName];
  }
  let values = props.values;
  let hasValue = [];
  if (props.name === "groups" && values !== null) {
    options.map((option, index) => {
      if (option.label == values.label) {
        hasValue.push(options[index]);
      }
    });
  } else {
    if (typeof values !== "undefined" && values !== null && options !== null) {
      values.map((value) => {
        options.map((option, index) => {
          if (option.label == value.label) {
            hasValue.push(options[index]);
          }
        });
      });
    }
  }
  const handleSelected = (e) => {
    props.handleSelected({ [props.name]: e });
  };
  return (
    <Select
      defaultValue={hasValue}
      onChange={(e) => handleSelected(e)}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti={props.name === "groups" ? false : true}
      options={options}
    />
  );
}

export default Search;
