import { makeStyles } from "@material-ui/core/styles";

// import { colors } from "@utils/constant";

const invoiceStyle = makeStyles((theme) => ({
  invoiceWrapper: {
    "& .MuiBackdrop-root": {
      color: " #fff",
      zIndex: "1201",
    },
    background: "#fff",
    minHeight: "100vh",
    "& .request-form-section": {
      // padding: "30px",
      "@media (max-width: 767px)": {
        padding: "30px 15px",
      },
      "& .filter-search-title-strip": {
        "@media (max-width: 991px)": {
          flexDirection: "row",
          alignItems: "center",
        },
        "@media (max-width: 424px)": {
          flexDirection: "column",
          alignItems: "flex-start",
        },
        "& h1": {
          "@media (max-width: 991px)": {
            margin: 0,
          },
          "@media (max-width: 424px)": {
            margin: "0 0 20px 0",
          },
        },
        "& .filter-search-wrapper": {
          "@media (max-width: 675px)": {
            justifyContent: "flex-end",
          },
          "& .inner-col": {
            "@media (max-width: 675px)": {
              flex: "initial",
              maxWidth: "initial",
            },
            "@media (max-width: 424px)": {
              flex: "0 0 100%",
              maxWidth: "100%",
            },
          },
        },
      },
    },
  },
}));

export { invoiceStyle };
