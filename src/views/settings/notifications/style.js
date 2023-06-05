import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const NotificationStyle = makeStyles((theme) => ({
  NotificationPageWrapper: {
    "& .MuiBackdrop-root": {
      color: " #fff",
      zIndex: "1201",
    },
    "& .setting-page": {
      "& h1": {
        color: colors.darkBlack,
        textTransform: "none",
      },
      "& .right-content": {
        "& .right-content-inner": {
          padding: "30px",
          "@media (max-width: 767px)": {
            padding: "20px",
          },
        },
      },
      "& .form-outer": {
        "& .form-row": {
          display: "flex",
          margin: "0 -15px",
          "@media (max-width: 767px)": {
            flexWrap: "wrap",
          },
          "& .form-group": {
            marginBottom: "25px",
          },
          "& .two-column": {
            flex: "0 0 50%",
            maxWidth: "50%",
            padding: "0 15px",
            "& .chip-input": {
              "& > div": {
                minHeight: "50px",
                border: "1px solid #e7e4f1",
                marginBottom: 0,
                borderRadius: "6px",
                alignItems: "center",
                padding: "10px 15px 0",
                overflow: "hidden",
                "&::before": {
                  display: "none",
                },
                "&::focus": {
                  border: "none",
                },
                "& input": {
                  border: "none",
                  padding: "0 !important",
                },
              },
              "& .MuiChip-root": {
                height: "28px",
                lineHeight: "28px",
                backgroundColor: colors.lightGraybg,
                fontSize: "16px",
                color: colors.black,
                borderRadius: "30px",
              },
              "& .MuiInput-root": {
                marginTop: "-10px",
                "& input": {
                  height: "38px",
                  lineHeight: "38px",
                },
              },
            },
            "& .error-text": {
              color: "red",
            },
            "&.chip-input-wrapper": {
              "& .label-text": {
                display: "flex",
                alignItems: "center",
              },
            },
            "@media (max-width: 767px)": {
              flex: "0 0 100%",
              maxWidth: "100%",
            },
          },
        },
      },
    },
  },
}));

export { NotificationStyle };
