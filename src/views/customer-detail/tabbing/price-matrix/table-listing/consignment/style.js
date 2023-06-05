import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const ConsignmentStyle = makeStyles({
  ConsignmentWrapper: {
    "& .MuiBackdrop-root": {
      color: " #fff",
      zIndex: "1201",
    },
    "& .primary-btn.blue-btn": {
      marginLeft: "auto",
      marginTop: "20px",
    },
    "& .weekly-row-wrapper": {
      marginTop: "30px",
      "& .weekly-row": {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        "& + .weekly-row": {
          marginTop: "24px",
        },
        "& .textfield-wrapper1": {
          display: "flex",
          flexWrap: "wrap",
          padding: "0 15px",
          flex: "1",
          width: "300px",
          "@media(max-width:767px)": {
            padding: "0",
            maxWidth: "100%",
            flex: "0 0 100%",
          },
          "& .MuiFormControl-root": {
            maxWidth: "363px",
            "& + .MuiFormControl-root": {
              marginLeft: "20px",
            },
          },
        },
        "& .label-text": {
          paddingRight: "15px",
          margin: "0",
          maxWidth: "300px",
          "@media(max-width:767px)": {
            maxWidth: "100%",
            flex: "0 0 100%",
            paddingRight: "0",
            margin: "0 0 10px",
          },
        },
      },
    },
  },
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
      minWidth: 700,
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
      "& .jobType": {
        width: "140px",
      },
      " & .subCargoType": {
        width: "180px",
      },
      "& .truckType": {
        width: "150px",
      },
      "& .pricing": {
        width: "210px",
      },
      "& .savePricing": {
        width: "200px",
        "& span": {
          cursor: "pointer",
          color: colors.primary,
          textTransform: "capitalize",
        },
      },
    },
  },
  minimumHours: {
    "& + $minimumHours": {
      marginTop: "30px",
    },
    "& .label-text": {
      marginBottom: "10px",
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

export { ConsignmentStyle };
