import { makeStyles } from "@material-ui/core";

const ValidityStyle = makeStyles({
  ValidityWrapper: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    "& .primary-btn.blue-btn": {
      marginLeft: "auto",
      marginTop: "20px",
    },
    "& .date-wrapper": {
      "& .MuiBackdrop-root": {
        color: " #fff",
        zIndex: "1200000",
      },
      maxWidth: "100%",
      "@media (max-width: 767px)": {
        maxWidth: "100%",
        flex: "0 0 100%",
      },
      "& .custom-datepicker": {
        "& input": {
          maxWidth: "150px",
          "@media (max-width: 767px)": {
            maxWidth: "100%",
          },
        },
      },
    },
  },
});

export { ValidityStyle };
