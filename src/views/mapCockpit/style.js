import { makeStyles } from "@material-ui/core/styles";

const MapStyle = makeStyles({
  MapWrapper: {
    "& .MuiBackdrop-root": {
      color: " #fff",
      zIndex: "1201",
    },
    paddingBottom: "30px",
    "& .map-block": {
      height: "920px",
      "@media (max-width:1366px)": {
        height: "750px",
      },
      "& .map": {
        position: "relative !important",
        "& .gm-style": {
          "& .gm-style-iw-c": {
            padding: "0 !important",
            maxHeight: "initial !important",
            maxWidth: "100% !important",
            overflow: "visible",
          },
          "& .gm-style-iw-d": {
            // overflowY: 'auto !important',
            overflow: "hidden !important",
            maxHeight: "100% !important",
          },
          "& button.gm-ui-hover-effect": {
            height: "35px !important",
            width: "35px !important",
            top: "-10px !important",
            right: "-10px !important",
            backgroundColor: "#fff !important",
            borderRadius: "50%",
            "box-shadow": "0px 0px 5px 0px rgb(0 0 0 / 10%)",
            display: "flex !important",
            alignItems: "center",
            justifyContent: "center",
            opacity: "1",
            "& img": {
              height: "22px !important",
              width: "22px !important",
            },
          },
        },
      },
    },
    "& .filter-wrapper": {
      display: "block",
      "& .filter-form-row": {
        alignItems: "center",
        flexWrap: "wrap",
        "& .form-gourp": {
          flex: "0 0 15.92%",
          maxWidth: "15.92%",
          "@media (max-width: 1600px)": {
            flex: "0 0 19.28%",
            maxWidth: "19.28%",
            "@media (max-width: 1359px)": {
              flex: "0 0 100%",
              maxWidth: "100%",
            },
          },
          "&.filter-title-block": {
            "@media (max-width: 1359px)": {
              order: "-1",
            },
          },
          "&.reset-column": {
            flex: "0 0 16.56%",
            maxWidth: "16.56%",
            "@media (max-width: 1600px)": {
              flex: "0 0 100%",
              maxWidth: "100%",
              order: "-1",
              marginBottom: "20px",
            },
            "& .reset-wrapper": {
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              "@media (max-width: 1359px)": {
                justifyContent: "space-between",
              },
              "@media (max-width: 767px)": {
                flexWrap: "wrap",
              },
              "& .custom-checkbox": {
                "@media (max-width: 480px)": {
                  margin: "0 0 10px",
                  flex: "0 0 100%",
                  maxWidth: "100%",
                },
                "& .MuiFormControlLabel-label": {
                  fontWeight: "600",
                  margin: 0,
                  lineHeight: "1.321",
                },
              },
              "& .primary-btn.blue-btn": {
                height: "50px",
                lineHeight: "50px",
                textTransform: "initial",
                minWidth: "88px",
                "@media (max-width: 1359px)": {
                  height: "40px",
                  lineHeight: "40px",
                },
              },
            },
          },
        },
      },
    },
  },
});

export { MapStyle };
