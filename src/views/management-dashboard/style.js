import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const MainDashboardStyle = makeStyles({
  MainDashboardWrapper: {
    "& .MuiBackdrop-root": {
      color: " #fff",
      zIndex: "1201",
    },
    "& .filter-main-wrapper": {
      padding: "30px 30px 0",
      position: "sticky",
      top: "101px",
      background: colors.lightGray,
      zIndex: 9,
      ".open-filter &":{
        zIndex: 10,
      },
      "@media (max-width:1359px)": {
        padding: "30px",
      },
      "@media (max-width:1199px)": {
        top: "84px",
      },
      "@media (max-width:991px)": {
        top: "80px",
      },
      "@media (max-width:480px)": {
        top: "74px",
      },
      "@media (max-width:767px)": {
        padding: "30px 15px",
      },
      "& .filter-wrapper": {
        margin: "0 !important",
        boxShadow: "0 3px 8px 0 rgb(97 97 97 / 8%)",
        padding: "18px 25px 20px 25px",
        borderRadius: "6px",
        backgroundColor: colors.white,
        "& .filter-form-row": {
          "& .form-gourp": {
            flex: "0 0 14.45%",
            maxWidth: "14.45%",
            "@media (max-width:1359px)": {
              flex: "0 0 100%",
              maxWidth: "100%",
            },
            "&.reset-column": {
              flex: "0 0 9.56%",
              maxWidth: "9.56%",
              marginTop: "10px",
              "@media (max-width: 1300px)": {
                flex: "0 0 100%",
                maxWidth: "100%",
                order: "-1",
                marginBottom: "20px",
              },
              "& .reset-wrapper": {
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                "@media (max-width: 1359px)": {
                  justifyContent: "space-between",
                },
                "@media (max-width: 767px)": {
                  flexWrap: "wrap",
                },
                "& .primary-btn.blue-btn": {
                  height: "50px",
                  lineHeight: "50px",
                  textTransform: "initial",
                  minWidth: "88px",
                  "@media (max-width: 1359px)": {
                    height: "40px",
                    lineHeight: "40px",
                  },
                },
              },
            },
          },
        },
      },
    },
    "& .dashboard-page": {
      "& .inner-page": {
        "@media (max-width:1359px)": {
          paddingTop: 0,
        },
      },
    },
  },
});

export { MainDashboardStyle };
