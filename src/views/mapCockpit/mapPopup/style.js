import { makeStyles } from "@material-ui/core";

import { colors } from "@utils/constant";

const MapPopupStyle = makeStyles({
  MapPopupWrapper: {
    "& .map-popup-block": {
      boxShadow: "0 2px 16px 0 rgba(100, 100, 100, 0.28)",
      backgroundColor: colors.white,
      borderRadius: "6px",
      width: "490px",
      margin: "0 auto",
      position: "relative",
      fontSize: "16px",
      fontFamily: "'Montserrat', sans-serif",
      "@media (max-width:767px)": {
        width: "418px",
      },
      "@media (max-width:574px)": {
        width: "345px",
      },
      "@media (max-width:424px)": {
        width: "320px",
      },
      "@media (max-width:374px)": {
        width: "260px",
      },
      "&:before": {
        top: "0",
        left: "50%",
        right: "auto",
        width: "12px",
        height: "12px",
        content: '" "',
        position: "absolute",
        transform: "rotate(55deg) skewX(20deg) translateX(-50%)",
        boxShadow: "0 0px 0px 0 rgb(100 100 100 / 27%)",
        backgroundColor: colors.white,
      },
      "& .footer-btn-wrapper": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
        "@media (max-width:574px)": {
          flexWrap: "wrap",
        },
        "& button": {
          minWidth: "210px",
          height: "45px",
          fontWeight: "500",
          lineHeight: "45px",
          display: "flex",
          flex: "0 0 100%",
          alignItems: "center",
          "@media (max-width:574px)": {
            maxWidth: "100%",
            flex: "0 0 100%",
          },
          "&.gray-border-btn": {
            borderWidth: "2px",
            backgroundColor: colors.grayMap,
            borderColor: colors.grayMap,
            color: colors.grayMap2,
            "&.disabled": {
              fontWeight: "400",
              borderColor: colors.grayMap,
              backgroundColor: colors.grayMap,
              cursor: "default",
              pointerEvents: "none",
            },
            "@media (max-width:574px)": {
              marginTop: "20px",
            },
          },
          "&.blue-btn": {
            border: "solid 2px #00aeef",
            boxShadow: "none",
            backgroundColor: colors.lightblue1,
            color: colors.skyblue,
            textTransform: "capitalize",
            "& img": {
              marginRight: "10px",
            },
          },
        },
      },
      "& .map-popup-block-inner": {
        padding: "22px 25px",
        "@media (max-width:767px)": {
          padding: "20px 15px",
          maxHeight: "450px",
          overflowY: "auto",
        },
      },
      "& .waiting-time-wrapper": {
        "& p": {
          backgroundColor: colors.red2,
          color: colors.white,
          padding: "15px 25px",
          borderRadius: "0 0 6px 6px",
          textTransform: "none",
        },
      },
      "& h2": {
        textAlign: "center",
      },
      "& h2, & h3": {
        fontSize: "20px",
        fontWeight: "600",
        color: colors.primary,
        marginBottom: "12px",
        textTransform: "uppercase",
        "@media (max-width:767px)": {
          fontSize: "18px",
        },
      },
      "& .job-number": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "16px",
        "& a": {
          color: colors.skyblue,
          fontWeight: "500",
          textDecoration: "none !important",
        },
      },
      "& .tracking-process": {
        "& h3": {
          color: colors.orange,
          marginBottom: "18px",
        },
        "& h4": {
          fontSize: "18px",
          fontWeight: "600",
          color: colors.orange,
          marginBottom: "10px",
          textTransform: "capitalize",
        },
        "& .tracking-row": {
          "&.no-data": {
            "& .tracking-list": {
              "& li": {
                "& .timing-text": {
                  textAlign: "center",
                  "@media (max-width:574px)": {
                    textAlign: "left",
                  },
                },
              },
            },
          },
          "& + .tracking-row": {
            borderTop: "1px solid #f5f5f5",
            paddingTop: "20px",
            marginTop: "25px",
          },
          "& .tracking-list": {
            "& li": {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              "@media (max-width:574px)": {
                flexWrap: "wrap",
              },
              "& p": {
                maxWidth: "50%",
                flex: "0 0 50%",
                "@media (max-width:574px)": {
                  maxWidth: "100%",
                  flex: "0 0 100%",
                },
              },
              "& + li": {
                marginTop: "12px",
                "@media (max-width:574px)": {
                  marginTop: "15px",
                },
              },
              "& .timing-text": {
                fontWeight: "500",
                textAlign: "right",
                "& .link": {
                  color: "red",
                },
                "@media (max-width:574px)": {
                  textAlign: "left",
                  marginTop: "2px",
                },
              },
              "& .timing-text-link": {
                fontWeight: "500",
                textAlign: "right",
                color: colors.primary,
                "@media (max-width:574px)": {
                  textAlign: "left",
                  marginTop: "2px",
                },
              },
            },
          },
        },
      },
    },
  },
});

export { MapPopupStyle };
