import { makeStyles } from "@material-ui/core/styles";

import { colors } from "@utils/constant";

const RequestFormStyle = makeStyles((theme) => ({
  OnlineRequestWrapper: {
    background: colors.lightbg,
    minHeight: "100vh",
    "& .request-form-section": {
      padding: "30px",
      "@media (max-width: 767px)": {
        padding: "30px 15px",
      },
    },
    "& .filter-search-title-strip": {
      "@media (max-width: 1199px)": {
        flexWrap: "wrap",
      },
      "& .filter-search-wrapper": {
        "@media (max-width: 1199px)": {
          marginTop: "20px",
          width: "100%",
          justifyContent: "flex-end",
        },
        "@media (max-width: 991px)": {
          marginTop: "0",
          flexWrap: "wrap",
        },
        "& .form-gourp": {
          "& input": {
            minWidth: "400px",
            "@media (max-width: 767px)": {
              minWidth: "inherit",
            },
          },
        },
        "& .search-col": {
          "@media (max-width: 991px)": {
            maxWidth: "100%",
            flex: "0 0 100%",
            marginBottom: "20px",
          },
        },
      },
    },
  },
}));

export { RequestFormStyle };
