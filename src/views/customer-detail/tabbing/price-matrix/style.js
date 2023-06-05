import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const PriceMatrixStyle = makeStyles({
  TabbingWrapper: {
    "& .drop-down-wrapper": {
      maxWidth: "250px",
      marginBottom: "25px",
    },
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
    "& .weekly-row-wrapper": {
      marginTop:'30px',
      "& .weekly-row": {
        display: "flex",
        flexWrap: "wrap",
        alignItems: 'center',
        "& + .weekly-row": {
          marginTop:'24px'
        },
        "& .textfield-wrapper": {
          display: "flex",
          flexWrap: "wrap",
          padding:"0 15px",
          flex: '1',
          "@media(max-width:767px)": {
            padding:"0",
            maxWidth: '100%',
            flex: '0 0 100%',
          },
          "& .MuiFormControl-root":{
            maxWidth: '120px',
            "& + .MuiFormControl-root":{
              marginLeft: '20px',
            }
          }
        },
        "& .label-text":{
          paddingRight:"15px",
          margin:'0',
          maxWidth: '300px',
          flex: '0 0 300px',
          "@media(max-width:767px)": {
            maxWidth: '100%',
            flex: '0 0 100%',
            paddingRight:"0",
            margin:'0 0 10px',
          }
        }
      },
    }
  },
});

export { PriceMatrixStyle };
