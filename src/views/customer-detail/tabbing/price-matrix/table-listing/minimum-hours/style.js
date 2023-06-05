import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@utils/constant";

const TableStyle = makeStyles({
  dailyHours: {
    "& .MuiBackdrop-root": {
      color: " #fff",
      zIndex: "1201",
    },
  },
  TableWrapper: {
    boxShadow: "0 3px 8px 0 rgba(97, 97, 97, 0.08)",
    backgroundColor: colors.white,
    borderRadius: "6px",
    border: "1px solid #ebeef6",
  },
  ButtonWrapper: {
    "& .primary-btn.blue-btn": {
      marginLeft: "auto",
      marginTop: "20px",
    },
  },
  customTable: {
    overflowY: "hidden",
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
          borderBottom: "1px solid #f4f4f4",
          "&:first-child": {
            paddingLeft: "30px",
          },
          "&:last-child": {
            paddingRight: "30px",
          },
        },
      },
      "& .day": {
        width: "200px",
      },
      "& hours": {
        width: "120px",
      },
      "& .hourlyCharge": {
        widht: "120px",
      },
    },
  },
  weeklyMinimumHours: {
    "& .label-text": {
      paddingRight: "15px",
      marginBottom: "40px",
      "& .normal-text": {
        fontWeight: "100",
      },
      "@media(max-width:767px)": {
        maxWidth: "100%",
        flex: "0 0 100%",
        paddingRight: "0",
        margin: "0 0 10px",
      },
    },
    "& $customTable": {
      "& .MuiTable-root": {
        "& .error-text": {
          color: "red",
        },
        minWidth: "500px",
        "& .cargoType": {
          width: "150px",
        },
        "& .hours": {
          width: "150px",
        },
        "& .amount": {
          width: "150px",
        },
      },
    },
  },
  dailyMinimumHours: {
    "& $customTable": {
      "& .MuiTable-root": {
        "& .hours": {
          width: "360px",
        },
        "& .hours-text-field-wrapper": {
          display: "flex",
          alignItems: "center",
          "& > .MuiFormControl-root": {
            "& + .MuiFormControl-root": {
              marginLeft: "15px",
            },
          },
        },
      },
    },
  },
});

export { TableStyle };
