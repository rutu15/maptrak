// import { makeStyles } from "@material-ui/core";
// import { colors } from "@utils/constant";

// const invoiceDetailStyle = makeStyles({
//   invoiceDetailWrapper: {
//     "& .MuiBackdrop-root": {
//       color: " #fff",
//       zIndex: "1201",
//     },
//     maxWidth: "885px",
//     margin: "0 auto",
//     "& .inner-page": {
//       backgroundColor: "transparent",
//     },
//     "& .invoice-detail-wrapper": {
//       fontFamily: "'ArialMT'",
//       "& .clearfix": {
//         "&:after": {
//           display: "table",
//           content: "''",
//           clear: "both",
//         },
//       },
//       "& .content-wrapper": {
//         margin: "0 auto",
//         border: "1px solid #e3e3e3",
//         "& .header": {
//           padding: "15px 14px 14px",
//           boxShadow: "0 3px 10px 0 rgb(126 126 126 / 12%)",
//           backgroundColor: "#00548e",
//           "& .top-header": {
//             display: "block",
//             borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
//             paddingBottom: "5px",
//             marginBottom: "9px",
//             "& .logo": {
//               float: "left",
//               width: "100px",
//               // width: "33.33%",
//             },
//             "& .middle-title": {
//               float: "left",
//               width: "69.33%",
//               textAlign: "center",
//               "& p": {
//                 fontFamily: "'ArialMTBold'",
//                 fontSize: "12px",
//                 lineHeight: "16px",
//                 color: "#fff",
//               },
//               "& h1": {
//                 fontSize: "10px",
//                 color: "#fff",
//                 lineHeight: "19px",
//               },
//             },
//             "& .right-block": {
//               float: "right",
//               textAlign: "right",
//               width: "13.33%",
//               "& p": {
//                 fontSize: "9px",
//                 color: "#fff",
//                 lineHeight: "10px",
//                 marginBottom: "3px",
//                 "&:first-child": {
//                   opacity: "0.8",
//                   marginBottom: "3px",
//                 },
//                 "& span:first-child": {
//                   opacity: "0.5",
//                 },
//                 "& span:last-child": {
//                   fontFamily: "ArialMTBold",
//                 },
//               },
//             },
//           },
//           "& .bottom-header": {
//             "& .left-block": {
//               float: "left",
//               width: "41.9%",
//               paddingRight: "10px",
//               "& p": {
//                 "&:first-child": {
//                   fontFamily: "'ArialMTBold'",
//                   fontSize: "12px",
//                   lineHeight: "16px",
//                   color: "#fff",
//                   marginBottom: "4px",
//                 },
//                 "&:last-child": {
//                   fontSize: "8px",
//                   color: "#fff",
//                   lineHeight: "12px",
//                 },
//               },
//             },
//             "& .middle-block": {
//               float: "left",
//               width: "18%",
//               paddingRight: "10px",
//               "& p": {
//                 fontSize: "9px",
//                 color: "#fff",
//                 lineHeight: "13px",
//                 "& + p": {
//                   marginTop: "4px",
//                 },
//                 "& span": {
//                   fontFamily: "ArialMTBold",
//                 },
//                 "& a": {
//                   fontFamily: "'ArialMTBold'",
//                   color: "#fff",
//                   textDecoration: "none",
//                 },
//               },
//             },
//             "& .right-block": {
//               float: "right",
//               width: "24.1%",
//               textAlign: "right",
//               "& p": {
//                 fontSize: "9px",
//                 color: "#fff",
//                 lineHeight: "13px",
//                 "& + p": {
//                   marginTop: "4px",
//                 },
//                 "& span": {
//                   fontFamily: "ArialMTBold",
//                 },
//                 "& a": {
//                   fontFamily: "'ArialMTBold'",
//                   color: "#fff",
//                   textDecoration: "none",
//                 },
//               },
//             },
//           },
//         },
//         "& .content-block": {
//           padding: "14px 14px 47px",
//           background: "#fff",
//           "& .detail-block": {
//             marginBottom: "11px",
//             "& .right-block": {
//               width: "42.2%",
//               float: "right",
//               "@media (max-width: 767px)": {
//                 width: "46%",
//               },
//               "@media (max-width: 574px)": {
//                 width: "100%",
//                 marginTop: "15px",
//               },
//               "& .shipping-adress-block": {
//                 "& .inner-col": {
//                   float: "right",
//                   "&.first": {
//                     width: "56%",
//                     wordBreak: "break-word",
//                   },
//                 },
//               },
//               "& .purchase-order": {
//                 fontSize: "12px",
//                 color: "#212121",
//                 lineHeight: "16px",
//                 "& span": {
//                   fontFamily: "'ArialMTBold'",
//                 },
//               },
//             },
//             "& .left-block": {
//               width: "57.8%",
//               float: "left",
//               "@media (max-width: 767px)": {
//                 width: "54%",
//               },
//               "@media (max-width: 574px)": {
//                 width: "100%",
//               },
//             },
//             "& p": {
//               fontSize: "9px",
//               color: "#212121",
//               lineHeight: "15px",
//             },
//             "& h2": {
//               fontSize: "12px",
//               color: "#212121",
//               lineHeight: "1",
//               fontFamily: "'ArialMTBold'",
//               marginBottom: "3px",
//             },
//           },
//           "& .gray-bg-title-strip": {
//             backgroundColor: "#f1f1f1",
//             padding: "4px 15px",
//             borderRadius: "4px",
//             marginBottom: "4px",
//             "&.total-invoice": {
//               "& h3": {
//                 fontSize: "12px",
//                 color: "#212121",
//                 lineHeight: "32px",
//                 fontFamily: "ArialMT",
//               },
//               "& .right-block": {
//                 lineHeight: "2",
//                 "& p": {
//                   fontSize: "12px",
//                   color: "#212121",
//                   lineHeight: "1",
//                   fontFamily: "'ArialMTBold'",
//                   "& + p": {
//                     marginLeft: "27px",
//                   },
//                 },
//               },
//             },
//             "& h3": {
//               fontSize: "10px",
//               color: "#212121",
//               lineHeight: "18px",
//               fontFamily: "'ArialMTBold'",
//               float: "left",
//               width: "40%",
//             },
//             "& .right-block": {
//               float: "right",
//               width: "60%",
//               lineHeight: "1",
//               textAlign: "right",
//               "& p": {
//                 fontSize: "10px",
//                 color: "#212121",
//                 lineHeight: "1",
//                 display: "inline-block",
//                 "& span": {
//                   marginLeft: "3px",
//                   fontFamily: "'ArialMTBold'",
//                 },
//                 "& + p": {
//                   marginLeft: "13px",
//                 },
//               },
//             },
//             "& + .table-responsive": {
//               marginBottom: "15px",
//             },
//           },
//           "& .table-responsive": {
//             position: "relative",
//             overflowX: "auto",
//             "& table": {
//               minWidth: "100px",
//               width: "100%",
//               border: "1px solid #e3e3e3",
//               borderRadius: "6px 6px 0 0",
//               borderSpacing: "0",
//               borderCollapse: "initial",
//               "& p": {
//                 border: "1px solid #e3e3e3",
//                 padding: "15px",
//                 fontWeight: "bold",
//                 "& span": {
//                   fontWeight: "none",
//                 },
//               },
//             },
//           },
//         },
//         "& .footer": {
//           borderTop: "1px solid #e3e3e3",
//           padding: "17px 50px",
//           textAlign: "center",
//           backgroundColor: "#fff",
//           "& p": {
//             fontSize: "9px",
//             color: "#212121",
//             lineHeight: "1",
//           },
//           "& .querie-link": {
//             fontSize: "10px",
//             color: "#212121",
//             lineHeight: "1",
//             fontFamily: "'ArialMTBold'",
//             marginBottom: "7px",
//             "& a": {
//               color: "#212121",
//               textDecoration: "none",
//               display: "inline-block",
//             },
//           },
//         },
//       },
//     },
//   },
//   customModal: {
//     "& .MuiDialog-paperWidthSm": {
//       boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.24)",
//       padding: "32px 40px 40px",
//       maxWidth: "820px",
//       width: "100%",
//       "@media (max-width: 991px)": {
//         maxWidth: "100%",
//         padding: "20px 15px",
//         margin: "30px 15px",
//         width: "auto",
//       },
//       "& .MuiDialogTitle-root": {
//         padding: "0",
//         display: "flex",
//         justifyContent: "space-between",
//         marginBottom: "30px",
//         "@media (max-width: 480px)": {
//           marginBottom: "20px",
//         },
//       },
//       "& .MuiDialogContent-root": {
//         padding: "0",
//         overflow: "hidden",
//       },
//       "& h2": {
//         fontSize: "24px",
//         fontWeight: "700",
//         lineHeight: "40px",
//       },
//     },
//     "& .close-modal": {
//       position: "absolute",
//       right: "40px",
//       top: "40px",
//       cursor: "pointer",
//       "@media (max-width: 991px)": {
//         top: "28px",
//         right: "25px",
//       },
//     },
//     "& .bottom-button-block": {
//       padding: "15px 0 0",
//       display: "flex",
//       "@media (max-width: 480px)": {
//         flexDirection: "column",
//       },
//       "& button": {
//         height: "50px",
//         lineHeight: "50px",
//         fontWeight: "600",
//         fontSize: "16px",
//         minWidth: "165px",
//         textTransform: "uppercase",
//         "@media (max-width: 480px)": {
//           minWidth: "100%",
//           marginBottom: "15px",
//         },
//         "& + button": {
//           marginLeft: "15px",
//           "@media (max-width: 480px)": {
//             margin: "0 ",
//           },
//         },
//         "&.gray-border-btn": {
//           boxShadow: "none",
//           border: "1px solid #e7e4f1",
//           color: colors.primary,
//           textTransform: "uppercase",
//           backgroundColor: "transparent",
//           "&:hover": {
//             boxShadow: "none",
//             color: colors.primary,
//             backgroundColor: "transparent",
//           },
//         },
//       },
//     },
//   },
//   backLinkWrapper: {
//     marginBottom: "20px",
//     "& span": {
//       fontSize: "18px",
//       lineHeight: "1.2",
//       position: "relative",
//       fontWeight: "500",
//       color: colors.orange,
//       display: "inline-flex",
//       alignItems: "center",
//       "& svg": {
//         height: 15,
//         width: 15,
//       },
//     },
//   },
// });

