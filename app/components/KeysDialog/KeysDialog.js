import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import copy from "clipboard-copy";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FileCopy from "@material-ui/icons/FileCopy";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import withMobileDialog from "@material-ui/core/withMobileDialog";

import { fetchAPIKey, generateCredentails } from "../../services/credentials";
import { toggleKeysDialog } from "../../state/actions";

const styles = theme => ({
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  formControl: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing()
  },
  text: {
    marginBottom: theme.spacing(2)
  },
  wrapper: {
    margin: theme.spacing(),
    position: "relative"
  }
});

const KeysDialog = ({
  classes,
  auth,
  fullScreen,
  keysDialogOpen,
  toggleDialog
}) => {
  const [apiKey, updateAPIKey] = useState("");
  const [secretKey, updateSecretKey] = useState("");
  const [loading, updateLoading] = useState(false);

  useEffect(() => {
    fetchAPIKey().then(credentials => {
      updateAPIKey(credentials.apiKey);
    });
  }, []);

  const handleClose = () => {
    toggleDialog(!keysDialogOpen);
  };

  const generateKeyPair = () => {
    updateLoading(true);
    generateCredentails()
      .then(data => {
        updateAPIKey(data.key);
        updateSecretKey(data.secret);
        updateLoading(false);
      })
      .catch(error => {
        console.error(error);
        updateLoading(false);
      });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={keysDialogOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">API Keys</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.text}>
          Generate or regenerate your API key pair for programmatic access to
          the TimeTrigger API.
        </DialogContentText>
        <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel htmlFor="adornment-key">API Key</InputLabel>
            <Input
              id="adornment-key"
              type="text"
              value={apiKey}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      copy(apiKey);
                    }}
                  >
                    <FileCopy />
                  </IconButton>
                </InputAdornment>
              }
              readOnly
            />
          </FormControl>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel htmlFor="adornment-secret">Secret</InputLabel>
            <Input
              id="adornment-secret"
              type="text"
              value={secretKey}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      copy(secretKey);
                    }}
                  >
                    <FileCopy />
                  </IconButton>
                </InputAdornment>
              }
              readOnly
            />
            <FormHelperText>
              Your secret key is only shown when this key pair is generated for
              the first time.
            </FormHelperText>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Done
        </Button>
        <div className={classes.wrapper}>
          <Button onClick={generateKeyPair} color="primary" disabled={loading}>
            {apiKey && apiKey.length ? "Regenerate" : "Generate"}
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default compose(
  connect(
    state => {
      return {
        auth: state.auth,
        keysDialogOpen: state.ui.keysDialogOpen
      };
    },
    dispatch => {
      return {
        toggleDialog(toggle) {
          dispatch(toggleKeysDialog(toggle));
        }
      };
    }
  ),
  withStyles(styles),
  withMobileDialog({ breakpoint: "xs" })
)(KeysDialog);
