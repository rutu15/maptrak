import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { GoogleApiWrapper } from "google-maps-react";
import { TextField } from "@material-ui/core";
import { PlaceFieldStyle } from "./style";

function PlaceTextField(props) {
  const classes = PlaceFieldStyle();
  return (
    <div className={classes.PlaceFieldWrapper}>
      <PlacesAutocomplete
        value={props.value ? props.value.toString() : ""}
        onChange={props.handleChange}
        onSelect={props.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={classes.wrapper}>
            <TextField
              {...getInputProps({
                placeholder: "Search Places ...",
                variant: "outlined",
              })}
              disabled={props.disabled}
            />
            <div className="autocomplete-dropdown-container">
              {
                <div className="autocomplete-dropdown-list-wrapper">
                  <ul>
                    {loading ? (
                      <li>Loading...</li>
                    ) : (
                      suggestions.map((suggestion, index) => (
                        <li {...getSuggestionItemProps(suggestion)} key={index}>
                          {suggestion.description}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              }
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
const LoadingContainer = () => "";

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_PLACE_API,
  LoadingContainer: LoadingContainer,
})(PlaceTextField);
