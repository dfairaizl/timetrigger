import React, { useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import firebase from "firebase/app";

import fetch from "cross-fetch";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import withMobileDialog from "@material-ui/core/withMobileDialog";

import VerificationCard from "../VerificationCard/VerificationCard";

import {
  toggleNewTargetDialog,
  toggleEditTargetDialog,
} from "../../state/actions";
import { getIDToken } from "../../services/auth";
import db from "../../services/db";

const styles = (theme) => ({
  formControl: {
    marginBottom: theme.spacing(),
    marginTop: theme.spacing(),
  },
  section: {
    marginTop: theme.spacing(2),
  },
});

const TargetDialog = (props) => {
  const {
    classes,
    auth,
    fullScreen,
    targetDialogOpen,
    selectedTarget,
    toggleNewDialog,
    toggleEditDialog,
  } = props;

  const { user } = auth;
  const mode = selectedTarget ? "edit" : "new";

  const [currentState, updater] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "UPDATE_NAME":
          return { ...state, targetName: action.value };
        case "UPDATE_ENDPOINT":
          return { ...state, endpoint: action.value };
        case "UPDATE_VERIFICATION_METHOD":
          return { ...state, verificationMethod: action.value };
        case "UPDATE_VERIFICATION_CODE":
          return { ...state, verificationCode: action.value };
        default:
          return state;
      }
    },
    {
      targetName: "",
      endpoint: "",
      verificationMethod: "static_file",
      verificationCode: "",
    }
  );

  useEffect(() => {
    if (mode === "edit") {
      updater({ type: "UPDATE_NAME", value: selectedTarget.targetName });
      updater({ type: "UPDATE_ENDPOINT", value: selectedTarget.endpoint });
      updater({
        type: "UPDATE_VERIFICATION_CODE",
        value: selectedTarget.verificationCode,
      });
      updater({
        type: "UPDATE_VERIFICATION_METHOD",
        value: selectedTarget.verificationMethod,
      });
    } else {
      updater({ type: "UPDATE_NAME", value: "" });
      updater({ type: "UPDATE_ENDPOINT", value: "" });
      updater({ type: "UPDATE_VERIFICATION_METHOD", value: "" });
    }
  }, [mode]);

  useEffect(() => {
    if (mode !== "edit") {
      getIDToken().then((token) => {
        return fetch(`${process.env.API_HOST}/api/v1/target/code`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((data) => {
            updater({
              type: "UPDATE_VERIFICATION_CODE",
              value: data.verfication_code,
            });
          })
          .catch((e) => {
            console.error(e);
          });
      });
    }
  }, [mode]);

  const handleClose = () => {
    if (mode === "edit") {
      toggleEditDialog(!targetDialogOpen, null);
    } else {
      toggleNewDialog(!targetDialogOpen);
    }
  };

  const saveTarget = () => {
    if (mode === "edit") {
      const ref = db().doc(`users/${user.uid}/targets/${selectedTarget.id}`);
      ref
        .set(currentState, { merge: true })
        .then(() => {
          handleClose();
        })
        .catch((e) => console.error(e));
    } else {
      const ref = db().collection(`users/${user.uid}/targets`);
      ref
        .add({
          ...currentState,
          active: false,
          verified: false,
          created_at: firebase.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          handleClose();
        })
        .catch((e) => console.error(e));
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={targetDialogOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">
        {mode === "new" ? "New Target" : "Edit Target"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create a new target to execute time triggers against.
        </DialogContentText>
        <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl} fullWidth>
            <TextField
              autoFocus
              fullWidth
              id="time"
              label="Target Name"
              margin="dense"
              onChange={(e) =>
                updater({ type: "UPDATE_NAME", value: e.target.value })
              }
              value={currentState.targetName}
            />
          </FormControl>
          <FormControl className={classes.formControl} fullWidth>
            <TextField
              fullWidth
              id="time"
              label="API Endpoint"
              margin="dense"
              onChange={(e) =>
                updater({ type: "UPDATE_ENDPOINT", value: e.target.value })
              }
              value={currentState.endpoint}
            />
            <FormHelperText>
              Example https://myapi.io/v1/webhooks
            </FormHelperText>
          </FormControl>
          <Typography variant="h6" className={classes.section}>
            Verification Method
          </Typography>
          <FormControl className={classes.formControl} fullWidth>
            <Select
              onChange={(e) =>
                updater({
                  type: "UPDATE_VERIFICATION_METHOD",
                  value: e.target.value,
                })
              }
              value={currentState.verificationMethod}
              inputProps={{
                name: "target verification method",
                id: "target-verification",
              }}
            >
              <MenuItem value={"static_file"}>Static File</MenuItem>
              <MenuItem value={"dns_txt"}>DNS TXT Record</MenuItem>
            </Select>
          </FormControl>
          <VerificationCard
            method={currentState.verificationMethod}
            verificationCode={currentState.verificationCode}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={saveTarget} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

TargetDialog.propTypes = {
  classes: PropTypes.object,
  auth: PropTypes.shape({
    user: PropTypes.object,
  }),
  fullScreen: PropTypes.bool,
  targetDialogOpen: PropTypes.bool,
  selectedTarget: PropTypes.object,
  toggleNewDialog: PropTypes.func,
  toggleEditDialog: PropTypes.func,
};

export default compose(
  connect(
    (state) => {
      return {
        auth: state.auth,
        targetDialogOpen: state.ui.targetDialogOpen,
        selectedTarget: state.ui.selectedTarget,
      };
    },
    (dispatch) => {
      return {
        toggleNewDialog(toggle) {
          dispatch(toggleNewTargetDialog(toggle));
        },
        toggleEditDialog(toggle) {
          dispatch(toggleEditTargetDialog(toggle, null));
        },
      };
    }
  ),
  withStyles(styles),
  withMobileDialog({ breakpoint: "xs" })
)(TargetDialog);
