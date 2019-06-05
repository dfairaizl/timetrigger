import React from 'react';

import dateformat from 'dateformat';

import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';

import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = (theme) => ({
  '@keyframes addFade': {
    '0%': {
      backgroundColor: green[100]
    },
    '100%': {
      backgroundColor: 'white'
    }
  },
  '@keyframes updateFade': {
    '0%': {
      backgroundColor: orange[100]
    },
    '100%': {
      backgroundColor: 'white'
    }
  },
  '@keyframes deleteFade': {
    '0%': {
      backgroundColor: red[100]
    },
    '100%': {
      backgroundColor: 'white'
    }
  },
  animationDelete: {
    animation: '$deleteFade 2s'
  },
  animationInsert: {
    animation: '$addFade 2s'
  },
  animationUpdate: {
    animation: '$updateFade 2s'
  },
  cellData: {
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1)
  },
  jobFailure: {
    color: red[400]
  },
  jobScheduled: {
    color: blue[400]
  },
  jobSuccess: {
    color: green[400],
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  }
});

class TriggerTableRow extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = { enabledAnimations: false };
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.enabledAnimations === prevState.enabledAnimations) {
      this.setState(() => ({ enabledAnimations: true }));

      this.timer = setTimeout(() => {
        this.setState(() => ({ enabledAnimations: false }), () => {
          clearTimeout(this.timer);
        });
      }, 2000);
    }
  }

  render () {
    const { data, classes } = this.props;

    let animationClass = '';
    if (this.state.enabledAnimations) {
      switch (data.display) {
        case 'added':
          animationClass = classes.animationInsert;
          break;
        case 'modified':
          animationClass = classes.animationUpdate;
          break;
        case 'deleted':
          animationClass = classes.animationDelete;
          break;
      }
    }

    const formatTriggerDate = (data) => {
      const triggerDate = dateformat(data.trigger_at.toDate(), 'mm/dd/yyyy hh:MM:ss TT');
      return (
        <p>{triggerDate}</p>
      );
    };

    const formatType = (data) => {
      switch (data.run.type) {
        case 'api_callback':
          return <p>API Callback</p>;
      }

      return null;
    };

    const formatStatus = (data) => {
      if (data.status === 'complete') {
        return <p className={classes.jobSuccess}>Complete</p>;
      } else if (data.status === 'failed') {
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
        <TableCell className={classes.cellData} align='center'>{formatType(data)}</TableCell>
        <TableCell className={classes.cellData} align='center'>{formatStatus(data)}</TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(TriggerTableRow);
