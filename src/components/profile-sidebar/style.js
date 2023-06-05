import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@utils/constant";

const ProfileSidebarStyle = makeStyles({
  profilesidebar: {
    " & aside": {
      "& ul": {
        " & li": {
          "&:not(.logout-link)": {
            "& a": {
              "&.active,&.active:hover": {
                color: colors.white,
                textDecoration: "none",
                backgroundColor: colors.skyblue,
                "& em": {
                  "& .active-img": {
                    opacity: "1",
                  },
                  "& .normal-img": {
                    opacity: "0",
                  },
                },
              },
              "&:hover": {
                color: colors.red,
                textDecoration: "none",
                "& em": {
                  "& .hover-img": {
                    opacity: "1",
                  },
                  "& .normal-img": {
                    opacity: "0",
                  },
                },
              },
            },
          },
          " & a": {
            padding: "20px 30px",
            display: "flex",
            alignItems: "center",
            textDecoration: "none !important",
            color: colors.black,
            cursor: "pointer",
            backgroundColor: "transparent",
            borderRadius: "6px",
            fontSize: "14px",
            "& em": {
              position: "relative",
              lineHeight: "0",
              marginRight: "14px",
              "& img": {
                transition: "all 0.3s",
              },
              "& .active-img , .hover-img": {
                position: "absolute",
                left: "0",
                top: "0",
                opacity: "0",
              },
            },
          },
        },
      },
    },
  },
});

export { ProfileSidebarStyle };
