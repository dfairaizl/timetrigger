import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Container from "@material-ui/core/Container";

import Layout from "../Layout";
import TriggerDialog from "../components/TriggerDialog/TriggerDialog";
import KeysDialog from "../components/KeysDialog/KeysDialog";
import TriggerTable from "../components/TriggerTable/TriggerTable";

import { toggleTriggerDialog, toggleKeysDialog } from "../state/actions";

const styles = (theme) => ({
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  heading: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
});

function Triggers(props) {
  const {
    classes,
    currentState,
    ui,
    onTriggerDialogClick,
    onKeysDialogClick,
  } = props;

  return (
    <Layout>
      <Container>
        <div className={classes.buttonGroup}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={() => onTriggerDialogClick(!ui.triggerDialogOpen)}
          >
            New Trigger
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.button}
            onClick={() => onKeysDialogClick(!ui.keysDialogOpen)}
          >
            API Keys
          </Button>
        </div>
        <TriggerTable data={currentState} sortField="trigger_at" />
        <TriggerDialog />
        <KeysDialog />
      </Container>
    </Layout>
  );
}

Triggers.propTypes = {
  classes: PropTypes.object.isRequired,
  currentState: PropTypes.array.isRequired,
  ui: PropTypes.object,
  onTriggerDialogClick: PropTypes.func,
  onKeysDialogClick: PropTypes.func,
};

export default connect(
  (state) => {
    return { currentState: state.timeJobs, ui: state.ui };
  },
  (dispatch) => {
    return {
      onTriggerDialogClick(toggle) {
        dispatch(toggleTriggerDialog(toggle));
      },
      onKeysDialogClick(toggle) {
        dispatch(toggleKeysDialog(toggle));
      },
    };
  }
)(withStyles(styles)(Triggers));
