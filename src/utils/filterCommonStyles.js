import { makeStyles } from "@material-ui/core/styles";
import { colors } from "./constant";

const filterCommonStyles = makeStyles((theme) => ({
  filterWrapper: {
    "& .filter-wrapper": {
      marginTop: "30px",
      marginBottom: "30px",
      "&.white-card": {
        padding: "20px 25px",
      },
      "@media (max-width: 1359px)": {
        padding: "0 !important",
        backgroundColor: "transparent !important",
        boxShadow: "none !important",
      },
      "@media (max-width: 767px)": {
        marginBottom: "20px !important",
        marginTop: "20px !important",
      },
      "& .btn-wrapper": {
        display: "none",
        "& .blue-btn": {
          marginLeft: "auto",
          height: "50px",
          lineHeight: "50px",
          "@media (max-width: 574px)": {
            width: "100%",
          },
          "& img": {
            marginRight: 8,
          },
        },
        "@media (max-width: 1359px)": {
          display: "block",
        },
      },
      "& .filter-btn-wrapper": {
        display: "none",
        "@media (max-width: 1359px)": {
          display: "flex",
          alignItems: "center",
          marginBottom: "0 !important",
          marginTop: "50px !important",
          justifyContent: "space-between",
          "& button": {
            minWidth: 165,
            fontSize: 16,
            fontWeight: 600,
            "@media (max-width: 767px)": {
              minWidth: 100,
            },
          },
          "& button + button": {
            marginLeft: 30,
            "@media (max-width: 374px)": {
              marginLeft: 15,
            },
          },
        },
      },
      "& .filter-title-block": {
        display: "none",
        "@media (max-width: 1359px)": {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          "& img": {
            height: 35,
            width: 35,
            cursor: "pointer",
            padding: 8,
          },
          "& h2": {
            fontSize: 24,
          },
        },
      },
      "& .filter-overlay": {
        display: "none",
        "@media (max-width: 1359px)": {
          display: "block",
          margin: "0",
          position: "fixed",
          width: "100%",
          height: "100%",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          visibility: "hidden",
          opacity: "0",
          zIndex: '10',
          transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          ".open-filter &": {
            opacity: "1",
            visibility: "visible",
          },
        },
      },
      "& .filter-form-row": {
        display: "flex",
        marginRight: "-10px",
        marginLeft: "-10px",
        "@media (max-width: 1359px)": {
          flexWrap: "wrap",
          margin: "0",
          position: "fixed",
          width: "100%",
          right: "0",
          top: 0,
          bottom: 0,
          boxShadow: "0 3px 8px 0 rgba(0, 0, 0, 0.24)",
          backgroundColor: colors.white,
          zIndex: "10",
          transform: "translateX(101%)",
          maxHeight: "100vh",
          overflowY: "auto",
          padding: 30,
          maxWidth: 420,
          transition: "all 0.3s",
          "@media (max-width: 575px)": {
            maxWidth: 350,
            padding: "30px 15px 30px 15px",
          },
          "@media (max-width: 424px)": {
            maxWidth: 300,
          },
          "@media (max-width: 374px)": {
            maxWidth: 250,
          },
          ".open-filter &": {
            transform: "none",
          },
          "& .label-text": {
            fontSize: "14px",
          },
        },
        "& .form-gourp": {
          maxWidth: "16.66%",
          flex: "0 0 16.66%",
          paddingLeft: "10px",
          paddingRight: "10px",
          margin: "0",
          "@media (max-width: 1359px)": {
            maxWidth: "100%",
            flex: "0 0 100%",
            paddingLeft: "0",
            paddingRight: "0",
            margin: "0 0 20px",
          },
          "& .label-wrapper": {
            display: "flex",
            justifyContent: "space-between",
            "& .clear": {
              color: colors.orange,
              fontSize: "14px",
              cursor: "pointer",
              paddingLeft: "10px",
            },
          },
          "& .MuiInputBase-input": {
            "&::placeholder": {
              opacity: "0.5",
            },
          },
          "& .MuiSelect-select.MuiSelect-select, & .MuiInputBase-input": {
            height: "45px",
            lineHeight: "45px",
            padding: "0 30px 0 20px !important",
          },
        },
      },
    },
  },
}));

export { filterCommonStyles };
