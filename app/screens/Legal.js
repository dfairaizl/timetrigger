import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, useHistory, useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import PrivacyPage from "../pages/Privacy";
import TermsPage from "../pages/Terms";

import Logo from "../assets/images/LogoLight.svg";
import Mark from "../assets/images/Mark.svg";

const styles = theme => ({
  altSection: {
    backgroundColor: theme.palette.background.default,
    paddingTop: "32px",
    paddingBottom: "32px"
  },
  container: {
    display: "flex"
  },
  navButton: {
    marginLeft: theme.spacing(2)
  },
  logo: {
    flex: 1
  },
  menuLink: {
    color: theme.palette.primary.contrastText,
    textDecoration: "none",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(0.5)
  },
  section: {
    backgroundColor: theme.palette.secondary.main,
    paddingTop: "32px",
    paddingBottom: "32px"
  },
  title: {
    color: theme.palette.primary.contrastText,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
    fontSize: '42px'
  },
  footer: {
    backgroundColor: "#2d2d2d",
    padding: theme.spacing(4)
  },
  footerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  footerMenu: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(2)
  },
  footerItem: {
    color: theme.palette.primary.contrastText,
    marginRight: theme.spacing(2)
  },
  footerCopyright: {
    display: "flex",
    flexDirection: "column"
  },
  footerLink: {
    color: theme.palette.primary.contrastText,
    textDecoration: "none",
  },
  copyright: {
    color: theme.palette.primary.contrastText,
    marginTop: theme.spacing(2)
  }
});

function Homepage({ auth, classes }) {
  let history = useHistory();
  let params = useParams();

  const pageTitle = params.slug === "terms" ? "Terms & Conditions" : "Privacy Policy"
  const Page = params.slug === "terms" ? <TermsPage /> : <PrivacyPage />

  return (
    <>
      <CssBaseline />
      <section className={classes.section}>
        <Container maxWidth="md" className={classes.container}>
          <Logo className={classes.logo} />
          <Hidden smDown>
            <HashLink smooth className={classes.menuLink} to="#about">
              <Typography display="inline" variant="subtitle2">
                About
              </Typography>
            </HashLink>
            <HashLink smooth className={classes.menuLink} to="#features">
              <Typography display="inline" variant="subtitle2">
                Features
              </Typography>
            </HashLink>
            <HashLink smooth className={classes.menuLink} to="#use-cases">
              <Typography display="inline" variant="subtitle2">
                Use Cases
              </Typography>
            </HashLink>
            <HashLink smooth className={classes.menuLink} to="#pricing">
              <Typography display="inline" variant="subtitle2">
                Pricing
              </Typography>
            </HashLink>
          </Hidden>
          <Button
            className={classes.navButton}
            color="primary"
            variant="outlined"
            onClick={() => history.push("/sign-up")}
          >
            Sign Up
          </Button>
        </Container>
        <Container maxWidth="md">
          <Typography
            align="center"
            className={classes.title}
            color="primary"
            variant="h1"
          >
            {pageTitle}
          </Typography>
        </Container>
      </section>
      <section id="about" className={classes.altSection}>
        <Container maxWidth="md">
          {Page}
        </Container>
      </section>
      <footer className={classes.footer}>
        <Container maxWidth="lg" className={classes.footerContainer}>
          <Grid justify="center" direction="column" container>
            <Grid item className={classes.footerMenu}>
              <Typography
                align="center"
                className={classes.footerItem}
                variant="subtitle2"
              >
                <a href="mailto:support@timetrigger.dev" className={classes.footerLink}>Contact</a>
              </Typography>
              <Typography
                align="center"
                className={classes.footerItem}
                variant="subtitle2"
              >
                <Link to="/privacy" className={classes.footerLink}>Privacy</Link>
              </Typography>
              <Typography
                align="center"
                className={classes.footerItem}
                variant="subtitle2"
              >
                <Link to="/terms" className={classes.footerLink}>Terms</Link>
              </Typography>
            </Grid>
            <Grid className={classes.footerCopyright} alignItems="center" item>
              <Mark className={classes.mark} />
              <Typography
                align="center"
                className={classes.copyright}
                variant="caption1"
              >
                © 2021 Time Trigger.<br />All rights reserved.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </>
  );
}

export default connect(state => {
  return { auth: state.auth };
})(withStyles(styles)(Homepage));
