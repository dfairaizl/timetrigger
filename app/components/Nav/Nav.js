import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Logo from "../../assets/images/Logo.svg";
import Toolbar from "@material-ui/core/Toolbar";

import Menu from "./Menu";

const styles = theme => ({
  appBar: {
    borderBottom: "1px solid #E6E6E6",
    position: "relative"
  },
  logo: {
    flexGrow: "1"
  },
  docsButton: {
    marginRight: theme.spacing()
  }
});

const Nav = ({ classes, history, auth }) => {
  const { user = {} } = auth;

  const docsButtonClick = () => {
    history.push("/docs");
  };

  return (
    <AppBar position="static" className={classes.appBar} elevation={0}>
      <Toolbar>
        <Link to="/" className={classes.logo}>
          <Logo />
        </Link>
        <Button
          className={styles.docsButton}
          color="inherit"
          onClick={docsButtonClick}
        >
          Docs
        </Button>
        {auth.hasAuthStatus && user ? <Menu user={user} /> : null}
      </Toolbar>
    </AppBar>
  );
};

export default connect(state => {
  return { auth: state.auth };
})(withStyles(styles)(withRouter(Nav)));
