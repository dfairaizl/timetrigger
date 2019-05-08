import React from 'react';
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

import { toggleTriggerDialog } from '../../state/actions';

const styles = theme => ({
  formControl: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit
  }
});

const TriggerDialog = ({ classes, activeTargets, triggerDialogOpen, onTriggerDialogClick }) => {
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
              margin='dense'
              id='time'
              label='Trigger Time'
              fullWidth
            />
            <FormHelperText>Human readable dates are best. For example: "24 hours from now".</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel>Target</InputLabel>
            <Select
              onChange={() => {}}
              inputProps={activeTargets.map((t) => ({
                name: t.targetName,
                id: t.id
              }))}
            >
              {activeTargets.map((t) => <MenuItem value={t.id}>{`${t.targetName} - ${t.endpoint}`}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl} fullWidth>
            <TextField
              margin='dense'
              id='trigger-payload'
              label='JSON Payload'
              fullWidth
              multiline
              rows={10}
              maxRows={20}
            />
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onTriggerDialogClick(!triggerDialogOpen)} color='primary'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default connect((state) => {
  return {
    triggerDialogOpen: state.ui.triggerDialogOpen,
    activeTargets: state.targets.filter((t) => !t.active)
  };
}, (dispatch) => {
  return {
    onTriggerDialogClick (toggle) {
      dispatch(toggleTriggerDialog(toggle));
    }
  };
})(withStyles(styles)(TriggerDialog));
