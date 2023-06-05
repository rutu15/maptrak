import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@utils/constant";

const PlaceFieldStyle = makeStyles((theme) => ({
  PlaceFieldWrapper: {
    width: "100%",
    "& a": {
      color: colors.red + " ! important",
    },
  },
  wrapper: {
    position: "relative",
    "& .MuiFormControl-root[aria-expanded='true']": {
      "& + .autocomplete-dropdown-container": {
        display: "block",
      },
    },
    "& .autocomplete-dropdown-container": {
      display: "none",
      position: "absolute",
      width: "100%",
      top: "100%",
      zIndex: 9,
      "& .loading": {
        marginTop: "5px",
      },
      "& .autocomplete-dropdown-list-wrapper": {
        backgroundColor: colors.white,
        border: "1px solid #e4e4e4",
        borderRadius: "0 0 6px 6px",
        "& ul": {
          padding: "8px 0",
          maxHeight: "200px",
          overflowY: "auto",
          "& li": {
            fontSize: "16px",
            cursor: "pointer",
            display: "block",
            padding: "0 15px",
            overflow: "hidden",
            boxSizing: "border-box",
            minHeight: "45px",
            lineHeight: "45px",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            "&:hover": {
              color: colors.orange,
              backgroundColor: "rgba(247, 146, 57, 0.2)",
            },
          },
        },
      },
    },
  },
}));

export { PlaceFieldStyle };
