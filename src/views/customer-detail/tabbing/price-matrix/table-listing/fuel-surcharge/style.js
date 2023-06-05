import { makeStyles } from "@material-ui/core";

const FuelSurchargeStyle = makeStyles({
  FuelSurchargeWrapper: {
    "& .primary-btn.blue-btn": {
      marginLeft: "auto",
      marginTop: "20px",
    },
    "& .weekly-row-wrapper": {
      "& .MuiBackdrop-root": {
        color: " #fff",
        zIndex: "1200000",
      },
      marginTop: "30px",
      "& .weekly-row": {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        "& + .weekly-row": {
          marginTop: "24px",
        },
        "& .textfield-wrapper": {
          display: "flex",
          flexWrap: "wrap",
          padding: "0 15px",
          flex: "1",
          "@media(max-width:767px)": {
            padding: "0",
            maxWidth: "100%",
            flex: "0 0 100%",
          },
          "& .MuiFormControl-root": {
            maxWidth: "120px",
            "& + .MuiFormControl-root": {
              marginLeft: "20px",
            },
          },
        },
        "& .error-text": {
          color: "red",
        },
        "& .fuel": {
          width: "300px",
        },
        "& .label-text": {
          paddingRight: "15px",
          margin: "0",
          maxWidth: "300px",
          // flex: '0 0 300px',
          "@media(max-width:767px)": {
            maxWidth: "100%",
            flex: "0 0 100%",
            paddingRight: "0",
            margin: "0 0 10px",
          },
        },
      },
    },
  },
});

export { FuelSurchargeStyle };
