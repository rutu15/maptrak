import { makeStyles } from "@material-ui/core/styles";

import { colors } from "@utils/constant";

const tableStyles = makeStyles({
  tableWrapper: {
    boxShadow: "0 3px 8px 0 rgba(97, 97, 97, 0.08)",
    backgroundColor: colors.white,
    borderRadius: "6px",
  },
});

export { tableStyles };
