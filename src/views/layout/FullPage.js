import React from "react";
import {
  Card,
  CardContent,
  Container,
  makeStyles,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";

import { colors } from "@utils/constant";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    backgroundColor: "#F4F6F8",
    display: "flex",
    height: "100%",
    minHeight: "100vh",
    flexDirection: "column",
    paddingBottom: 80,
    paddingTop: 80,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: colors.primary,
  },
  card: {
    overflow: "visible",
    display: "flex",
    position: "relative",
    maxWidth: 621,
    margin: "auto",
    "& > *": {
      flexGrow: 1,
      flexBasis: "50%",
      width: "50%",
    },
  },
  content: {
    padding: theme.spacing(7, 7, 7, 7),
  },
  logo: {
    alignSelf: "center",
    marginBottom: "54px",
  },
}));

function FullPage({ children, cardContentProps, isLoading = false }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth="md">
        <Card className={classes.card}>
          <CardContent
            classes={{ root: classes.content }}
            {...cardContentProps}
          >
            {children}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default FullPage;
