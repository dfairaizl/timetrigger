import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import MaterialTable from 'material-table';

import Container from '../Container';
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
    </Container>
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
