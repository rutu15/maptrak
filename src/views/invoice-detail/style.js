import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const invoiceDetailStyle = makeStyles({
  invoiceDetailWrapper: {
    "& .MuiBackdrop-root": {
      color: " #fff",
      zIndex: "1201",
    },
    maxWidth: "885px",
    margin: "0 auto",
    "& .inner-page": {
      backgroundColor: "transparent",
    },
    "& .invoice-detail-wrapper": {
      fontFamily: "'ArialMT'",
      "& .clearfix": {
        "&:after": {
          display: "table",
          content: "''",
          clear: "both",
        },
      },
      "& .content-wrapper": {
        margin: "0 auto",
        border: "1px solid #e3e3e3",
        "& .header": {
          padding: "15px 14px 14px",
          boxShadow: "0 3px 10px 0 rgb(126 126 126 / 12%)",
          backgroundColor: "#00548e",
          "& .top-header": {
            display: "block",
            borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
            paddingBottom: "5px",
            marginBottom: "9px",
            "& .logo": {
              float: "left",
              width: "100px",
              // width: "33.33%",
            },
            "& .middle-title": {
              float: "left",
              width: "69.33%",
              textAlign: "center",
              "& p": {
                fontFamily: "'ArialMTBold'",
                fontSize: "12px",
                lineHeight: "16px",
                color: "#fff",
              },
              "& h1": {
                fontSize: "10px",
                color: "#fff",
                lineHeight: "19px",
              },
            },
            "& .right-block": {
              float: "right",
              textAlign: "right",
              width: "13.33%",
              "& p": {
                fontSize: "9px",
                color: "#fff",
                lineHeight: "10px",
                marginBottom: "3px",
                "&:first-child": {
                  opacity: "0.8",
                  marginBottom: "3px",
                },
                "& span:first-child": {
                  opacity: "0.5",
                },
                "& span:last-child": {
                  fontFamily: "ArialMTBold",
                },
              },
            },
          },
          "& .bottom-header": {
            "& .left-block": {
              float: "left",
              width: "41.9%",
              paddingRight: "10px",
              "& p": {
                "&:first-child": {
                  fontFamily: "'ArialMTBold'",
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#fff",
                  marginBottom: "4px",
                },
                "&:last-child": {
                  fontSize: "8px",
                  color: "#fff",
                  lineHeight: "12px",
                },
              },
            },
            "& .middle-block": {
              float: "left",
              width: "18%",
              paddingRight: "10px",
              "& p": {
                fontSize: "9px",
                color: "#fff",
                lineHeight: "13px",
                "& + p": {
                  marginTop: "4px",
                },
                "& span": {
                  fontFamily: "ArialMTBold",
                },
                "& a": {
                  fontFamily: "'ArialMTBold'",
                  color: "#fff",
                  textDecoration: "none",
                },
              },
            },
            "& .right-block": {
              float: "right",
              width: "24.1%",
              textAlign: "right",
              "& p": {
                fontSize: "9px",
                color: "#fff",
                lineHeight: "13px",
                "& + p": {
                  marginTop: "4px",
                },
                "& span": {
                  fontFamily: "ArialMTBold",
                },
                "& a": {
                  fontFamily: "'ArialMTBold'",
                  color: "#fff",
                  textDecoration: "none",
                },
              },
            },
          },
        },
        "& .content-block": {
          padding: "14px 14px 47px",
          background: "#fff",
          "& .detail-block": {
            marginBottom: "11px",
            "& .right-block": {
              width: "42.2%",
              float: "right",
              "@media (max-width: 767px)": {
                width: "46%",
              },
              "@media (max-width: 574px)": {
                width: "100%",
                marginTop: "15px",
              },
              "& .shipping-adress-block": {
                "& .inner-col": {
                  float: "right",
                  "&.first": {
                    width: "56%",
                    wordBreak: "break-word",
                  },
                },
              },
              "& .purchase-order": {
                fontSize: "12px",
                color: "#212121",
                lineHeight: "16px",
                "& span": {
                  fontFamily: "'ArialMTBold'",
                },
              },
            },
            "& .left-block": {
              width: "57.8%",
              float: "left",
              "@media (max-width: 767px)": {
                width: "54%",
              },
              "@media (max-width: 574px)": {
                width: "100%",
              },
            },
            "& p": {
              fontSize: "9px",
              color: "#212121",
              lineHeight: "15px",
            },
            "& h2": {
              fontSize: "12px",
              color: "#212121",
              lineHeight: "1",
              fontFamily: "'ArialMTBold'",
              marginBottom: "3px",
            },
          },
          "& .gray-bg-title-strip": {
            backgroundColor: "#f1f1f1",
            padding: "4px 15px",
            borderRadius: "4px",
            marginBottom: "4px",
            "&.total-invoice": {
              "& h3": {
                fontSize: "12px",
                color: "#212121",
                lineHeight: "32px",
                fontFamily: "ArialMT",
              },
              "& .right-block": {
                lineHeight: "2",
                "& p": {
                  fontSize: "12px",
                  color: "#212121",
                  lineHeight: "1",
                  fontFamily: "'ArialMTBold'",
                  "& + p": {
                    marginLeft: "27px",
                  },
                },
              },
            },
            "& h3": {
              fontSize: "10px",
              color: "#212121",
              lineHeight: "18px",
              fontFamily: "'ArialMTBold'",
              float: "left",
              width: "40%",
            },
            "& .right-block": {
              float: "right",
              width: "60%",
              lineHeight: "1",
              textAlign: "right",
              "& p": {
                fontSize: "10px",
                color: "#212121",
                lineHeight: "1",
                display: "inline-block",
                "& span": {
                  marginLeft: "3px",
                  fontFamily: "'ArialMTBold'",
                },
                "& + p": {
                  marginLeft: "13px",
                },
              },
            },
            "& + .table-responsive": {
              marginBottom: "15px",
            },
          },
          "& .table-responsive": {
            position: "relative",
            overflowX: "auto",
            "& table": {
              minWidth: "767px",
              width: "100%",
              border: "1px solid #e3e3e3",
              borderRadius: "6px 6px 0 0",
              borderSpacing: "0",
              borderCollapse: "initial",
              "& thead": {
                borderRadius: "6px 6px 0 0",
                "& tr": {
                  "& th": {
                    padding: "12px 14px 11px",
                    textAlign: "left",
                    fontSize: "10px",
                    color: "#212121",
                    opacity: "0.7",
                    fontWeight: "400",
                    borderBottom: "1px solid #e3e3e3",
                    "&:first-child": {
                      // textAlign: "right",
                    },
                  },
                },
              },
              "& tbody": {
                "& tr": {
                  "&:last-child": {
                    "& td": {
                      paddingBottom: "13px",
                    },
                  },
                  "&.main-data": {
                    "& td": {
                      padding: "15px 14px",
                      textTransform: "uppercase",
                      "&:first-child": {
                        padding: "15px 12px",
                      },
                    },
                  },
                  "&.diff-data": {
                    "& td": {
                      paddingTop: "15px",
                      fontSize: "12px",
                      "& .p-txt": {
                        fontSize: "10px",
                        textTransform: "lowercase",
                      },
                    },
                  },
                  "&.rigid-data": {
                    "& td": {
                      // paddingTop: "15px",
                      fontSize: "12px",
                      "& .p-txt": {
                        fontSize: "10px",
                        textTransform: "lowercase",
                      },
                    },
                  },

                  "& td": {
                    fontSize: "10px",
                    color: "#212121",
                    padding: "2px 14px",
                  },
                },
              },
              "& tfoot": {
                "& tr": {
                  "&.diff-data": {
                    "& td": {
                      paddingTop: "15px",
                      fontSize: "12px",
                      "& p": {
                        marginLeft: "10px",
                      },
                      "& .p-txt": {
                        fontSize: "10px",
                        textTransform: "lowercase",
                      },
                    },
                  },
                  "&.rigid-data": {
                    "& td": {
                      fontSize: "12px",
                      "& p": {
                        marginLeft: "10px",
                      },
                      "& .p-txt": {
                        fontSize: "10px",
                        textTransform: "lowercase",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "& .footer": {
          borderTop: "1px solid #e3e3e3",
          padding: "17px 50px",
          textAlign: "center",
          backgroundColor: "#fff",
          "& p": {
            fontSize: "9px",
            color: "#212121",
            lineHeight: "1",
          },
          "& .querie-link": {
            fontSize: "10px",
            color: "#212121",
            lineHeight: "1",
            fontFamily: "'ArialMTBold'",
            marginBottom: "7px",
            "& a": {
              color: "#212121",
              textDecoration: "none",
              display: "inline-block",
            },
          },
        },
      },
    },
  },
  backLinkWrapper: {
    marginBottom: "20px",
    "& span": {
      fontSize: "18px",
      lineHeight: "1.2",
      position: "relative",
      fontWeight: "500",
      color: colors.orange,
      display: "inline-flex",
      alignItems: "center",
      "& svg": {
        height: 15,
        width: 15,
      },
    },
  },
});

export { invoiceDetailStyle };
