import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@utils/constant";

const TableStyle = makeStyles({
  TableWrapper: {
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
    maxHeight: 680,
    boxShadow: "none",
    "& .MuiTable-root": {
      minWidth: 800,
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
        width: "90px",
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
      "& .id": {
        width: "200px",
        color: colors.skyblue,
        cursor: "pointer",
      },
      "& .child-customer": {
        width: "230px",
      },
      "& .organisation": {
        width: "230px",
      },
      "& .date": {
        width: "150px",
      },
      "& .descripition": {
        width: "250px",
      },
      "& .amount": {
        width: "150px",
      },
      "& .edit": {
        width: "90px",
      },
      "& .delete": {
        width: "110px",
      },
    },
  },
});

export { TableStyle };
