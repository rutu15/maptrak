import { makeStyles } from "@material-ui/core";
import { colors } from "@utils/constant";

const EditBlockStyle = makeStyles({
  EditBlockWrapper: {
    "& .MuiBackdrop-root": {
      color: " #fff",
      zIndex: "1201",
    },
    "& .edit-block": {
      padding: "30px",

      "@media(max-width:1279px)": {
        padding: "25px",
      },
      "@media(max-width:767px)": {
        padding: "15px",
      },
      "& .edit-block-header": {
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: "20px",
        marginBottom: "20px",
        "& .link-block": {
          "& span": {
            color: colors.orange,
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            "& em": {
              lineHeight: "0",
              display: "inline-block",
              marginRight: "5px",
            },
          },
        },
        "& .inner-heading": {
          marginRight: "10px",
          "& span": {
            fontSize: "24px",
            lineHeight: "1",
            fontWeight: "700",
            color: colors.black2,
          },
          "& p": {
            fontSize: "16px",
            color: colors.black1,
            lineHeight: "1",
            marginBottom: "6px",
          },
          "& img": {
            margin: "0 0 15px",
            height: "120px",
            width: "120px",
            borderRadius: "50%",
            objectFit: "cover",
          },
        },
      },
      "& .edit-block-list ": {
        paddingTop: "20px",
        borderTop: "1px solid #e3e3e3",
        marginTop: "20px",
        "& ul": {
          fontSize: "14px",
          lineHeight: "1.71",
          fontWeight: "600",
          display: "block",
          "& li": {
            paddingTop: "15px",
            "& .value-block": {
              "& p": {
                wordBreak: "break-all",
              },
            },
          },
        },
        "& h6": {
          fontSize: "14px",
          lineHeight: "1",
          color: colors.gray3,
          marginBottom: "6px",
        },
      },
      "& .edit-block-content": {
        paddingTop: "20px",
        borderTop: "1px solid #e3e3e3",
        marginTop: "20px",
        "& .span-wrapper": {
          width: "100%",
          "& .active": {
            color: colors.primary,
          },
          "& .inactive": {
            color: colors.red2,
          },
          "& span": {
            fontSize: "14px",
            lineHeight: "1.71",
            fontWeight: "600",
            display: "inlne-block",
            textDecoration: "underline",
            textTransform: "capitalize",
            cursor: "pointer",
          },
          "& p": {
            display: "inline-block",
            marginLeft: "10px",
          },
          "& h6": {
            fontSize: "14px",
            lineHeight: "1",
            color: colors.gray3,
            marginBottom: "6px",
          },
        },
      },
    },
  },
});

export { EditBlockStyle };
