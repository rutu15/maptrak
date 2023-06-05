import { makeStyles } from "@material-ui/core/styles";

import { colors } from "@utils/constant";

const ChartBoxStyle = makeStyles((theme) => ({
  barChart: {},
  ChartBoxWrapper: {
    "& #cargoVolumeBar, & #jobStatusBar": {
      height: "280px !important",
      "@media (max-width: 1279px)": {
        height: "270px !important",
      },
    },
    "& .dashboard-details-wrapper": {
      "& .main-dashboard-content": {
        "@media (max-width: 1199px)": {
          flexWwap: "wrap",
          "& .dashboard-details-inner": {
            maxWidth: "100%",
            flex: "0 0 100%",
          },
        },
      },
      "& .dashboard-details-inner": {
        marginBottom: 30,
        "& .label-text": {
          marginBottom: 15,
        },
        "@media (max-width: 991px)": {
          marginBottom: 20,
        },
        "& .chart-content-wrapper": {
          padding: "0 30px",
          flex: "1",
          "@media(max-width: 1499px)": {
            padding: "0 0 0 15px",
          },
          "@media(max-width: 1359px)": {
            padding: "0 0 0 15px",
          },
          "@media(max-width: 767px)": {
            maxWidth: "100%",
            flex: "0 0 100%",
            padding: "0",
          },
          "& .chart-info": {
            borderTop: "1px solid #e7e4f1",
            paddingTop: "20px",
            marginTop: "12px",
            "& li": {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              "& + li": {
                marginTop: "10px",
              },
              "& .text": {
                fontSize: "14px",
                fontWeight: "500",
                color: colors.gray1,
              },
              "& .chart-info-dot": {
                fontSize: "14px",
                paddingLeft: "17px",
                position: "relative",
                "@media (max-width: 1399px)": {
                  paddingRight: "7px",
                  paddingLeft: "13px",
                },
                "@media (max-width: 1280px)": {
                  fontSize: "12px",
                },
                "&::after": {
                  position: "absolute",
                  content: '" "',
                  height: "12px",
                  width: "12px",
                  borderRadius: "50%",
                  backgroundColor: colors.black,
                  display: "block",
                  left: "0",
                  top: "3px",
                  "@media (max-width: 1399px)": {
                    height: "8px",
                    width: "8px",
                    top: "5px",
                  },
                },
                "&.yellow-text": {
                  color: colors.yellow,
                  cursor: "pointer",
                  "&::after": {
                    backgroundColor: colors.yellow,
                  },
                },
                "&.green-text": {
                  color: colors.green,
                  "&::after": {
                    backgroundColor: colors.green,
                  },
                },
                "&.red-text": {
                  color: colors.darkRed,
                  cursor: "pointer",
                  "&::after": {
                    backgroundColor: colors.darkRed,
                  },
                },
                "&.primary-color-text": {
                  color: colors.primary,
                  cursor: "pointer",
                  "&::after": {
                    backgroundColor: colors.primary,
                  },
                },
              },
            },
          },
        },
        "& .hours-wrapper": {
          display: "flex",
          flexWrap: "wrap",
          margin: "0 -15px",
          height: "100%",
          "@media(max-width: 767px)": {
            margin: "0 -10px",
          },
          "& .hours-inner-wrapper": {
            padding: "0 15px",
            marginBottom: "30px",
            maxWidth: "50%",
            flex: "0 0 50%",
            "@media(max-width: 767px)": {
              padding: "0 10px",
              marginBottom: "20px",
              maxWidth: "100%",
              flex: "0 0 100%",
            },
            "&:nth-last-child(-n + 2)": {
              margin: 0,
              "@media(max-width: 767px)": {
                marginBottom: "20px",
                "&:last-child": {
                  marginBottom: "0",
                },
              },
            },
            "& .white-card": {
              padding: "35px 30px",
              height: "100%",
              "@media(max-width: 767px)": {
                padding: "20px 15px",
              },
              "& .hours": {
                fontSize: "24px",
                fontWeight: "600",
                color: colors.orange,
                display: "block",
                marginBottom: "1px",
              },
            },
          },
        },
        "& .inner-white-box": {
          padding: "30px",
          "& .data-text": {
            height: "80%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: "5px",
            paddingRight: "5px",
            "@media (max-width: 650px)": {
              flex: "0 0 100%",
              maxWidth: "100%",
            },
            "& h2": {
              fontWeight: "600",
              fontSize: "22px",
              color: colors.lightBlack,
              fontFamily: "'Montserrat', sans-serif",
              lineHeight: "1.321",
              "@media (max-width: 1599px)": {
                fontSize: "18px",
              },
              "@media (max-width: 1199px)": {
                marginBottom: "5px",
              },
              "& span": {
                color: colors.primary,
                display: "inline-block",
              },
            },
          },
          "& .data-text-2": {
            height: "55%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: "5px",
            paddingRight: "5px",
            "@media (max-width: 650px)": {
              flex: "0 0 100%",
              maxWidth: "100%",
            },
            "& h2": {
              fontWeight: "600",
              fontSize: "22px",
              color: colors.lightBlack,
              fontFamily: "'Montserrat', sans-serif",
              lineHeight: "1.321",
              "@media (max-width: 1599px)": {
                fontSize: "18px",
              },
              "@media (max-width: 1199px)": {
                marginBottom: "5px",
              },
              "& span": {
                color: colors.primary,
                display: "inline-block",
              },
            },
          },
          "@media (max-width: 767px)": {
            padding: "15px",
          },
        },
        "&.side-content": {
          "& .inner-white-box": {
            height: "100%",
            // display: "flex",
            "@media (max-width: 767px)": {
              flexWrap: "wrap",
            },
            "& .chart-wrapper": {
              "@media (max-width: 767px)": {
                maxWidth: "100%",
                flex: "0 0 100%",
                marginBottom: "20px",
              },
            },
          },
        },
        "&.nospace-wrapper": {
          "& .chart-content-wrapper": {
            padding: "0",
            flex: "inherit",
            marginTop: "25px",
          },
        },
        "&.awb-not-taken-fully": {
          "@media (max-width: 1199px)": {
            maxWidth: "100%",
            flex: "0 0 100%",
          },
        },
      },
      "& .two-coloumn-block": {
        display: "flex",
        marginRight: "-15px",
        marginLeft: "-15px",
        "@media (max-width: 1199px)": {
          flexWrap: "wrap",
        },
        "& .dashboard-details-inner": {
          maxWidth: "50%",
          flex: "0 0 50%",
          paddingLeft: "15px",
          paddingRight: "15px",
          "@media (max-width: 991px)": {
            maxWidth: "100%",
            flex: "0 0 100%",
          },
        },
      },
      "& .three-coloumn-block": {
        display: "flex",
        marginRight: "-15px",
        marginLeft: "-15px",
        "@media (max-width: 1199px)": {
          flexWrap: "wrap",
        },
        "& .dashboard-details-inner": {
          maxWidth: "33.33%",
          flex: "0 0 33.33%",
          paddingLeft: "15px",
          paddingRight: "15px",
          "@media (max-width: 1199px)": {
            maxWidth: "50%",
            flex: "0 0 50%",
          },
          "@media (max-width: 991px)": {
            maxWidth: "100%",
            flex: "0 0 100%",
          },
          "&.jobStatusBar": {
            "@media (max-width: 1199px)": {
              maxWidth: "100%",
              flex: "0 0 100%",
            },
          },
        },
      },
      "& .chart-title": {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginRight: "-5px",
        marginLeft: "-5px",
        marginBottom: "30px",
        "@media (max-width: 1199px)": {
          flexWrap: "wrap",
        },
        "& .title-text": {
          paddingLeft: "5px",
          paddingRight: "5px",
          "@media (max-width: 650px)": {
            flex: "0 0 100%",
            maxWidth: "100%",
          },
          "& h2": {
            fontWeight: "600",
            fontSize: "22px",
            color: colors.lightBlack,
            fontFamily: "'Montserrat', sans-serif",
            lineHeight: "1.321",
            "@media (max-width: 1599px)": {
              fontSize: "18px",
            },
            "@media (max-width: 1199px)": {
              marginBottom: "5px",
            },
            "& span": {
              color: colors.primary,
              display: "inline-block",
            },
          },
        },
      },
      "& .chart-footer-content": {
        marginTop: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        "@media (max-width:1799px)": {
          justifyContent: "center",
        },
        "& p": {
          fontSize: "14px",
          color: colors.lightBlack,
          opacity: "0.7",
          "@media (max-width:1799px)": {
            maxWidth: "100%",
            flex: "0 0 100%",
            marginTop: "5px",
            textAlign: "center",
          },
        },
        "& .chart-info": {
          "& .chart-info-inner": {
            whiteSpace: "nowrap",
            "@media (max-width:1799px)": {
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            },
            "@media (max-width:1199px)": {
              display: "block",
              textAlign: "center",
              whiteSpace: "normal",
            },
            "& span": {
              "@media (max-width:1799px)": {
                maxWidth: "33.33%",
                flex: "0 0 33.33%",
                marginBottom: "5px",
                "@media (max-width:1199px)": {
                  maxWidth: "100%",
                  flex: "initial",
                },
              },
            },
            "& span + span": {
              "@media (max-width:1799px)": {
                marginLeft: "0",
                "@media (max-width:1199px)": {
                  marginLeft: "8px",
                },
              },
            },
          },
        },
      },
      "& .chart-info": {
        paddingLeft: "5px",
        paddingRight: "5px",
        "@media (max-width: 1199px)": {
          flex: "0 0 100%",
          maxWidth: "100%",
        },
        "& .chart-info-inner": {
          "& span": {
            fontSize: "14px",
            paddingLeft: "17px",
            position: "relative",
            "& + span": {
              marginLeft: 16,
              "@media (max-width: 1399px)": {
                marginLeft: 8,
              },
            },
            "@media (max-width: 1399px)": {
              paddingRight: "7px",
              paddingLeft: "13px",
            },
            "@media (max-width: 1280px)": {
              fontSize: "12px",
            },
            "&::after": {
              position: "absolute",
              content: '" "',
              height: "12px",
              width: "12px",
              borderRadius: "50%",
              backgroundColor: colors.black,
              display: "block",
              left: "0",
              top: "3px",
              "@media (max-width: 1399px)": {
                height: "8px",
                width: "8px",
                top: "5px",
              },
            },
          },
          "& span.red-text": {
            color: colors.darkRed,
            "&::after": {
              backgroundColor: colors.darkRed,
            },
          },
          "& span.darkblue-text": {
            color: colors.darkBlue,
            "&::after": {
              backgroundColor: colors.darkBlue,
            },
          },
          "& span.dark-green-text": {
            color: colors.darkGreen,
            cursor: "pointer",
            "&::after": {
              backgroundColor: colors.darkGreen,
            },
          },
          "& span.lightblue-text": {
            color: colors.lightBlue,
            cursor: "pointer",
            "&::after": {
              backgroundColor: colors.lightBlue,
            },
          },
          "& span.sydney-text": {
            color: "#61ebed",
            "&::after": {
              backgroundColor: "#61ebed",
            },
          },
          "& span.melbourn-text": {
            color: "#2438ab",
            "&::after": {
              backgroundColor: "#2438ab",
            },
          },
          "& span.brisbane-text": {
            color: "#8f1414",
            "&::after": {
              backgroundColor: "#8f1414",
            },
          },
          "& span.auckland-text": {
            color: "#141414",
            "&::after": {
              backgroundColor: "#141414",
            },
          },
          "& span.green-text": {
            color: colors.green1,
            "&::after": {
              backgroundColor: colors.green1,
            },
          },
          "& span.light-green-text": {
            color: colors.lightGreen,
            "&::after": {
              backgroundColor: colors.lightGreen,
            },
          },
          "& span.yellow-text": {
            color: colors.yellow1,
            "&::after": {
              backgroundColor: colors.yellow1,
            },
          },
          "& span.light-red-text": {
            color: colors.lightRed1,
            cursor: "pointer",
            "&::after": {
              backgroundColor: colors.lightRed1,
            },
          },
          "& span.dark-red-text": {
            color: colors.darkRed1,
            "&::after": {
              backgroundColor: colors.darkRed1,
            },
          },
        },
      },
      "& .chart-wrapper": {
        display: "flex",
        alignItems: "center",
        "@media (max-width: 479px)": {
          flexWrap: "wrap",
        },
        "& .chart-element": {
          maxWidth: "50%",
          flex: "0 0 50%",
          textAlign: "center",
          "@media (max-width: 479px)": {
            maxWidth: "100%",
            flex: "0 0 100%",
          },
          "& + .chart-element": {
            "@media (max-width: 479px)": {
              marginTop: "20px",
            },
          },
          "& >div": {
            width: "100%",
            "& svg": {
              height: "160px !important",
              "@media (max-width: 1799px)": {
                transform: "scale(1.05)",
                height: "150px !important",
              },
              "@media (max-width: 1549px)": {
                height: "120px !important",
                transform: "scale(1.08)",
              },
              "@media (max-width: 1279px)": {
                height: "110px !important",
              },
              "@media (max-width: 1199px)": {
                height: "150px !important",
                transform: "scale(1)",
              },
              "@media (max-width: 991px)": {
                height: "240px !important",
              },
              "@media (max-width: 767px)": {
                height: "150px !important",
              },
              "@media (max-width: 479px)": {
                height: "220px !important",
              },
              "@media (max-width: 380px)": {
                height: "180px !important",
              },
              "@media (max-width: 374px)": {
                height: "155px !important",
              },
            },
          },
          "& .duration-text": {
            textAlign: "center",
            marginTop: "10px",
            "& .minutes": {
              fontSize: "20px",
              display: "block",
              fontWeight: "600",
              color: colors.lightBlack,
              "@media (max-width: 1599px)": {
                fontSize: "16px",
              },
            },
            "& .time-text": {
              fontSize: "18px",
              display: "block",
              fontWeight: "400",
              color: colors.lightBlack,
              "@media (max-width: 1599px)": {
                fontSize: "14px",
              },
            },
          },
        },
      },
      "& .chart-content-wrapper": {
        padding: "0 30px",
        flex: "1",
        "@media(max-width: 1499px)": {
          padding: "0 0 0 15px",
        },
        "@media(max-width: 1359px)": {
          padding: "0 0 0 15px",
        },
        "@media(max-width: 767px)": {
          maxWidth: "100%",
          flex: "0 0 100%",
          padding: "0",
        },
        "& .chart-info": {
          borderTop: "1px solid #e7e4f1",
          paddingTop: "20px",
          paddingBottom: "60px",
          marginTop: "12px",
          paddingRight: 0,
          paddingLeft: 0,
          "& li": {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            "& + li": {
              marginTop: "10px",
            },
            "& .text": {
              fontSize: "14px",
              fontWeight: "500",
              color: colors.gray1,
            },
          },
        },
      },
    },
  },
}));

export { ChartBoxStyle };
