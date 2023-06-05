import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const TrailerStyle = makeStyles((theme) => ({
  TrailerWrapper: {
    "& .setting-page": {
      "& h1": {
        color: colors.darkBlack,
        textTransform: "none",
      },
      "& .right-content": {
        "& .right-content-inner": {
          padding: "30px",
          "@media (max-width: 767px)": {
            padding: "20px",
          },
        },
      },
    },
  },
  innerPageTopBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "25px",
    "@media (max-width: 991px)": {
      flexWrap: "wrap",
    },
    "& h1": {
      fontSize: "30px",
      color: colors.black,
      textTransform: "capitalize",
      margin: "0 20px 0 0",
      "@media (max-width: 1279px)": {
        margin: "0 0 20px 0",
      },
      "@media (max-width: 374px)": {
        fontSize: "24px",
      },
    },
    "& .right-block": {
      flex: "1",
      "@media (max-width: 1279px)": {
        flex: "0 0 100%",
        maxWidth: "100%",
      },
      "& .right-block-inner": {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        flexWrap: "wrap",
        "@media (max-width: 991px)": {
          flexWrap: "wrap",
        },
        "& .modal-wrapper": {
          marginLeft: "15px",
          "@media (max-width: 1023px)": {
            margin: "20px 0 0 0",
            flex: "0 0 100%",
            maxWidth: "100%",
          },
          "& .btn-wrapper": {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            "& .primary-btn": {
              fontSize: "16px",
              fontWeight: "600",
              minWidth: "160px",
              lineHeight: "50px",
              textTransform: "uppercase",
              height: "50px",
              "@media (max-width: 574px)": {
                width: "100%",
              },
            },
          },
        },
        "& .search-wrapper": {
          maxWidth: "360px",
          flex: "0 0 360px",
          "@media (max-width: 1499px)": {
            maxWidth: "250px",
            flex: "0 0 250px",
          },
          "@media (max-width: 1023px)": {
            flex: "0 0 100%",
            maxWidth: "100%",
          },
          "& .form-gourp": {
            "& .MuiOutlinedInput-adornedEnd": {
              padding: "0",
              position: "relative",
              "& img": {
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                right: "15px",
              },
            },
            "& input": {
              color: colors.light_black,
              letterSpacing: 0,
              backgroundColor: colors.white,
              padding: "0 35px 0 15px !important",
              "&::placeholder": {
                opacity: "0.5",
                color: colors.light_black,
              },
            },
          },
        },
      },
    },
    "& .left-block": {
      paddingRight: "10px",
      "@media (max-width: 991px)": {
        flex: "0 0 100%",
        maxWidth: "100%",
      },
    },
  },
  fileInput: {
    display: "block",
    position: "relative",
    marginRight: "15px",
    maxWidth: "222px",
    "&:hover": {
      opacity: "0.4",
    },
    "@media (max-width: 574px)": {
      margin: "0 0 20px 0",
      flex: "0 0 100%",
      maxWidth: "100%",
    },
    "& .MuiFormControl-root": {
      opacity: 0,
      overflow: "hidden",
      position: "absolute",
      right: "0",
      left: "0",
      "& input": {
        cursor: "pointer",
        fontSize: "0",
      },
    },
    "& .label-block": {
      width: "100%",
      border: " 1px solid #e7e4f1",
      height: "50px",
      margin: 0,
      display: "flex",
      alignItems: "center",
      padding: "0 15px",
      transition: "all 0.3s",
      lineHeight: "50px",
      borderRadius: "6px",
      cursor: "pointer",
      "& .file-name": {
        color: colors.primary,
        display: "block",
        fontWeight: "600",
        fontSize: "16px",
        marginLeft: "10px",
        lineHeight: "1.321",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        textTransform: "uppercase",
      },
      "& img": {
        height: "20px",
        width: "20px",
      },
    },
  },
}));

export { TrailerStyle };
