import { makeStyles } from "@material-ui/core/styles";
import { colors } from "@utils/constant";

const NoteStyle = makeStyles({
    NoteWrapper: {
    // boxShadow: "0 3px 8px 0 rgba(97, 97, 97, 0.08)",
    backgroundColor: colors.white,
    borderRadius: "6px",
    marginTop: 25,
    },
    customBox: {
        maxHeight: 300,
        "& .MuiTypography-root": {
          marginBottom: "10px",
          fontSize: "24px",
          fontWeight: "600",
        },
        "& textarea": {
            overflow: "auto !important",
            verticalAlign: "top",
            resize: "none",
            border: "1px solid #e7e4f1",
            borderRadius: "6px",
            padding: "10px 15px !important",
            minHeight: "200px",
            lineHeight: "1.321",
            minWidth: "100%",
          },
          "& .bottom-button-block": {
            padding: "15px 0 0",
            paddingBottom: "15px",
            display: "flex",
            "@media (max-width: 480px)": {
              flexDirection: "column",
            },
            "& button": {
              height: "50px",
              lineHeight: "50px",
              fontWeight: "600",
              fontSize: "16px",
              minWidth: "165px",
              textTransform: "uppercase",
              "@media (max-width: 480px)": {
                minWidth: "100%",
                marginBottom: "15px",
              },
              "& + button": {
                marginLeft: "15px",
                "@media (max-width: 480px)": {
                  margin: "0 ",
                },
              },
            },
          },
          "& .primary-btn": {
            color: "default",
            height: "50px",
            "&:hover": {
              boxShadow: "none",
              color: "default",
              backgroundColor: "transparent",
            },
          },
    },
})

export { NoteStyle };