import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@utils/constant";

const tableStyles = makeStyles({
  tableWrapper: {
    boxShadow: "0 3px 8px 0 rgba(97, 97, 97, 0.08)",
    backgroundColor: colors.white,
    borderRadius: "6px",
    marginTop: 25,
    border: "1px solid #ebeef6",
    "& .MuiBackdrop-root": {
      color: " #fff",
      zIndex: "1201",
    },
  },
  customTable: {
    maxHeight: "auto",
    boxShadow: "none",
    overflowY: "hidden",
    "& .MuiTable-root": {
      minWidth: 1500,
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
          "&.jobId": {
            color: colors.skyblue,
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
        width: "130px",
      },
      "& .date": {
        width: "140px",
      },
      "& .truck-rego": {
        width: "150px",
      },
      "& .driver": {
        width: "200px",
      },
      "& .jobType": {
        width: "170px",
      },
      "& .totalWeight": {
        width: "220px",
      },
      "& .totalQuantity": {
        widht: "140px",
      },
      "& .duration": {
        width: "130px",
      },
      "& .status": {
        width: "230px",
      },
    },
  },
});

export { tableStyles };
