import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@utils/constant";

const TableStyle = makeStyles({
  TableWrapper: {
    "& .MuiBackdrop-root": {
      color: " #fff",
      zIndex: "1201",
    },
    boxShadow: "0 3px 8px 0 rgba(97, 97, 97, 0.08)",
    backgroundColor: colors.white,
    borderRadius: "6px",
    "& .pagination-wrapper": {
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
    maxHeight: 728,
    boxShadow: "none",
    "@media (max-height: 900px)": {
      maxHeight: 552,
    },
    "@media (max-height: 768px)": {
      maxHeight: 420,
    },
    "& .MuiTable-root": {
      minWidth: 1600,
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
      // "& .no-data":{
      //   backgroundColor:"red",
      //   textAlign:"center",
      //   "& span":{
      //     display: "inline-block",
      //   }
      // },
      "& .customer": {
        width: "140px",
      },
      "& .email": {
        width: "150px",
      },
      "& .phone": {
        width: "100px",
      },
      "& .city": {
        width: "100px",
      },
      "& .oldCustomerNumber": {
        width: "120px",
      },
      "& .newCustomerNumber": {
        width: "130px",
      },
      "& .customerCategory": {
        width: "120px",
      },
    },
  },
});

export { TableStyle };
