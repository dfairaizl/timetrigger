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

import { toggleTargetDialog } from '../../state/actions';
import db from '../../services/db';

const styles = theme => ({
  formControl: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit
  }
});

const TargetDialog = ({ classes, auth, targetDialogOpen, toggleDialog }) => {
  const { user } = auth;

  const [currentState, updater] = useReducer((state, action) => {
    switch (action.type) {
      case 'UPDATE_NAME':
        return { ...state, targetName: action.value };
      case 'UPDATE_ENDPOINT':
        return { ...state, endpoint: action.value };
      case 'UPDATE_VERIFICATION_METHOD':
        return { ...state, verificationMethod: action.value };
      default:
        return state;
    }
  }, { targetName: '', endpoint: '', verificationMethod: 'static_file' });

  const handleClose = () => {
    toggleDialog(!targetDialogOpen);
  };

  const saveTarget = () => {
    const ref = db.collection(`users/${user.uid}/targets`);
    ref.add(currentState).then((doc) => {
      handleClose();
    }).catch((e) => console.error(e));
  };

  return (
    <Dialog
      open={targetDialogOpen}
      onClose={handleClose}
    >
      <DialogTitle id='form-dialog-title'>New Target</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create a new target to execute time triggers against.
        </DialogContentText>
        <form className={classes.root} autoComplete='off'>
          <FormControl className={classes.formControl} fullWidth>
            <TextField
              autoFocus
              fullWidth
              id='time'
              label='Target Name'
              margin='dense'
              onChange={(e) => updater({ type: 'UPDATE_NAME', value: e.target.value })}
              value={currentState.targetName}
            />
          </FormControl>
          <FormControl className={classes.formControl} fullWidth>
            <TextField
              fullWidth
              id='time'
              label='API Endpoint'
              margin='dense'
              onChange={(e) => updater({ type: 'UPDATE_ENDPOINT', value: e.target.value })}
              value={currentState.endpoint}
            />
            <FormHelperText>Example https://myapi.io/v1/webhooks</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel>Verification Method</InputLabel>
            <Select
              onChange={(e) => updater({ type: 'UPDATE_VERIFICATION_METHOD', value: e.target.value })}
              value={currentState.verificationMethod}
              inputProps={{
                name: 'stage',
                id: 'stage'
              }}
            >
              <MenuItem value={'static_file'}>Static File</MenuItem>
              <MenuItem value={'dns_txt'}>DNS TXT Record</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={saveTarget} color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default connect((state) => {
  return {
    auth: state.auth,
    targetDialogOpen: state.ui.targetDialogOpen
  };
}, (dispatch) => {
  return {
    toggleDialog (toggle) {
      dispatch(toggleTargetDialog(toggle));
    }
  };
})(withStyles(styles)(TargetDialog));
