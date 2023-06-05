import { makeStyles } from "@material-ui/core";

const MinimumInvoiceStyle = makeStyles({
  MinimumInvoiceWrapper: {
      overflow: "auto",
    "& .primary-btn.blue-btn": {
    //   marginLeft: "auto",
      marginTop: "20px",
    },
    "& .error-text": {
      color: "red",
    },
    "& .invoiceValue": {
      width: "300px",
    },
    "& .cost": {
      width: "120px",
    },
    "& .label-text": {
      paddingRight: "15px",
      lineHeight: "3",
      margin: "0",
      "& .normal-text": {
        fontWeight: "100",
      },
      "& .normal-input": {
        fontWeight: "100",
        paddingBottom: "10px"
      },
      "& .normal-doller": {
        fontWeight: "100",
        // paddingBottom: "10px",
        paddingTop: "10px",
        justifyContent: "center",
        height: "20px",
        fontSize:"15px",
        
      },
      "@media(max-width:767px)": {
        maxWidth: "100%",
        flex: "0 0 100%",
        paddingRight: "0",
        margin: "0 0 10px",
      },
    },
    "& .label-doller": {
        paddingRight: "5px",
        lineHeight: "3",
        margin: "0",
        display:"inline",
        fontWeight: "600",
        "& .normal-text": {
          fontWeight: "100",
        },
        "& .normal-input": {
          fontWeight: "100",
          paddingBottom: "10px"
        },
        "& .normal-doller": {
          fontWeight: "100",
          // paddingBottom: "10px",
          paddingTop: "10px",
          justifyContent: "center",
          height: "20px",
          fontSize:"15px",
          
        },
        "@media(max-width:767px)": {
          maxWidth: "100%",
          flex: "0 0 100%",
          paddingRight: "0",
          margin: "0 0 10px",
        },
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
      },
    },
  },
});

export { MinimumInvoiceStyle };
