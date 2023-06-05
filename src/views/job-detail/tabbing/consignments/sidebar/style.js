import { makeStyles } from "@material-ui/core/styles";

import { colors } from "@utils/constant";

const SideBarStyle = makeStyles((theme) => ({
  drawerWrapper: {
    position: "relative",
    "& .MuiDrawer-paper": {
      backgroundColor: colors.gray5,
    },
    "& .drawer-wrapper": {
      width: "420px",
      height: "100%",
      padding: "30px",
      overflowY: "auto",
      "& .circular-progress": {
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      },
      "@media(max-width:767px)": {
        padding: "20px 15px",
        width: "350px",
      },
      "@media(max-width:480px)": {
        width: "300px",
      },
      "@media(max-width:374px)": {
        width: "280px",
      },
      "& .uld-list-wrapper": {
        marginTop: "25px",
        "& .uld-list-item": {
          backgroundColor: colors.white,
          padding: "11px 5px 11px 15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 3px 8px 0 rgb(97 97 97 / 8%)",
          borderRadius: "6px",
          "& + .uld-list-item": {
            marginTop: "15px",
          },
          "& .uld-list-item-info": {
            display: "flex",
            alignItems: "center",
          },
          "& .uld-id": {
            fontSize: "18px",
            fontWeight: "600",
            color: colors.black2,
            paddingRight: "10px",
          },
          "& .uld-additionalInfo": {
            display: "block",
            width: "17.4rem",
            whiteSpace: "nowrap",
            overflow: "hidden !important",
            textOverflow: "ellipsis",
          },
        },
      },
      "& .filter-title-block": {
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& h2": {
          fontSize: "24px",
          "@media(max-width:767px)": {
            fontSize: "20px",
          },
        },
        "& img": {
          cursor: "pointer",
          width: "35px",
          padding: "10px",
        },
      },
    },
  },
  moreLinkWrapper: {
    "& .more-link-block": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      "& .more-link": {
        display: "block",
        lineHeight: "0",
        cursor: "pointer",
        "& svg": {
          fill: colors.black,
        },
      },
    },
  },
  customMenu: {
    "& .MuiMenu-paper": {
      boxShadow: "0 2px 5px 0 rgba(0,0,0,0.02)",
      overflow: "inherit",
      left: "auto !important",
      right: "46px",
    },
    "& .MuiList-root": {
      minWidth: 100,
      position: "relative",
      "& .MuiMenuItem-root": {
        transition:
          "color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        "&:hover": {
          backgroundColor: colors.orange,
          color: colors.white,
        },
      },
    },
  },
}));

export { SideBarStyle };
