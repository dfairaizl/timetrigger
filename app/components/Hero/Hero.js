import React from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";

import Logo from "../../assets/images/LogoLight.svg";

const styles = (theme) => ({
  container: {
    display: "flex",
  },
  section: {
    backgroundColor: theme.palette.secondary.main,
    paddingTop: "32px",
    paddingBottom: "32px",
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
  navButton: {
    marginLeft: theme.spacing(2),
  },
  subtitle: {
    color: theme.palette.primary.contrastText,
    fontSize: "22px",
    fontWeight: "normal",
    paddingBottom: theme.spacing(6),
  },
  title: {
    color: theme.palette.primary.contrastText,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
    fontSize: "42px",
  },
});

function Hero({ title, subtitle, classes }) {
  let history = useHistory();

  const Subtitle = (subtitle) => {
    if (!subtitle.length) {
      return null;
    }

    return (
      <Typography align="center" className={classes.subtitle} variant="h5">
        {subtitle}
      </Typography>
    );
  };

  return (
    <section className={classes.section}>
      <Container maxWidth="md" className={classes.container}>
        <Link className={classes.logo} to="/">
          <Logo />
        </Link>
        <Hidden smDown>
          <HashLink smooth className={classes.menuLink} to="/#about">
            <Typography display="inline" variant="subtitle2">
              About
            </Typography>
          </HashLink>
          <HashLink smooth className={classes.menuLink} to="/#features">
            <Typography display="inline" variant="subtitle2">
              Features
            </Typography>
          </HashLink>
          <HashLink smooth className={classes.menuLink} to="/#use-cases">
            <Typography display="inline" variant="subtitle2">
              Use Cases
            </Typography>
          </HashLink>
          <HashLink smooth className={classes.menuLink} to="/#pricing">
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
          {title}
        </Typography>
        <Subtitle subtitle={subtitle} />
      </Container>
    </section>
  );
}

Hero.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default withStyles(styles)(Hero);
