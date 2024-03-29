import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import Mark from "./assets/images/Mark.svg";

import Nav from "./components/Nav/Nav";

const styles = (theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    width: "100%",
  },
  flex: {
    flex: 1,
  },
  footer: {
    backgroundColor: theme.palette.secondary.main,
    marginTop: theme.spacing(2),
  },
  layout: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  love: {
    color: theme.palette.primary.main,
    width: "20px",
    transform: "translateY(5px)",
  },
});

function Layout(props) {
  const { classes, children } = props;

  return (
    <React.Fragment>
      <Helmet>
        <title>Time Trigger</title>
      </Helmet>
      <CssBaseline />
      <div className={classes.layout}>
        <Nav />
        <Container className={classes.flex}>{children}</Container>
        <AppBar
          component="footer"
          position="static"
          color="secondary"
          className={classes.footer}
        >
          <Toolbar>
            <div className={classes.container}>
              <div>
                <Typography variant="body1" color="inherit" noWrap>
                  Made with <FavoriteBorder className={classes.love} /> in New
                  York City
                </Typography>
                <Typography variant="caption" color="inherit" noWrap>
                  Copyright © 2020 Time Trigger
                </Typography>
              </div>
              <Mark className={classes.mark} />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </React.Fragment>
  );
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

export default withStyles(styles)(Layout);
