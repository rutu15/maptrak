import { makeStyles } from "@material-ui/core/styles";

import { colors } from "@utils/constant";

const DiscussionThreadStyle = makeStyles({
  DiscussionThreadWrapper: {
    "& .primary-btn": {
      "&.blue-btn": {
        display: "flex",
        alignItems: "center",
        borderRadius: "6px",
        padding: "7px 10px",
        textDecoration: "none !important",
        backgroundColor: "rgba(0, 174, 239, 0.06) !important",
        boxShadow: "none !important",
        height: "36px",
        lineHeight: "36px",
        fontWeight: "500",
        textTransform: "capitalize",
        color: colors.black,
        "& img": {
          marginRight: "5px",
        },
      },
    },
  },
  DiscussionThreadBox: {
    "& .MuiDrawer-paper": {
      overflow:"hidden",
      maxWidth: "420px",
      width: "100%",
      "@media (max-width: 574px)": {
        maxWidth: "320px",
      },
      "@media (max-width: 374px)": {
        maxWidth: "280px",
      },
    },
    "& .chat-card-wrapper": {
      "& .chat-card": {
        "& .chat-header": {
          position: "fixed",
          top: "0",
          width: "100%",
          maxWidth: "420px",
          backgroundColor: colors.white,
          "@media (max-width: 574px)": {
            maxWidth: "320px",
          },
          "@media (max-width: 374px)": {
            maxWidth: "280px",
          },
          "& .chat-header-block": {
            position: "relative",
            padding: "23px 30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #e5e5e5",
            overflow: "hidden",
            "@media (max-width: 767px)": {
              padding: "15px",
            },
            "& .search-block": {
              "& img": {
                width: "36px",
                padding: "7px",
                cursor: "pointer",
              },
              "&.open-search": {
                "& .form-group": {
                  transform: "translateX(0)",
                },
              },
              "& .form-group": {
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundColor: colors.gray6,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "15px 30px",
                transition: "all 0.3s",
                transform: "translateX(100%)",
                "@media (max-width: 767px)": {
                  padding: "15px",
                },
                "& .MuiInputBase-input": {
                  border: "none",
                  padding: "0 !important",
                  fontSize: "18px",
                  "&::placeholder": {
                    opacity: "0.5",
                  },
                },
                "& img": {
                  cursor: "pointer",
                  width: "30px",
                  padding: "7px",
                },
              },
            },
            "& .title-block": {
              "& .title-text": {
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                "& h2": {
                  marginLeft: "10px",
                  fontSize: "24px",
                  lineHeight: "1.321",
                },
              },
            },
          },
        },
        "& .chat-body": {
          margin: "83px 0 102px 0",
          height: "calc(100vh - 185px)",
          overflowY: "auto",
          minHeight:'200px',
          "@media (max-width: 767px)": {
            margin: "67px 0 82px 0",
            height: "calc(100vh - 149px)",
          },
          "& .chat-body-block": {
            padding: "25px 30px 0",
            "& .circular-progress": {
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            },
            "@media (max-width: 767px)": {
              padding: "15px",
            },
            "& .chat-listing": {
              "& li": {
                maxWidth: "300px",
                "@media (max-width: 574px)": {
                  maxWidth: "220px",
                },
                "& + li": {
                  marginTop: "25px",
                },
                "& .message-group": {
                  "& .message-box": {
                    "& .message-text": {
                      fontSize: "14px",
                      lineHeight: "1.71",
                      padding: "15px 20px",
                      borderRadius: "6px",
                      backgroundColor: colors.gray7,
                      display: "inline-block",
                      marginBottom: "3px",
                      wordBreak: "break-word",
                      "@media (max-width: 574px)": {
                        padding: "10px 15px",
                      },
                      "&.attached-file": {
                        display: "inline-flex",
                        alignItems: "center",
                      },
                      "&.attachment": {
                        cursor: "pointer",
                      },
                    },
                    "& img": {
                      borderRadius: "6px",
                      marginRight: "15px",
                    },
                  },
                },
                "& .date-time": {
                  fontSize: "12px",
                  lineHeight: "1",
                  marginTop: "7px",
                  color: colors.gray8,
                },
                "&.sender": {
                  marginLeft: "auto",
                  textAlign: "right",
                },
              },
            },
          },
        },
        "& .chat-footer": {
          position: "fixed",
          bottom: "0",
          maxWidth: "420px",
          width: "100%",
          backgroundColor: colors.white,
          "@media (max-width: 574px)": {
            maxWidth: "320px",
          },
          "@media (max-width: 374px)": {
            maxWidth: "280px",
          },
          "& .chat-footer-block": {
            padding: "25px 30px",
            display: "flex",
            width: "100%",
            alignItems: "center",
            "@media (max-width: 767px)": {
              padding: "15px",
            },
            "& .type-message-block": {
              flex: "1",
              position: "relative",
              border: "1px solid #e7e4f1",
              borderRadius: "6px",
              overflow: "hidden",
              "& .text-field-wrapper": {
                "& .MuiTextField-root": {
                  "& input": {
                    padding: "0 15px 0 50px !important",
                    fontSize: "14px",
                    border: "none",
                    "&::placeholder": {
                      fontSize: "14px",
                      color: colors.gray5,
                    },
                  },
                },
              },
              "& .file-input": {
                display: "block",
                position: "absolute",
                right: "0",
                left: "0",
                top: "0",
                bottom: "0",
                backgroundColor: colors.white,
                "&.file-selected": {
                  zIndex: "1",
                  "& .label-block": {
                    "& .file-name": {
                      display: "block",
                    },
                  },
                },
                "& .MuiFormControl-root": {
                  opacity: 0,
                  overflow: "hidden",
                  position: "absolute",
                  right: "0",
                  left: "0",
                  width: "45px",
                  zIndex: "1",
                  "& input": {
                    cursor: "pointer",
                    fontSize: "0",
                  },
                },
                "& .label-block": {
                  width: "100%",
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
                    display: "none",
                    position: "relative",
                    marginLeft: "10px",
                    lineHeight: "1.321",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    borderRadius: "6px",
                    padding: "2px 25px 4px 10px",
                    "& em": {
                      fontStyle: "normal",
                      marginRight: "5px",
                    },
                    "& img": {
                      position: "absolute",
                      right: "5px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      padding: "4px",
                    },
                  },
                  "& img": {
                    height: "20px",
                    width: "20px",
                  },
                },
              },
            },
            "& .send-btn-block": {
              maxWidth: "50px",
              flex: "0 0 50px",
              marginLeft: "10px",
              "& button": {
                padding: "0",
                minWidth: "100%",
              },
            },
          },
        },
      },
    },
  },
});

export { DiscussionThreadStyle };
