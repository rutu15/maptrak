import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const AccountPageStyle = makeStyles((theme) => ({
  AccountPageWrapper: {
    "& .MuiBackdrop-root": {
      color: " #fff",
      zIndex: "1201",
    },
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
          "@media (max-width: 991px)": {
            flexWrap: "wrap",
          },
          "& .form-group": {
            marginBottom: "25px",
          },
          "& .two-column": {
            flex: "0 0 50%",
            maxWidth: "50%",
            padding: "0 15px",
            "@media (max-width: 991px)": {
              flex: "0 0 100%",
              maxWidth: "100%",
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
              "& + .form-outer": {
                marginTop: "10px",
              },
              "& .form-row": {
                display: "flex",
                margin: "0 -15px",
                "@media (max-width: 991px)": {
                  flexWrap: "wrap",
                },
                "& .form-group": {
                  marginBottom: "25px",
                },
                "& .two-column": {
                  flex: "0 0 50%",
                  maxWidth: "50%",
                  padding: "0 15px",
                  "@media (max-width: 991px)": {
                    flex: "0 0 100%",
                    maxWidth: "100%",
                  },
                },
              },
            },
          },
        },
        "& .upload-img-wrapper": {
          position: "relative",
          display: "inline-block",
          marginBottom: "29px",
          "& .img-block": {
            "& img": {
              margin: "0 0 15px",
              height: "120px",
              width: "auto",
              borderRadius: "50%",
              // objectFit: "cover",
            },
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "130px",
            width: "auto",
            borderRadius: "50%",
          },
          "& .form-gourp": {
            position: "absolute",
            bottom: "0px",
            right: "13px",
            margin: "0 !important",
            cursor: "pointer",
            "& input[type='file']": {
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              height: "100%",
              width: "100%",
              opacity: "0",
              zIndex: "4",
              lineHeight: "1",
              cursor: "pointer",
            },
            "&  ::-webkit-file-upload-button": {
              cursor: "pointer",
            },
          },
        },
      },
    },
  },
}));

export { AccountPageStyle };
