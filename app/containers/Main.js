import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';

import MaterialTable from 'material-table';

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

  const formatTriggerDate = (data) => {
    const triggerDate = dateformat(data.trigger_at.toDate(), 'mm/dd/yyyy hh:ssTT');
    return (
      <p>{triggerDate}</p>
    );
  };

  const formatType = (data) => {
    const types = data.run.map((r) => {
      switch (r.type) {
        case 'api_callback':
          return 'API Callback';
      }
    });

    return (
      <p>{types.join(', ')}</p>
    );
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
    <Layout>
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
          { title: 'Trigger Time', defaultSort: 'desc', render: formatTriggerDate },
          { title: 'Job Type', render: formatType },
          { title: 'Status', render: formatStatus }
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
    </Layout>
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
