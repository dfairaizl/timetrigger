import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// import MaterialTable from 'material-table';

import dateformat from 'dateformat';

import Layout from '../Layout';
import TriggerDialog from '../components/TriggerDialog/TriggerDialog';
import KeysDialog from '../components/KeysDialog/KeysDialog';

import { toggleTriggerDialog, toggleKeysDialog } from '../state/actions';

const styles = theme => ({
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  jobSuccess: {
    color: green[400]
  },
  jobScheduled: {
    color: blue[400]
  },
  jobFailure: {
    color: red[400]
  },
  heading: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
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
  'addAnimation': {
    animation: '$addFade 2s'
  },
  'updateAnimation': {
    animation: '$updateFade 2s'
  },
  'deleteAnimation': {
    animation: '$deleteFade 2s'
  }
});

class Row extends React.PureComponent {
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
          animationClass = classes.addAnimation;
          break;
        case 'modified':
          animationClass = classes.updateAnimation;
          break;
        case 'deleted':
          animationClass = classes.deleteAnimation;
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

    console.log('Using classname', this.state.enabledAnimations, animationClass);
    return (
      <TableRow className={animationClass}>
        <TableCell component='th' scope='data'>
          {formatTriggerDate(data)}
        </TableCell>
        <TableCell align='center'>{formatType(data)}</TableCell>
        <TableCell align='center'>{formatStatus(data)}</TableCell>
      </TableRow>
    );
  }
}

const StyledRow = withStyles(styles)(Row);

function Triggers (props) {
  const {
    classes,
    currentState,
    ui,
    onTriggerDialogClick,
    onKeysDialogClick
  } = props;

  return (
    <Layout>
      <Container>
        <div className={classes.buttonGroup}>
          <Button
            variant='outlined'
            color='primary'
            className={classes.button}
            onClick={() => onTriggerDialogClick(!ui.triggerDialogOpen)}>
            New Trigger
          </Button>
          <Button
            variant='outlined'
            color='secondary'
            className={classes.button}
            onClick={() => onKeysDialogClick(!ui.keysDialogOpen)}
          >
            API Keys
          </Button>
        </div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Trigger Time</TableCell>
                <TableCell align='center'>Job Type</TableCell>
                <TableCell align='center'>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentState.map(row => (
                <StyledRow key={row.id} data={row} />
              ))}
            </TableBody>
          </Table>
        </Paper>
        <TriggerDialog />
        <KeysDialog />
      </Container>
    </Layout>
  );
}

Triggers.propTypes = {
  classes: PropTypes.object.isRequired,
  currentState: PropTypes.array.isRequired
};

export default connect((state) => {
  return { currentState: state.timeJobs, ui: state.ui };
}, (dispatch) => {
  return {
    onTriggerDialogClick (toggle) {
      dispatch(toggleTriggerDialog(toggle));
    },
    onKeysDialogClick (toggle) {
      dispatch(toggleKeysDialog(toggle));
    }
  };
})(withStyles(styles)(Triggers));
