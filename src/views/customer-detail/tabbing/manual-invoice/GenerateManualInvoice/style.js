import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const CurrentActivityStyle = makeStyles({
  CurrentActivityWrapper: {
    "& .MuiBackdrop-root": {
      color: " #fff",
      zIndex: "1201",
    },
  },
  selectOrg: {
    width: "250px",
    maxWidth: "300px",
    marginLeft: "10px",
  },
  tabHeadingRow: {
    display: "flex",
    // alignItems: "center",
    flexWrap: "wrap",
    margin: "0 -8px",
    "& .date-wrapper": {
      "@media (max-width: 767px)": {
        maxWidth: "100%",
        flex: "0 0 100%",
      },
      "& .custom-datepicker": {
        "& input": {
          maxWidth: "183px",
          "@media (max-width: 1000px)": {
            maxWidth: "100%",
          },
        },
      },
    },
    "& .btn-wrapper": {
      maxWidth: "100%",
      flex: "0 0 100%",
      padding: "0 8px",
      marginTop: "8px",
      "@media (max-width: 767px)": {
        marginTop: "20px",
      },
      "& .btn-inner-wrapper": {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        margin: "0 -10px",
        "& .btn-inner": {
          padding: "0 10px",
          marginBottom: "15px",
          "@media (max-width: 767px)": {
            width: "100%",
          },
        },
        "& .btn-inner1": {
          padding: "0 10px",
          marginBottom: "15px",
          width: "300px",
          "@media (max-width: 767px)": {
            width: "100%",
          },
        },
        "& button": {
          height: "50px",
          lineHeight: "50px",
          fontSize: "16px",
          fontWeight: "600",
          minWidth: "208px",
          boxShadow: "none",
          border: "1px solid #e7e4f1",
          color: colors.primary,
          textTransform: "uppercase",
          backgroundColor: "transparent",
          "&.orange-btn": {
            color: colors.white,
            "@media (max-width: 374px)": {
              padding: "0 5px",
              fontSize: "12px",
            },
            "&:hover": {
              color: colors.white,
            },
          },
          "&:hover": {
            boxShadow: "none",
            color: colors.primary,
            backgroundColor: "transparent",
          },
          "@media (max-width: 767px)": {
            width: "100%",
            fontSize: "14px",
          },
          "& .MuiButton-label": {
            display: "flex",
            alignItems: "center",
          },
          "& img": {
            width: "20px",
            height: "20px",
            marginRight: "10px",
          },
          "& + button": {
            marginLeft: "20px",
            "@media (max-width: 767px)": {
              margin: "15px 0 0 0",
            },
          },
        },
      },
    },
    "& .jobtype-wrapper, & .date-wrapper": {
      maxWidth: "270px",
      flex: "0 0 270px",
      padding: " 0 8px",
      marginBottom: "15px",
      "@media (max-width: 1600px)": {
        maxWidth: "250px",
        flex: "0 0 250px",
      },
      "@media (max-width: 991px)": {
        maxWidth: "50%",
        flex: "0 0 50%",
      },
      "@media (max-width: 767px)": {
        maxWidth: "100%",
        flex: "0 0 100%",
        margin: "18px 0 0",
      },
    },
  },
  modalWrapper: {
    marginLeft: "15px",
    "@media (max-width: 1649px)": {
      margin: "15px 0 0 0",
      flex: "0 0 100%",
      maxWidth: "100%",
      order: "5",
    },
    "& button": {
      "@media (max-width: 767px)": {
        width: "100%",
      },
    },

    "& button.primary-btn": {
      height: "50px",
      lineHeight: "50px",
      fontSize: "16px",
      fontWeight: "600",
      minWidth: "208px",
      textTransform: "uppercase",
      "@media (max-width: 574px)": {
        width: "100%",
        textTransform: "capitalize",
        fontSize: "14px",
      },
    },
  },
  customCardWrapper: {
    marginTop: "20px",
    "& .custom-card": {
      borderRadius: "4px",
      border: "solid 1px #e3e3e3",
      overflow: "hidden",
      backgroundColor: colors.white,
      "& + .custom-card": {
        marginTop: "20px",
      },
      "& .card-body": {
        padding: "0 20px 15px",
        "@media(max-width:767px)": {
          padding: "0 15px 15px",
        },
        "&.disabled": {
          opacity: 0.4,
          cursor: "default",
          pointerEvents: "none",
        },
        "& .nett-tax-gross-list": {
          display: "flex",
          alignItems: "center",
          "& li": {
            fontSize: "14px",
            color: colors.black2,
            position: "relative",
            marginRight: "20px",
            "&:last-child": {
              margin: "0",
            },
            "& span": {
              fontWeight: "600",
              "@media(max-width:479px)": {
                display: "block",
              },
            },
          },
        },
      },
      "& .card-header": {
        padding: "16px 20px 10px 20px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        "@media(max-width:767px)": {
          padding: "15px 15px 10px 15px",
        },
        "& .left-card-header": {
          "& .job-status-wrapper": {
            display: "flex",
            alignItems: "center",
            "& >span": {
              marginLeft: "10px",
              fontWeight: "600",
            },
            "& .invoice-generated": {
              color: "#26da8b",
            },
            "& .review-completed": {
              color: colors.green1,
            },
            "& .review-not-completed": {
              color: colors.primary,
            },
          },
          "@media (max-width: 479px)": {
            flex: "0 0 100%",
            maxWidth: "100%",
            margin: "0 0 15px 0",
          },
          "& .custom-checkbox": {
            "& img": {
              width: "18px",
              height: "18px",
              borderRadius: "2px",
            },
            "& .MuiFormControlLabel-label": {
              fontWeight: "600",
              marginLeft: "2px",
            },
          },
          "& .info-content-list": {
            display: "flex",
            alignItems: "center",
            "& li": {
              fontSize: "14px",
              color: colors.gray3,
              position: "relative",
              paddingRight: "15px",
              marginRight: "15px",
              "&:before": {
                content: '" "',
                position: "absolute",
                backgroundColor: colors.gray3,
                height: "4px",
                width: "4px",
                borderRadius: "50%",
                right: "0",
                top: "50%",
                transform: "translateY(-50%)",
              },
              "&:last-child": {
                padding: "0",
                margin: "0",
                "&:before": {
                  display: "none",
                },
              },
            },
          },
        },
        "& .right-card-header": {
          "@media (max-width: 479px)": {
            flex: "0 0 100%",
            maxWidth: "100%",
          },
          "& button": {
            height: "50px",
            lineHeight: "50px",
            color: colors.primary,
            backgroundColor: "rgba(0, 84, 142, 0.08)",
            boxShadow: "none",
          },
        },
      },
    },
  },
});


export { CurrentActivityStyle };

