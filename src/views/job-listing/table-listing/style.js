import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@utils/constant";

const TableStyle = makeStyles({
  TableWrapper: {
    boxShadow: "0 3px 8px 0 rgba(97, 97, 97, 0.08)",
    backgroundColor: colors.white,
    borderRadius: "6px",
    "& .MuiBackdrop-root": {
      color: " #fff",
      zIndex: "1201",
    },
    "& .pagination-wrapper": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "30px",
      overflow: "hidden",
      "& .MuiTablePagination-select": {
        paddingRight: "24px !important",
      },
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
      minWidth: 1700,
      tableLayout: "fixed",
      "& .MuiTableCell-root": {
        fontWeight: 500,
        color: colors.black,
        border: "none",
      },
      "& .MuiTableHead-root": {
        boxShadow: "0 3px 8px 0 rgba(97, 97, 97, 0.08)",
        backgroundColor: colors.white,
        "& .MuiTableCell-root": {
          color: "rgba(33, 33, 33, 0.7)",
          padding: "30px 19px",
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
          "&.status": {
            "& span": {
              position: "relative",
              paddingLeft: 20,
              display: "block",
              "&:before": {
                content: '""',
                position: "absolute",
                backgroundColor: colors.black,
                height: 10,
                width: 10,
                borderRadius: "50%",
                left: 0,
                top: 7,
              },
            },
            "&.not-assigned": {
              "& span": {
                color: colors.yellow,
                "&:before": {
                  backgroundColor: colors.yellow,
                },
              },
            },
            "&.rejected": {
              "& span": {
                color: colors.darkRed1,
                "&:before": {
                  backgroundColor: colors.darkRed1,
                },
              },
            },
            "&.in-progress": {
              "& span": {
                color: colors.green,
                "&:before": {
                  backgroundColor: colors.green,
                },
              },
            },
            "&.assigned": {
              "& span": {
                color: colors.orange,
                "&:before": {
                  backgroundColor: colors.orange,
                },
              },
            },
            "&.review-completed": {
              "& span": {
                color: colors.darkGreen,
                "&:before": {
                  backgroundColor: colors.darkGreen,
                },
              },
            },
            "&.completed": {
              "& span": {
                color: colors.gray2,
                "&:before": {
                  backgroundColor: colors.gray2,
                },
              },
            },
          },
        },
      },
      "& .jobId": {
        width: "90px",
      },
      "& .check": {
        width: "30px",
      },
      "& .customerName": {
        width: "140px",
      },
      "& .city": {
        width: "80px",
      },
      "& .cto": {
        width: "100px",
      },
      "& .cargoType": {
        width: "80px",
      },
      "& .jobType": {
        width: "80px",
      },
      "& .date": {
        width: "90px",
      },
      "& .completion-date": {
        width: "90px",
      },
      "& .truck-rego": {
        width: "110px",
        "@media (max-width: 1200px)": {
          width: "80px",
        },
      },
      "& .driver": {
        width: "150px",
        "& .re-assign-link": {
          color: colors.primary,
          cursor: "pointer",
        },
        "&.assign-driver": {
          "& button": {
            backgroundColor: "rgba(0, 174, 239, 0.1)",
            color: colors.skyblue,
          },
        },

        "&.re-assign": {
          "& button": {
            border: "1px solid #e2e2e2",
            color: colors.black,
            backgroundColor: "transparent",
          },
        },
        "& button": {
          width: "100%",
          borderRadius: "4px",
          fontWeight: "500",
        },
      },
      "& .status": {
        width: "90px",
      },
    },
  },
});

export { TableStyle };
