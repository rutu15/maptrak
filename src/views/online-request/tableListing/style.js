import { makeStyles } from "@material-ui/core/styles";

import { colors } from "@utils/constant";

const TableStyle = makeStyles({
  customTable: {
    marginTop: 25,
    maxHeight: 728,
    boxShadow: "none",
    "@media (max-height: 900px)": {
      maxHeight: 552,
    },
    "@media (max-height: 768px)": {
      maxHeight: 420,
    },
    "& .MuiTable-root": {
      minWidth: 1700,
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
          padding: "30px 10px",
          backgroundColor: colors.white,
          borderBottom: "1px solid #f4f4f4",
          "&:first-child": {
            paddingLeft: "30px",
          },
          "&:last-child": {
            paddingRight: "30px",
          },
          // "&.job-status": {
          //   width: 178,
          // },
          // "&.location": {
          //   width: 150,
          // },
        },
      },
      "& .MuiTableBody-root": {
        "& .MuiTableCell-root": {
          padding: "22px 10px",
          "&:first-child": {
            paddingLeft: "30px",
          },
          "&:last-child": {
            paddingRight: "30px",
          },
          "&.request-status": {
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
            "&.requested": {
              "& span": {
                color: colors.green,
                "&:before": {
                  backgroundColor: colors.green,
                },
              },
            },
            "&.acknowledged": {
              "& span": {
                color: colors.red3,
                "&:before": {
                  backgroundColor: colors.red3,
                },
              },
            },
            "&.driver-assigned": {
              "& span": {
                color: colors.yellow1,
                "&:before": {
                  backgroundColor: colors.yellow1,
                },
              },
            },
            "&.request-completed": {
              "& span": {
                color: colors.green1,
                "&:before": {
                  backgroundColor: colors.green1,
                },
              },
            },
          },
          "&.jobStatus": {
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
            "&.assigned": {
              "& span": {
                color: colors.orange,
                "&:before": {
                  backgroundColor: colors.orange,
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
      "& .referenceNo": {
        width: "150px",
      },
      "& .id": {
        width: "150px",
      },
      "& .customerName": {
        width: "170px",
      },
      "& .jobType": {
        width: "140px",
      },
      "& .cargoType": {
        width: "140px",
      },
      "& .cto": {
        width: "100px",
      },
      "& .onlineRequest": {
        width: "300px",
      },
      "& .jobStatus": {
        width: "160px",
      },
      "& .city": {
        width: "100px",
      },
      "& .request-status": {
        width: "150px",
      },
      "& .chat": {
        width: "90px",
      },
      "& .action": {
        width: "150px",
        "&.assign-driver": {
          " & .orange-btn": {
            color: "white",
          },
          "& button": {
            backgroundColor: "rgba(0, 174, 239, 0.1)",
            color: colors.skyblue,
          },
        },
      },
    },
  },
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
      overflow: "hidden",
      "& .MuiTablePagination-root": {
        padding: "10px 0 10px 30px !important",
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
});

export { TableStyle };
