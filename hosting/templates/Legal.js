import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

import PrivacyPage from "../pages/Privacy";
import TermsPage from "../pages/Terms";

import Hero from "../components/Hero/Hero";
import Footer from "../components/Footer/Footer";

const styles = (theme) => ({
  altSection: {
    backgroundColor: theme.palette.background.default,
    paddingTop: "32px",
    paddingBottom: "32px",
  },
  container: {
    display: "flex",
  },
  navButton: {
    marginLeft: theme.spacing(2),
  },
  logo: {
    flex: 1,
  },
  menuLink: {
    color: theme.palette.primary.contrastText,
    textDecoration: "none",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(0.5),
  },
  section: {
    backgroundColor: theme.palette.secondary.main,
    paddingTop: "32px",
    paddingBottom: "32px",
  },
  title: {
    color: theme.palette.primary.contrastText,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
    fontSize: "42px",
  },
  footer: {
    backgroundColor: "#2d2d2d",
    padding: theme.spacing(4),
  },
  footerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerMenu: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
  footerItem: {
    color: theme.palette.primary.contrastText,
    marginRight: theme.spacing(2),
  },
  footerCopyright: {
    display: "flex",
    flexDirection: "column",
  },
  footerLink: {
    color: theme.palette.primary.contrastText,
    textDecoration: "none",
  },
  copyright: {
    color: theme.palette.primary.contrastText,
    marginTop: theme.spacing(2),
  },
});

function Legal({ classes }) {
  let params = useParams();

  const pageTitle =
    params.slug === "terms" ? "Terms & Conditions" : "Privacy Policy";
  const Page = params.slug === "terms" ? <TermsPage /> : <PrivacyPage />;

  return (
    <>
      <CssBaseline />
      <Hero title={pageTitle} />
      <section id="about" className={classes.altSection}>
        <Container maxWidth="md">{Page}</Container>
      </section>
      <Footer />
    </>
  );
}

Legal.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Legal);
