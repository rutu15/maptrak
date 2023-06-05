import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@utils/constant";

const TableStyle = makeStyles({
  TableWrapper: {
    boxShadow: "0 3px 8px 0 rgba(97, 97, 97, 0.08)",
    backgroundColor: colors.white,
    borderRadius: "6px",
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
      minWidth: 3200,
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
      "& .name": {
        width: "200px",
      },
      "& .parent": {
        width: "130px",
      },
      "& .address": {
        width: "250px",
      },
      "& .suburb": {
        width: "130px",
      },
      "& .postalCode": {
        width: "120px",
      },
      "& .country": {
        width: "130px",
      },
      "& .state": {
        width: "150px",
      },
      "& .city": {
        width: "150px",
      },
      "& .abn": {
        width: "150px",
      },
      "& .phone": {
        width: "120px",
      },
      "& .fax": {
        width: "100px",
      },
      "& .bsb": {
        width: "130px",
      },
      "& .ac-no": {
        width: "150px",
      },
      "& .ac-name": {
        width: "150px",
      },
      "& .email": {
        width: "200px",
      },
      "& .bank": {
        width: "200px",
      },
    },
  },
});

export { TableStyle };
