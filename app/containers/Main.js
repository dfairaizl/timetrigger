import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Mark from '../assets/images/Mark.svg';

import MaterialTable from 'material-table';

import Nav from '../components/Nav/Nav';
import TriggerDialog from '../components/TriggerDialog/TriggerDialog';
import KeysDialog from '../components/KeysDialog/KeysDialog';

import { toggleTriggerDialog, toggleKeysDialog } from '../state/actions';

const styles = theme => ({
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.unit * 2,
    width: '100%'
  },
  footer: {
    backgroundColor: theme.palette.secondary.main
  },
  layout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    flex: '1',
    padding: '20px 80px'
  }
});

function Main (props) {
  const {
    classes,
    currentState,
    ui,
    onTriggerDialogClick,
    onKeysDialogClick
  } = props;

  return (
    <div>
      <CssBaseline />
      <div className={classes.layout}>
        <Nav />
        <main className={classes.main}>
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
          <MaterialTable
            columns={[
              { title: 'Trigger Time', field: 'trigger_at', defaultSort: 'desc', render: (data) => <p>{data.trigger_at.toDate().toString()}</p> },
              { title: 'Job Types', field: 'surname', render: (data) => <p>{data.run.map(j => j.type).join(', ')}</p> },
              { title: 'Status', field: 'status' }
            ]}
            data={currentState}
            title='Time Jobs'
            options={{
              emptyRowsWhenPaging: false,
              pageSize: 25
            }}
          />
          <TriggerDialog />
          <KeysDialog />
        </main>
        <AppBar position='static' color='secondary' className={classes.footer}>
          <Toolbar>
            <div className={classes.container}>
              <div>
                <Typography variant='body1' color='inherit' noWrap>
                  Made with ❤️ in New York City
                </Typography>
                <Typography variant='caption' color='inherit' noWrap>
                  Copyright © 2019 Time Trigger
                </Typography>
              </div>
              <Mark className={classes.mark} />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}

Main.propTypes = {
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
})(withStyles(styles)(Main));
