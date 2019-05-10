import React, { useReducer } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { toggleTriggerDialog } from '../../state/actions';
import { createTrigger } from '../../services/triggers';

import Editor from '../Editor/Editor';

const styles = theme => ({
  editor: {
    width: '100%',
    height: '200px'
  },
  formControl: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit
  },
  section: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit
  }
});

const TriggerDialog = (props) => {
  const { classes, activeTargets, triggerDialogOpen, onTriggerDialogClick } = props;

  const [currentState, updater] = useReducer((state, action) => {
    switch (action.type) {
      case 'UPDATE_TRIGGER_TIME':
        return { ...state, triggerTime: action.value };
      case 'UPDATE_TARGET':
        return { ...state, target: action.value };
      case 'UPDATE_PAYLOAD':
        return { ...state, payload: action.value };
      default:
        return state;
    }
  }, {
    triggerTime: '',
    target: '',
    payload: {}
  });

  const onSaveClick = () => {
    const triggerData = {
      trigger: currentState.triggerTime,
      run: [{
        type: 'api_callback',
        target: currentState.target,
        payload: currentState.payload
      }]
    };

    createTrigger(triggerData).then((data) => {
      debugger;
      onTriggerDialogClick(!triggerDialogOpen);
    });
  };

  return (
    <Dialog
      open={triggerDialogOpen}
      onClose={() => onTriggerDialogClick(!triggerDialogOpen)}
    >
      <DialogTitle id='form-dialog-title'>New Trigger</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a new trigger, enter a time for the trigger to fire, selected a stage, and optionally add a JSON payload.
        </DialogContentText>
        <form className={classes.root} autoComplete='off'>
          <FormControl className={classes.formControl} fullWidth>
            <TextField
              autoFocus
              fullWidth
              id='time'
              label='Trigger Time'
              margin='dense'
              onChange={(e) => updater({ type: 'UPDATE_TRIGGER_TIME', value: e.target.value })}
              value={currentState.triggerTime}
            />
            <FormHelperText>Human readable dates are best. For example: "24 hours from now".</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel>Target</InputLabel>
            <Select
              onChange={(e) => updater({ type: 'UPDATE_TARGET', value: e.target.value })}
              value={currentState.target}
              inputProps={{
                id: 'selected-target',
                name: 'selected target'
              }}
            >
              {activeTargets.map((t, i) => {
                console.log(t);
                return <MenuItem key={i} value={t.id}>{`${t.targetName} - ${t.endpoint}`}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl} fullWidth>
            <Typography variant='h6' className={classes.section}>JSON Payload</Typography>
          </FormControl>
          <Editor className={classes.editor} onChange={(json) => updater({ type: 'UPDATE_PAYLOAD', value: json })} />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onTriggerDialogClick(!triggerDialogOpen)} color='secondary'>
          Cancel
        </Button>
        <Button variant='outlined' onClick={onSaveClick} color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default connect((state) => {
  return {
    triggerDialogOpen: state.ui.triggerDialogOpen,
    activeTargets: state.targets.filter((t) => t.active)
  };
}, (dispatch) => {
  return {
    onTriggerDialogClick (toggle) {
      dispatch(toggleTriggerDialog(toggle));
    }
  };
})(withStyles(styles)(TriggerDialog));
