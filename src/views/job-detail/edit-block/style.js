import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const EditBlockStyle = makeStyles({
  EditBlockWrapper: {
    "& .MuiBackdrop-root": {
      color: " #fff",
      zIndex: "1201",
    },
    "& .edit-block": {
      padding: "30px",
      "@media(max-width:1279px)": {
        padding: "25px",
      },
      "@media(max-width:767px)": {
        padding: "15px",
      },
      "& .edit-block-header": {
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: "20px",
        borderBottom: "1px solid #e3e3e3",
        marginBottom: "20px",
        "& .link-block": {
          display: "flex",
          alignItems: "center",
          "@media(max-width:574px)": {
            flexWrap: "wrap",
            flex: "0 0 85px",
            maxWidth: "85px",
          },
          "& span": {
            color: colors.orange,
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            "@media(max-width:574px)": {
              flex: "0 0 100%",
              maxWidth: "100%",
            },
            "& + span": {
              marginLeft: "20px",
              "@media(max-width:574px)": {
                margin: "20px 0 0 0",
              },
            },
            "& em": {
              lineHeight: "0",
              display: "inline-block",
              marginRight: "5px",
              "& img": {
                width: "20px",
              },
            },
          },
        },
        "& .inner-heading": {
          marginRight: "10px",
          "& span": {
            fontSize: "24px",
            lineHeight: "1",
            fontWeight: "700",
            color: colors.black2,
          },
          "& p": {
            fontSize: "16px",
            color: colors.black1,
            lineHeight: "1",
            marginBottom: "6px",
          },
        },
      },
      "& .edit-block-list ": {
        "& ul ": {
          "& li": {
            display: "flex",
            justifyContent: "space-between",
            "@media(max-width:424px)": {
              flexWrap: "wrap",
            },
            "& + li": {
              marginTop: "10px",
            },
            "& .value-block": {
              flex: "1",
              paddingLeft: "10px",
              textAlign: "right",
              "& .chart-info-dot": {
                fontSize: "14px",
                paddingLeft: "17px",
                position: "relative",
                display: "inline-block",
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
                  "&::after": {
                    backgroundColor: colors.darkRed,
                    width: "10px",
                    height: "10px",
                    top: "4px",
                  },
                },
              },
              "& span": {
                color: "#00548e",
                cursor: "pointer",
                fontWeight: "600",
              },
              "@media(max-width:424px)": {
                textAlign: "left",
                paddingLeft: "0",
                flex: "0 0 100%",
                maxWidth: "100%",
              },
              "& a": {
                fontWeight: "600",
                color: colors.skyblue,
              },
              "& p": {
                fontWeight: "600",
                color: colors.black1,
              },
            },
            "& h6": {
              color: colors.gray3,
              maxWidth: "135px",
              flex: "0 0 135px",
              "@media(max-width:424px)": {
                paddingLeft: "0",
                flex: "0 0 100%",
                maxWidth: "100%",
              },
            },
          },
        },
      },
      "& .btn-wrapper": {
        paddingTop: "15px",
        display: "inline-block",
      },
      "& .btn-wrapper1": {
        paddingTop: "15px",
        display: "inline-block",
        paddingLeft: "12px",
      },
      "& .edit-block-content": {
        paddingBottom: "20px",
        borderBottom: "1px solid #e3e3e3",
        marginBottom: "20px",
        "& p": {
          fontSize: "14px",
          lineHeight: "1.71",
          wordBreak: "break-word",
        },
        "& h6": {
          fontSize: "14px",
          lineHeight: "1",
          color: colors.gray3,
          marginBottom: "6px",
        },
      },
    },
  },
});

export { EditBlockStyle };
