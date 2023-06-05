import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const customPaginationStyle = makeStyles({
  customPagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "30px !important",
    // borderTop: "1px solid #f4f4f4",
    "@media (max-width: 574px)": {
      padding: "20px 30px !important",
    },
    "& .MuiInputBase-root.Mui-focused .MuiInputBase-input": {
      borderColor: colors.borderGray,
    },
    "&.MuiTablePagination-root": {
      "& .MuiTablePagination-toolbar": {
        padding: 0,
        "& .MuiTablePagination-caption": {
          fontSize: "16px",
          fontWeight: "500",
          "@media (max-width: 574px)": {
            fontSize: "14px",
          },
        },
        "& .MuiTablePagination-selectRoot": {
          "@media (max-width: 574px)": {
            marginRight: "20px",
          },
          "& .MuiSelect-select.MuiSelect-select": {
            width: "80px",
            height: "45px",
            padding: "0 20px 0 0px !important",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "500",
            borderRadius: "6px",
            "@media (max-width: 574px)": {
              height: "40px",
            },
          },
          "& .MuiSelect-icon": {
            top: "calc(50% - 13px)",
            right: "6px",
          },
        },
      },
    },
    "& .MuiTablePagination-actions": {
      "& .MuiIconButton-root": {
        "@media (max-width: 574px)": {
          padding: "5px",
        },
      },
    },
  },
  customPaginationMenuItem: {
    "&:hover": {
      color: colors.orange,
      backgroundColor: "rgba(247, 146, 57, 0.2)",
    },
    "&.MuiListItem-root.Mui-selected": {
      color: colors.white,
      backgroundColor: "rgba(247, 146, 57, 1)",
    },
  },
});

export { customPaginationStyle };
