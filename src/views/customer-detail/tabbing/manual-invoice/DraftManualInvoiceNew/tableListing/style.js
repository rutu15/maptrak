import { makeStyles } from "@material-ui/core/styles";

import { colors } from "@utils/constant";

const TableStyle = makeStyles({
  TableWrapper: {
    boxShadow: "0 3px 8px 0 rgba(97, 97, 97, 0.08)",
    backgroundColor: colors.white,
    borderRadius: "6px",
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
      minWidth: 1000,
      tableLayout: "fixed",
      "& .MuiTableRow-root": {
        transition: "all 0.3s",
        cursor: "pointer",
        "&.sub-row": {
          // "& .date": {
          //   display: "flex",
          //   alignItems: "center",
          // },

          "& .MuiTableRow-root": {
            cursor: "default",
          },
          backgroundColor: "#f6f6f6",
          "& > .MuiTableCell-root": {
            padding: 0,
          },
          "& .MuiTableSubRoW": {
            paddingBottom: 0,
            paddingTop: 0,
          },
        },
      },
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
          padding: "30px 10px",
          backgroundColor: colors.white,
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
          padding: "22px 10px",
          "&:first-child": {
            paddingLeft: "30px",
          },
          "&:last-child": {
            paddingRight: "30px",
          },
        },
      },
      "& .city": {
        width: "160px",
      },
      "& .check": {
        width: "70px",
      },
      "& .number": {
        width: "120px",
        color: colors.skyblue,
        cursor: "pointer",
      },
      "& .customer": {
        width: "170px",
      },
      "& .date": {
        width: "170px",
        "& .date-field": {
          backgroundColor: colors.white,
        },
      },
      "& .purchase-order": {
        width: "170px",
        "& .purchase-form": {
          backgroundColor: colors.white,
        },
      },
      "& .organisation": {
        width: "250px",
        "& .purchase-form": {
          backgroundColor: colors.white,
        },
      },
      "& .update-btn": {
        width: "150px",
        "@media (max-width: 1300px)": {
          width: "170px",
        },
      },
      "& .gross": {
        width: "120px",
      },
      "& .chat-column": {
        width: "150px",
      },
    },
  },
  noMaxWidth: {
    display: "block",
  },
});

export { TableStyle };
