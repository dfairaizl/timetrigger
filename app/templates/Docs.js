import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import Layout from "../Layout";

const styles = (theme) => ({
  code: {
    backgroundColor: theme.palette.secondary.light,
    borderColor: theme.palette.secondary.main,
    borderRadius: "10px",
    borderStyle: "solid",
    borderWidth: "1px",
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText,
    overflow: "auto",
  },
  content: {
    borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
    paddingLeft: theme.spacing(2),
  },
  formatted: {
    fontSize: "1rem",
    margin: "0px",
  },
  heading: {
    marginTop: theme.spacing(4),
  },
  section: {
    marginBottom: theme.spacing(8),
    "&:last-child": {
      // paddingBottom: theme.spacing(4),
      marginBottom: theme.spacing(1),
    },
  },
  subHeading: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(1),
  },
  paragraph: {
    marginTop: theme.spacing(2),
  },
  docuMenu: {
    marginTop: theme.spacing(4),
  },
});

function Docs({ classes }) {
  return (
    <Layout>
      <Container className={classes.root}>
        <Grid container spacing={4}>
          <Grid item xs={2}>
            <List className={classes.docuMenu}>
              <ListItem button>
                <ListItemText>Introduction</ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemText>Concepts</ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemText>Triggers</ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemText>Targets</ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemText>Usage</ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemText>API Reference</ListItemText>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={8} className={classes.content}>
            <section className={classes.section}>
              <Typography variant="h3" className={classes.heading}>
                Introduction
              </Typography>
              <Typography
                variant="h5"
                color="textSecondary"
                className={classes.subHeading}
              >
                What is Time Trigger?
              </Typography>
              <Divider />
              <Typography variant="body1" className={classes.paragraph}>
                Time Trigger is a service for delivering point-in-time data to
                your endpoint. This service was created out of a need to deliver
                data to backend services on a unpredictable schedule - for
                example send a shipping reminder 24 hours after someone sells an
                item.
              </Typography>
              <Typography variant="body1" className={classes.paragraph}>
                Cron is not a good fit for these use cases because it prohibits
                accuracy in real time systems so we built a flexible system with
                an easy to use API to send user defined JSON data to any
                endpoint, on any schedule.
              </Typography>
            </section>
            <section className={classes.section}>
              <Typography variant="h3" className={classes.heading}>
                Concepts
              </Typography>
              <Typography
                variant="h5"
                color="textSecondary"
                className={classes.subHeading}
              >
                Triggers and Targets
              </Typography>
              <Divider />
              <Typography variant="body1" className={classes.paragraph}>
                There are two fundamental concepts that allow Time Trigger to
                function - triggers and targets.
              </Typography>
              <Typography variant="body1" className={classes.paragraph}>
                <strong>Triggers</strong> are the actual tasks you want to run
                at a certain time. For instance sending a JSON payload to a
                webhook <em>one hour from now</em>.
              </Typography>
              <Typography variant="body1" className={classes.paragraph}>
                <strong>Targets</strong> are the endpoints triggers are sent to
                e.g. a webhooks API or some other backend service.
              </Typography>
              <Typography variant="body1" className={classes.paragraph}>
                A typical usecase for targets is to separate out environments
                such as staging and production, or to seperate systems such as
                billing updates or shipping reminders.
              </Typography>
            </section>
            <section className={classes.section}>
              <Typography variant="h3" className={classes.heading}>
                Triggers
              </Typography>
              <Typography
                variant="h5"
                color="textSecondary"
                className={classes.subHeading}
              >
                Trigger Functionality
              </Typography>
              <Divider />
              <Typography variant="body1" className={classes.paragraph}>
                Triggers have three main components: A trigger at date, a
                target, and a payload.
              </Typography>
              <Typography variant="h6" className={classes.paragraph}>
                Trigger At
              </Typography>
              <Typography variant="body1" className={classes.paragraph}>
                Trigger at is the date when the trigger will fire. It can be an
                absolute date, but more importantly is can a human readable{" "}
                <em>relative</em> date string. The following are all examples of
                valid dates for a trigger:
                <ul>
                  <li>
                    <pre className={classes.formatted}>
                      tomorrow, next friday, next monday
                    </pre>
                  </li>
                  <li>
                    <pre className={classes.formatted}>March 3rd, 2020</pre>
                  </li>
                  <li>
                    <pre className={classes.formatted}>
                      2020-03-02T14:30:33.057Z, 2020-03-02
                    </pre>
                  </li>
                  <li>
                    <pre className={classes.formatted}>24 hours from now</pre>
                  </li>
                  <li>
                    <pre className={classes.formatted}>1 hour from now</pre>
                  </li>
                  <li>
                    <pre className={classes.formatted}>2 day from now</pre>
                  </li>
                </ul>
              </Typography>
              <Typography variant="body1" className={classes.paragraph}>
                The only exception is that dates{" "}
                <strong>must be in the future.</strong>
              </Typography>
              <Typography variant="h6" className={classes.paragraph}>
                Targets
              </Typography>
              <Typography variant="body1" className={classes.paragraph}>
                Triggers must also have a target to fire against. A targret is
                defined in the Time Trigger UI and will return an ID. This ID is
                unique to that target and the ID must be passed in the{" "}
                <em>target</em> param of the API (documented more below).
              </Typography>
              <Typography variant="h6" className={classes.paragraph}>
                Payload
              </Typography>
              <Typography variant="body1" className={classes.paragraph}>
                Triggers also have optionally have a JSON payload that will be
                delivered to the target. This can be any valid JSON object.
              </Typography>
            </section>
            <section className={classes.section}>
              <Typography variant="h3" className={classes.heading}>
                Targets
              </Typography>
              <Typography
                variant="h5"
                color="textSecondary"
                className={classes.subHeading}
              >
                Target Functionality and Verification
              </Typography>
              <Divider />
              <Typography variant="body1" className={classes.paragraph}>
                Targets represent an endpoint or a webhook that is defined and
                controlled by you. This can be any RESTful service you want, but
                it must accept a <strong>POST</strong> request from Time
                Trigger.
              </Typography>
              <Typography variant="body1" className={classes.paragraph}>
                One important feature of a target is its verification. Time
                Trigger forces a validation of each Target every time a trigger
                runs in order to prevent abuse. When you define a Target through
                the UI you must select a verification method and it can be one
                of the following:
                <ul>
                  <li>Static File</li>
                  <li>DNS TXT</li>
                </ul>
              </Typography>
              <Typography variant="h6" className={classes.paragraph}>
                Static File Verification
              </Typography>
              <Typography variant="body1" className={classes.paragraph}>
                When you select static file verification Time Trigger will
                provide a unique identifier that you must place in a file at the
                root of your target. For example is you define a target as{" "}
                <strong>https://api.dev/v1/webhooks</strong> the unique file
                must be accessible at{" "}
                <strong>https://api.dev/timetrigger-verify.txt.</strong>
              </Typography>
              <Typography variant="h6" className={classes.paragraph}>
                DNS TXT Verification
              </Typography>
              <Typography variant="body1" className={classes.paragraph}>
                When you select DNS TXT verification Time Trigger will provide a
                unique identifier that you must place in a TXT record on your
                DNS provier. Setup depends on your registrar but you can verify
                it from the command line:
                <pre className={classes.code}>$ dig -t txt api.dev</pre>
                You should see the record somewhere in the output:
                <pre className={classes.code}>
                  ...
                  <br />
                  ;; ANSWER SECTION: api.dev. 299 IN TXT
                  <br />
                  api.dev. 299 IN TXT
                  &quot;timetrigger-verify=OWd3RU5msaba562mzBadUZzSTFJR0tl&quot;
                </pre>
              </Typography>
            </section>
            <section className={classes.section}>
              <Typography variant="h3" className={classes.heading}>
                Usage
              </Typography>
              <Typography
                variant="h5"
                color="textSecondary"
                className={classes.subHeading}
              >
                Time Trigger API
              </Typography>
              <Divider />
              <Typography variant="body1" className={classes.paragraph}>
                You can use Time Trigger to send data to your Targets by calling
                the API. We provide a simple REST endpoint which you can use to
                schedule triggers. You can use the Time Trigger UI to manually
                create Targets and schedule Triggers but in a real world case
                you&apos;d want to create Triggers programatically.
              </Typography>
              <Typography variant="h6" className={classes.paragraph}>
                Trigger API
              </Typography>
              <Typography variant="body1" className={classes.paragraph}>
                To call the API you need to get an API token and secret which
                are available on the Triggers screen by clicking the &qout;API
                Keys&qout; button. You can regenerate a new secret at any time
                but you can only get the current key once so keep it somewhere
                safe.
              </Typography>
              <Typography variant="body1" className={classes.paragraph}>
                To create a Trigger take the following example:
                <pre
                  className={classes.code}
                >{`$ curl --location --request POST 'https://timetrigger.dev/api/v1/trigger?api-key=<API_KEY>&api-secret=<SECRET_KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "trigger": "1 hour from now",
  "run": {
    "type": "api_callback",
    "target": "<TARGET_ID>",
    "payload": {
      "hello": "from Time Trigger"
    }
  }
}'
                `}</pre>
              </Typography>
              <Typography variant="body1" className={classes.paragraph}>
                The trigger endpoint takes two query params, api-key api-secret
                and a POST body containing the definition of the trigger. The
                body must have the following structure:
                <ul>
                  <li>
                    trigger - A string containing the time format for when the
                    trigger should run
                  </li>
                  <li>
                    run: An object to define the trigger:
                    <ul>
                      <li>
                        type - Currently only <em>api_callback</em> is supported
                      </li>
                      <li>
                        target - The ID of the target the trigger should call
                      </li>
                      <li>
                        payload - A custom JSON object containing the data you
                        want sent to the target
                      </li>
                    </ul>
                  </li>
                </ul>
              </Typography>
            </section>
            <section className={classes.section}>
              <Typography variant="h3" className={classes.heading}>
                API Reference
              </Typography>
              <Typography
                variant="h5"
                color="textSecondary"
                className={classes.subHeading}
              >
                Time Trigger API Endpoints
              </Typography>
              <Divider />
              <Typography variant="body1" className={classes.paragraph}>
                Currently Time Trigger only has a single endpoint but other will
                be added in the future as the service&apos; needs grow.
              </Typography>
              <Typography variant="h6" className={classes.paragraph}>
                POST /api/v1/trigger
              </Typography>
              <Typography variant="body1" className={classes.paragraph}>
                <strong>Query Params</strong>
                <ul>
                  <li>api-key - Your account API key</li>
                  <li>api-secret - Your account API secret</li>
                </ul>
                <strong>POST body</strong>
                <ul>
                  <li>trigger - String, time when the trigger should run</li>
                  <li>
                    run: Object
                    <ul>
                      <li>type - Enum (api_callback)</li>
                      <li>target - String, ID of the Target</li>
                      <li>
                        payload - Object, Custom JSON payload for the trigger
                      </li>
                    </ul>
                  </li>
                </ul>
              </Typography>
            </section>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

Docs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect((state) => {
  return { auth: state.auth };
})(withStyles(styles)(Docs));
