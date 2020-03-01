import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../../assets/images/Logo.svg";

import Menu from "./Menu";

const styles = theme => ({
  appBar: {
    borderBottom: "1px solid #E6E6E6",
    position: "relative"
  },
  logo: {
    flexGrow: "1"
  }
});

const Nav = ({ classes, history, auth }) => {
  const { user = {} } = auth;

  return (
    <AppBar position="static" className={classes.appBar} elevation={0}>
      <Toolbar>
        <Link to="/" className={classes.logo}>
          <Logo />
        </Link>
        {auth.hasAuthStatus && user ? <Menu user={user} /> : null}
      </Toolbar>
    </AppBar>
  );
};

export default connect(state => {
  return { auth: state.auth };
})(withStyles(styles)(withRouter(Nav)));