// export { invoiceDetailStyle };

import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@utils/constant";

const AddPopupStyle = makeStyles({
  customForm: {
    overflow: "hidden",
    "& .form-row": {
      display: "flex",
      margin: "0 -10px",
      "@media (max-width: 575px)": {
        flexWrap: "wrap",
      },
      "& .form-group": {
        padding: "0 10px",
        maxWidth: "50%",
        flex: "0 0 50%",
        marginBottom: "20px",
        "@media (max-width: 575px)": {
          maxWidth: "100%",
          flex: "0 0 100%",
        },
        "& .label-text": {
          fontSize: "14px",
        },
        "&.full-width": {
          maxWidth: "100%",
          flex: "0 0 100%",
        },
        "& .error-text": {
          color: "red",
        },
      },
    },
  },
  customModal: {
    "& .MuiDialog-paperWidthSm": {
      boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.24)",
      padding: "32px 40px 40px",
      maxWidth: "820px",
      width: "100%",
      "@media (max-width: 991px)": {
        maxWidth: "100%",
        padding: "20px 15px",
        margin: "30px 15px",
        width: "auto",
      },
      "& .MuiDialogTitle-root": {
        padding: "0",
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "30px",
        "@media (max-width: 480px)": {
          marginBottom: "20px",
        },
      },
      "& .MuiDialogContent-root": {
        padding: "0",
        overflow: "hidden",
      },
      "& h2": {
        fontSize: "24px",
        fontWeight: "700",
        lineHeight: "40px",
      },
    },
    "& .close-modal": {
      position: "absolute",
      right: "40px",
      top: "40px",
      cursor: "pointer",
      "@media (max-width: 991px)": {
        top: "28px",
        right: "25px",
      },
    },
    "& .bottom-button-block": {
      padding: "15px 0 0",
      display: "flex",
      "@media (max-width: 480px)": {
        flexDirection: "column",
      },
      "& button": {
        height: "50px",
        lineHeight: "50px",
        fontWeight: "600",
        fontSize: "16px",
        minWidth: "165px",
        textTransform: "uppercase",
        "@media (max-width: 480px)": {
          minWidth: "100%",
          marginBottom: "15px",
        },
        "& + button": {
          marginLeft: "15px",
          "@media (max-width: 480px)": {
            margin: "0 ",
          },
        },
        "&.gray-border-btn": {
          boxShadow: "none",
          border: "1px solid #e7e4f1",
          color: colors.primary,
          textTransform: "uppercase",
          backgroundColor: "transparent",
          "&:hover": {
            boxShadow: "none",
            color: colors.primary,
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
  TableWrapper: {
    "& .MuiBackdrop-root": {
      color: " #fff",
      zIndex: "1201",
    },
    boxShadow: "0 3px 8px 0 rgba(97, 97, 97, 0.08)",
    backgroundColor: colors.white,
    borderRadius: "6px",
    "& .pagination-wrapper": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "30px",
      overflow: "hidden",
      "@media (max-width: 575px)": {
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "15px",
      },
      "@media (max-width: 374px)": {
        padding: "0",
      },
      "& .total-page p": {
        opacity: "0.7",
        "@media (max-width: 575px)": {
          marginBottom: "15px",
        },
      },
      "& .pagination": {
        display: "flex",
        alignItems: "center",
        "& li": {
          margin: "0 2px",
          "&:last-child": {
            marginLeft: "8px",
          },
          "&:first-child": {
            marginRight: "8px",
          },
          "&:hover a": {
            color: colors.white,
            borderColor: colors.orange,
            backgroundColor: colors.orange,
          },
          "&.no-link": {
            margin: "0 8px",
          },
          "&.disabled a": {
            opacity: "0.3",
            cursor: "default",
            color: colors.black,
            borderColor: "#c6cbd4",
            backgroundColor: "transparent",
          },
          "&.active a": {
            color: colors.white,
            borderColor: colors.orange,
            backgroundColor: colors.orange,
          },
          "& a": {
            border: "solid 1px #c6cbd4",
            fontSize: "14px",
            color: colors.black,
            padding: "0px 10px",
            lineHeight: "1.2",
            borderRadius: "2px",
            height: "32px",
            width: "32px",
            display: "flex",
            textAlign: "center",
            textDecoration: "none !important",
            alignItems: "center",
            justifyContent: "center",
            "& .MuiSvgIcon-root": {
              height: "14px",
              width: "14px",
            },
          },
        },
      },
    },
  },
  customTable: {
    marginTop: 25,
    maxHeight: 680,
    boxShadow: "none",
    "& .MuiTable-root": {
      minWidth: 400,
      tableLayout: "fixed",
      "& .MuiTableCell-root": {
        fontWeight: 500,
        color: colors.black,
        border: "none",
        wordBreak: "break-word",
      },
      "& .MuiTableHead-root": {
        boxShadow: "0 3px 8px 0 rgba(97, 97, 97, 0.08)",
        backgroundColor: colors.white,
        "& .MuiTableCell-root": {
          color: "rgba(33, 33, 33, 0.7)",
          padding: "30px 25px",
          backgroundColor: colors.white,
          borderBottom: "1px solid #f4f4f4",
          "&:first-child": {
            paddingLeft: "30px",
          },
          "&:last-child": {
            paddingRight: "30px",
          },
        },
      },
      "& .MuiTableBody-root": {
        "& .MuiTableCell-root": {
          padding: "22px 25px",
          "&:first-child": {
            paddingLeft: "30px",
          },
          "&:last-child": {
            paddingRight: "30px",
          },
        },
      },
      "& .edit-link": {
        width: "100px",
        "& span": {
          color: colors.orange,
          textTransform: "capitalize",
          cursor: "grab",
        },
      },
      "& .delete-link": {
        width: "110px",
        "& span": {
          color: colors.red,
          textTransform: "capitalize",
          cursor: "grab",
        },
      },
      "& .role-name": {
        width: "200px",
        fontWeight: "bold",
      },
      "& .permission": {
        width: "200px",
      },
      "& .status": {
        width: "150px",
        // color: colors.skyblue,
      },
    },
  },
});

export { AddPopupStyle };
