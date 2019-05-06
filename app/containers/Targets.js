import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import TargetCard from '../components/TargetCard/TargetCard';

import TargetDialog from '../components/TargetDialog/TargetDialog';

import {
  toggleNewTargetDialog,
  toggleEditTargetDialog
} from '../state/actions';

const styles = theme => ({
  button: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  }
});

function Targets ({ classes, targets, ui, newTarget, editTarget }) {
  return (
    <div>
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Button
            variant='outlined'
            color='primary'
            className={classes.button}
            onClick={() => newTarget(!ui.targetDialogOpen)}>
            New Stage
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.root} spacing={16}>
        {targets.map((t) => {
          return (
            <Grid item xs={4} key={t.id}>
              <TargetCard
                target={t}
                editCard={(target) => { editTarget(!ui.targetDialogOpen, target); }}
                deleteCard={(target) => { toggleEditTargetDialog(!ui.targetDialogOpen, target); }}
              />
            </Grid>
          );
        })}
      </Grid>
      <TargetDialog />
    </div>
  );
}

Targets.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect((state) => {
  return { targets: state.targets, ui: state.ui };
}, (dispatch) => {
  return {
    newTarget (toggle) {
      dispatch(toggleNewTargetDialog(toggle));
    },
    editTarget (toggle, target) {
      dispatch(toggleEditTargetDialog(toggle, target));
    }
  };
})(withStyles(styles)(Targets));
