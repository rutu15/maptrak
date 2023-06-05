import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const StaffUserStyle = makeStyles({
  StaffListingWrapper: {
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
      "& .form-outer": {
        "& .form-row": {
          display: "flex",
          margin: "0 -15px",
          "@media (max-width: 767px)": {
            flexWrap: "wrap",
          },
          "& .form-group": {
            marginBottom: "25px",
          },
          "& .two-column": {
            flex: "0 0 50%",
            maxWidth: "50%",
            padding: "0 15px",
            "@media (max-width: 767px)": {
              flex: "0 0 100%",
              maxWidth: "100%",
            },
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
    "@media (max-width: 991px)": {
      flexWrap: "wrap",
    },
    "& h1": {
      fontSize: "30px",
      color: colors.black,
      textTransform: "capitalize",
      margin: "0 20px 0 0",
      "@media (max-width: 1199px)": {
        margin: "0 0 20px 0",
      },
    },
    "& .right-block": {
      flex: "1",
      "@media (max-width: 1199px)": {
        flex: "0 0 100%",
        maxWidth: "100%",
      },
      "& .right-block-inner": {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        "@media (max-width: 991px)": {
          flexWrap: "wrap",
        },
        "& .modal-wrapper": {
          marginLeft: "15px",
          "@media (max-width: 991px)": {
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
});

export { StaffUserStyle };
