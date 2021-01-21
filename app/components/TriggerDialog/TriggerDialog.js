import React, { useReducer } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import withMobileDialog from "@material-ui/core/withMobileDialog";

import { toggleTriggerDialog } from "../../state/actions";
import { createTrigger } from "../../services/triggers";

import Editor from "../Editor/Editor";

const styles = (theme) => ({
  editor: {
    width: "100%",
    height: "200px",
  },
  formControl: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(),
  },
  section: {
    marginBottom: theme.spacing(),
    marginTop: theme.spacing(),
  },
});

const TriggerDialog = (props) => {
  const {
    classes,
    activeTargets,
    fullScreen,
    triggerDialogOpen,
    onTriggerDialogClick,
  } = props;

  const [currentState, updater] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "UPDATE_TRIGGER_TIME":
          return { ...state, triggerTime: action.value };
        case "UPDATE_TARGET":
          return { ...state, target: action.value };
        case "UPDATE_PAYLOAD":
          return { ...state, payload: action.value };
        default:
          return state;
      }
    },
    {
      triggerTime: "",
      target: "",
      payload: {},
    }
  );

  const [currentErrors, setErrors] = useReducer((state, errors) => {
    return errors.reduce((s, error) => {
      s[error.param] = error.msg;

      return s;
    }, {});
  }, {});

  const onSaveClick = () => {
    const triggerData = {
      trigger: currentState.triggerTime,
      run: {
        type: "api_callback",
        target: currentState.target,
        payload: currentState.payload,
      },
    };

    createTrigger(triggerData).then((json) => {
      if (json.errors) {
        setErrors(json.errors);
        return;
      }

      onTriggerDialogClick(!triggerDialogOpen);
    });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={triggerDialogOpen}
      onClose={() => onTriggerDialogClick(!triggerDialogOpen)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">New Trigger</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a new trigger, enter a time for the trigger to fire,
          selected a stage, and optionally add a JSON payload.
        </DialogContentText>
        <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl} fullWidth>
            <TextField
              autoFocus
              fullWidth
              error={currentErrors.trigger}
              helperText={
                currentErrors.trigger
                  ? currentErrors.trigger
                  : 'Human readable dates are best. For example: "24 hours from now".'
              }
              id="time"
              label="Trigger Time"
              margin="dense"
              onChange={(e) =>
                updater({ type: "UPDATE_TRIGGER_TIME", value: e.target.value })
              }
              value={currentState.triggerTime}
            />
          </FormControl>
          <FormControl
            className={classes.formControl}
            error={currentErrors["run.target"]}
            fullWidth
          >
            <InputLabel>Target</InputLabel>
            <Select
              onChange={(e) =>
                updater({ type: "UPDATE_TARGET", value: e.target.value })
              }
              value={currentState.target}
              inputProps={{
                id: "selected-target",
                name: "selected target",
              }}
            >
              {activeTargets.map((t, i) => {
                return (
                  <MenuItem
                    key={i}
                    value={t.id}
                  >{`${t.targetName} - ${t.endpoint}`}</MenuItem>
                );
              })}
            </Select>
            <FormHelperText>
              {currentErrors["run.target"] ? currentErrors["run.target"] : null}
            </FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl} fullWidth>
            <Typography variant="h6" className={classes.section}>
              JSON Payload
            </Typography>
          </FormControl>
          <Editor
            className={classes.editor}
            onChange={(json) =>
              updater({ type: "UPDATE_PAYLOAD", value: json })
            }
          />
          <FormHelperText error={currentErrors["run.payload"]}>
            {currentErrors["run.payload"]
              ? currentErrors["run.payload"]
              : "JSON payload you want to deliver to your API"}
          </FormHelperText>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onTriggerDialogClick(!triggerDialogOpen)}
          color="secondary"
        >
          Cancel
        </Button>
        <Button variant="outlined" onClick={onSaveClick} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

TriggerDialog.propTypes = {
  classes: PropTypes.object,
  activeTargets: PropTypes.arrayOf(PropTypes.object),
  fullScreen: PropTypes.bool,
  triggerDialogOpen: PropTypes.bool,
  onTriggerDialogClick: PropTypes.func,
};

export default compose(
  connect(
    (state) => {
      return {
        triggerDialogOpen: state.ui.triggerDialogOpen,
        activeTargets: state.targets.filter((t) => t.active),
      };
    },
    (dispatch) => {
      return {
        onTriggerDialogClick(toggle) {
          dispatch(toggleTriggerDialog(toggle));
        },
      };
    }
  ),
  withStyles(styles),
  withMobileDialog({ breakpoint: "xs" })
)(TriggerDialog);
