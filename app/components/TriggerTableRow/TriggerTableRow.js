import React from "react";
import PropTypes from "prop-types";

import dateformat from "dateformat";

import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import orange from "@material-ui/core/colors/orange";
import red from "@material-ui/core/colors/red";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const styles = (theme) => ({
  "@keyframes addFade": {
    "0%": {
      backgroundColor: green[100],
    },
    "100%": {
      backgroundColor: "white",
    },
  },
  "@keyframes updateFade": {
    "0%": {
      backgroundColor: orange[100],
    },
    "100%": {
      backgroundColor: "white",
    },
  },
  "@keyframes deleteFade": {
    "0%": {
      backgroundColor: red[100],
    },
    "100%": {
      backgroundColor: "white",
    },
  },
  animationDelete: {
    animation: "$deleteFade 2s",
  },
  animationInsert: {
    animation: "$addFade 2s",
  },
  animationUpdate: {
    animation: "$updateFade 2s",
  },
  cellContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  cellData: {
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  jobFailure: {
    color: red[400],
  },
  jobScheduled: {
    color: blue[400],
  },
  jobSuccess: {
    color: green[400],
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
});

const DataRow = ({ animationClass, classes, data }) => {
  const formatTriggerDate = (data) => {
    const triggerDate = dateformat(
      data.trigger_at.toDate(),
      "mm/dd/yyyy hh:MM:ss TT"
    );
    return <p>{triggerDate}</p>;
  };

  const formatType = (data) => {
    switch (data.run.type) {
      case "api_callback":
        return <p>API Callback</p>;
    }

    return null;
  };

  const formatStatus = (data) => {
    if (data.status === "complete") {
      return <p className={classes.jobSuccess}>Complete</p>;
    } else if (data.status === "failed") {
      return <p className={classes.jobFailure}>Failed</p>;
    } else {
      return <p className={classes.jobScheduled}>Scheduled</p>;
    }
  };

  return (
    <TableRow className={animationClass}>
      <TableCell className={classes.cellData}>
        {formatTriggerDate(data)}
      </TableCell>
      <TableCell className={classes.cellData} align="center">
        {formatType(data)}
      </TableCell>
      <TableCell className={classes.cellData} align="center">
        {formatStatus(data)}
      </TableCell>
    </TableRow>
  );
};

DataRow.propTypes = {
  animationClass: PropTypes.string,
  classes: PropTypes.object,
  data: PropTypes.object,
};

const DataCell = ({ animationClass, classes, data }) => {
  const formatTriggerDate = (data) => {
    const triggerDate = dateformat(
      data.trigger_at.toDate(),
      "mm/dd/yyyy hh:MM:ss TT"
    );
    return <span style={{ fontSize: "12px" }}>{triggerDate}</span>;
  };

  const formatType = (data) => {
    switch (data.run.type) {
      case "api_callback":
        return (
          <span style={{ fontSize: "12px", color: "#AAA" }}>API Callback</span>
        );
    }

    return null;
  };

  const formatStatus = (data) => {
    const styles = {
      marginTop: 0,
      marginBottom: 0,
    };

    if (data.status === "complete") {
      return (
        <strong className={classes.jobSuccess} style={styles}>
          Complete
        </strong>
      );
    } else if (data.status === "failed") {
      return (
        <strong className={classes.jobFailure} style={styles}>
          Failed
        </strong>
      );
    } else {
      return (
        <strong className={classes.jobScheduled} style={styles}>
          Scheduled
        </strong>
      );
    }
  };

  return (
    <TableRow className={animationClass}>
      <TableCell className={classes.cellData}>
        <Grid container className={classes.root} spacing={4}>
          <Grid item xs={8} className={classes.cellContent}>
            {formatStatus(data)}
            <p style={{ marginTop: 0, marginBottom: 0 }}>
              {formatTriggerDate(data)}
            </p>
          </Grid>
          <Grid item xs={4} className={classes.cellContent}>
            <p>{formatType(data)}</p>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
};

DataCell.propTypes = {
  animationClass: PropTypes.string,
  classes: PropTypes.object,
  data: PropTypes.object,
};

class TriggerTableRow extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { enabledAnimations: false };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.enabledAnimations === prevState.enabledAnimations) {
      this.setState(() => ({ enabledAnimations: true }));

      this.timer = setTimeout(() => {
        this.setState(
          () => ({ enabledAnimations: false }),
          () => {
            clearTimeout(this.timer);
          }
        );
      }, 2000);
    }
  }

  render() {
    const { data, classes } = this.props;

    let animationClass = "";
    if (this.state.enabledAnimations) {
      switch (data.display) {
        case "added":
          animationClass = classes.animationInsert;
          break;
        case "modified":
          animationClass = classes.animationUpdate;
          break;
        case "deleted":
          animationClass = classes.animationDelete;
          break;
      }
    }

    if (this.props.isMobile) {
      return <DataCell animationClass={animationClass} {...this.props} />;
    }

    return <DataRow animationClass={animationClass} {...this.props} />;
  }
}

TriggerTableRow.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  isMobile: PropTypes.bool,
};

export default withStyles(styles)(TriggerTableRow);
