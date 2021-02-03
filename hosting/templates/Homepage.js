import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Hero from "../components/Hero/Hero";
import Footer from "../components/Footer/Footer";

import Stars from "../assets/images/Stars@2x.png";

const styles = (theme) => ({
  aboutDetail: {
    display: "flex",
  },
  aboutTitle: {
    paddingBottom: theme.spacing(2),
  },
  altSection: {
    backgroundColor: theme.palette.background.default,
    paddingTop: "32px",
    paddingBottom: "32px",
  },
  altTitle: {
    color: theme.palette.primary.main,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  bodyLink: {
    color: theme.palette.primary.contrastText,
    textDecoration: "underline",
  },
  container: {
    display: "flex",
  },
  gridSection: {
    paddingBottom: theme.spacing(8),
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
  subtitle: {
    color: theme.palette.primary.contrastText,
    fontSize: "22px",
    fontWeight: "normal",
    paddingBottom: theme.spacing(6),
  },
  featureSection: {
    backgroundColor: theme.palette.secondary.main,
    background: `url(${Stars}) top center`,
    backgroundSize: "contain",
    paddingTop: "32px",
    paddingBottom: "32px",
  },
  featureHeader: {
    color: theme.palette.primary.contrastText,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  featureTitle: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.contrastText,
    paddingBottom: theme.spacing(2),
  },
  featureDetail: {
    color: theme.palette.primary.contrastText,
  },
  featureItem: {
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(8),
  },
  title: {
    color: theme.palette.primary.contrastText,
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
    fontSize: "42px",
  },
  useCaseDivider: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  pricingCard: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(3),
  },
  pricingCardTitle: {
    paddingBottom: theme.spacing(2),
  },
  pricingCostTitle: {
    paddingBottom: theme.spacing(4),
  },
  freeTier: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  list: {
    margin: theme.spacing(2),
  },
});

function Homepage({ classes }) {
  let history = useHistory();

  return (
    <>
      <Helmet>
        <title>Time Trigger | Point-in-time Notification API</title>
      </Helmet>
      <CssBaseline />
      <Hero
        title="Data Exactly When You Need It"
        subtitle="Point-in-time based event system to deliver data to your API exactly when you need it."
      />
      <section id="about" className={classes.altSection}>
        <Container maxWidth="md">
          <Typography
            align="center"
            className={classes.altTitle}
            color="secondary"
            variant="h3"
          >
            What Is Time Trigger?
          </Typography>
        </Container>
        <Container>
          <Grid className={classes.gridSection} container justify="center">
            <Grid item md={1} sm={2} xs={3}>
              <Typography variant="h2">1.</Typography>
            </Grid>
            <Grid item md={6} xs={9}>
              <Typography className={classes.aboutTitle} variant="h3">
                Scheduling System
              </Typography>
              <Typography variant="subtitle1">
                Time Trigger is an event based scheduling system that allows you
                to send JSON data to your backend or API at a specific time in
                the future.
              </Typography>
            </Grid>
          </Grid>
          <Grid className={classes.gridSection} container justify="center">
            <Grid item md={1} sm={2} xs={3}>
              <Typography variant="h2">2.</Typography>
            </Grid>
            <Grid item md={6} xs={9}>
              <Typography className={classes.aboutTitle} variant="h3">
                An API
              </Typography>
              <Typography variant="subtitle1">
                You interact with Time Trigger via a simple RESTful API and
                create, modify, and cancel time based triggers.
              </Typography>
            </Grid>
          </Grid>
          <Grid className={classes.gridSection} container justify="center">
            <Grid item md={1} sm={2} xs={3}>
              <Typography variant="h2">3.</Typography>
            </Grid>
            <Grid item md={6} xs={9}>
              <Typography className={classes.aboutTitle} variant="h3">
                Cron Alternative
              </Typography>
              <Typography variant="subtitle1">
                Time Trigger does not operate on a repeating schedule. Modern
                applications demand real-time systems, and Time Trigger is meant
                run individual tasks a a specific time.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </section>
      <section id="features" className={classes.featureSection}>
        <Container maxWidth="md">
          <Typography
            align="center"
            className={classes.featureHeader}
            color="primary"
            variant="h3"
          >
            Features
          </Typography>
        </Container>
        <Grid justify="center" container>
          <Grid item md={6} xs={10} className={classes.featureItem}>
            <Typography
              align="center"
              className={classes.featureTitle}
              variant="h3"
            >
              Usable By Humans
            </Typography>
            <Typography
              align="center"
              className={classes.featureDetail}
              variant="subtitle1"
            >
              Time Trigger allows developers to schedule when triggers run in
              easy humas readable dates like “24 hours from now” or “next week”.
            </Typography>
          </Grid>
        </Grid>
        <Grid justify="center" container>
          <Grid item md={6} xs={10} className={classes.featureItem}>
            <Typography
              align="center"
              className={classes.featureTitle}
              variant="h3"
            >
              Secure
            </Typography>
            <Typography
              align="center"
              className={classes.featureDetail}
              variant="subtitle1"
            >
              Time Trigger is meant to help secure the internet and prevent
              abuse. API Targets you send triggers to must be owned and verified
              by you.
            </Typography>
          </Grid>
        </Grid>
        <Grid justify="center" container>
          <Grid item md={6} xs={10} className={classes.featureItem}>
            <Typography
              align="center"
              className={classes.featureTitle}
              variant="h3"
            >
              Easy To Use
            </Typography>
            <Typography
              align="center"
              className={classes.featureDetail}
              variant="subtitle1"
            >
              Time Trigger is easy to use - Triggers can be rescheduled before
              or after delivery and cancelled if it is no longer needed.
            </Typography>
          </Grid>
        </Grid>
      </section>
      <section id="use-cases" className={classes.altSection}>
        <Container maxWidth="md">
          <Typography
            align="center"
            className={classes.altTitle}
            color="secondary"
            variant="h3"
          >
            Use Cases
          </Typography>
        </Container>
        <Grid className={classes.gridSection} container justify="center">
          <Grid item md={6} sm={8} xs={10} className={classes.useCaseSection}>
            <Typography className={classes.aboutTitle} variant="h3">
              Reminders
            </Typography>
            <Typography
              gutterBottom
              paragraph
              variant="subtitle1"
              component="ol"
            >
              <li className={classes.list}>
                Send notifications to your API 24 hours after a users signs up
                to remind them to verify their email.
              </li>
              <li className={classes.list}>
                Send triggers to your API with data for sending push
                notifications to your users.
              </li>
            </Typography>
          </Grid>
        </Grid>
        <Grid className={classes.gridSection} container justify="center">
          <Grid item md={6} sm={8} xs={10} className={classes.useCaseSection}>
            <Typography className={classes.aboutTitle} variant="h3">
              Payments
            </Typography>
            <Typography
              gutterBottom
              paragraph
              variant="subtitle1"
              component="ol"
            >
              <li className={classes.list}>
                Use Triggers to notify your API to process monthly recurring
                charges.
              </li>
            </Typography>
          </Grid>
        </Grid>
      </section>
      <section id="pricing" className={classes.section}>
        <Container maxWidth="md">
          <Typography
            align="center"
            className={classes.featureHeader}
            color="primary"
            variant="h3"
          >
            Pricing
          </Typography>
        </Container>
        <Container maxWidth="xl">
          <Grid container justify="center" spacing={4}>
            <Grid item xs={10} sm={8} md={3}>
              <Paper className={classes.pricingCard}>
                <Typography
                  align="center"
                  className={classes.pricingCardTitle}
                  variant="h3"
                >
                  100K Triggers
                </Typography>
                <Typography
                  align="center"
                  className={classes.pricingCostTitle}
                  color="primary"
                  variant="h4"
                >
                  $5 / Month
                </Typography>
                <Typography
                  align="center"
                  className={classes.pricingCardTitle}
                  variant="subtitle1"
                >
                  Send 100,000 triggers to your API.
                </Typography>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => history.push("/sign-up")}
                >
                  Sign Up
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={10} sm={8} md={3}>
              <Paper className={classes.pricingCard}>
                <Typography
                  align="center"
                  className={classes.pricingCardTitle}
                  variant="h3"
                >
                  1M Triggers
                </Typography>
                <Typography
                  align="center"
                  className={classes.pricingCostTitle}
                  color="primary"
                  variant="h4"
                >
                  $15 / Month
                </Typography>
                <Typography
                  align="center"
                  className={classes.pricingCardTitle}
                  variant="subtitle1"
                >
                  Send 1,000,000 triggers to your API.
                </Typography>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => history.push("/sign-up")}
                >
                  Sign Up
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={10} sm={8} md={3}>
              <Paper className={classes.pricingCard}>
                <Typography
                  align="center"
                  className={classes.pricingCardTitle}
                  variant="h3"
                >
                  Unlimited Triggers
                </Typography>
                <Typography
                  align="center"
                  className={classes.pricingCostTitle}
                  color="primary"
                  variant="h4"
                >
                  Contact Us
                </Typography>
                <Typography
                  align="center"
                  className={classes.pricingCardTitle}
                  variant="subtitle1"
                >
                  Create a custom plan that fits your needs.
                </Typography>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => history.push("/sign-up")}
                >
                  Contact Us
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Container className={classes.freeTier} maxWidth="md">
          <Typography
            align="center"
            className={classes.featureDetail}
            variant="subtitle2"
          >
            Want to try Time Trigger out? You can use it for free if you
            schedule less than 10k triggers per month. Just{" "}
            <Link className={classes.bodyLink} to="/sign-up">
              sign up for an account here
            </Link>
            .
          </Typography>
        </Container>
      </section>
      <Footer />
    </>
  );
}

Homepage.propTypes = {
  classes: PropTypes.object,
};

export default connect((state) => {
  return { auth: state.auth };
})(withStyles(styles)(Homepage));
