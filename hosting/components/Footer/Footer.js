import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Mark from "../../assets/images/Mark.svg";

const styles = (theme) => ({
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
    alignItems: "center",
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

const Footer = ({ classes }) => {
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg" className={classes.footerContainer}>
        <Grid justify="center" direction="column" alignItems="center" container>
          <Grid item className={classes.footerMenu}>
            <Typography
              align="center"
              className={classes.footerItem}
              variant="subtitle2"
            >
              <a
                href="mailto:support@timetrigger.dev"
                className={classes.footerLink}
              >
                Contact
              </a>
            </Typography>
            <Typography
              align="center"
              className={classes.footerItem}
              variant="subtitle2"
            >
              <Link to="/legal/privacy" className={classes.footerLink}>
                Privacy
              </Link>
            </Typography>
            <Typography
              align="center"
              className={classes.footerItem}
              variant="subtitle2"
            >
              <Link to="/legal/terms" className={classes.footerLink}>
                Terms
              </Link>
            </Typography>
          </Grid>
          <Grid className={classes.footerCopyright} item>
            <Mark className={classes.mark} />
            <Typography
              align="center"
              className={classes.copyright}
              variant="caption"
            >
              © 2021 Time Trigger.
              <br />
              All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

Footer.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Footer);
