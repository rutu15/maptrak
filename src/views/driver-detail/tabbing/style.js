import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const TabbingStyle = makeStyles({
  TabbingWrapper: {
    "& .tabbing-wrapper": {
      padding: "25px 0 0",
      "@media(max-width:767px)": {
        padding: "0",
      },
      "& .MuiTabs-root": {
        padding: "0 30px",
        borderBottom: "1px solid #f2f2f2",
        "@media(max-width:1279px)": {
          padding: "0 25px",
        },
        "@media(max-width:767px)": {
          padding: "0",
        },
        "& .MuiTabs-scrollable": {
          "& .MuiTabs-indicator": {
            backgroundColor: colors.skyblue,
            borderRadius: "3px 3px 0 0",
            height: "3px",
          },
          "& .MuiTab-root": {
            "& + .MuiTab-root": {
              marginLeft: "40px",
              "@media(max-width:767px)": {
                marginLeft: "0",
              },
            },
            color: colors.gray4,
            fontSize: "14px",
            padding: "0 0 25px 0",
            minWidth: "auto",
            textTransform: "none",
            "@media(max-width:767px)": {
              padding: "15px",
            },
            "&.Mui-selected": {
              color: colors.skyblue,
              fontWeight: "600",
            },
          },
        },
      },
      "& .tab-pannel-wrapper": {
        padding: "30px",
        "@media(max-width:1279px)": {
          padding: "25px",
        },
        "@media(max-width:767px)": {
          padding: "15px",
        },
      },
      "& .MuiTabs-scrollButtonsDesktop": {
        display: "flex !important",
        boxShadow: "0px 0px 15px 0 rgb(0 0 0 / 15%)",
        zIndex: "1",
        backgroundColor: colors.white,
        width: "30px",
        "& svg": {
          fill: colors.gray4,
        },
      },
    },
  },
});

export { TabbingStyle };
