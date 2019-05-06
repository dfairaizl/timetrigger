import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import TargetCard from '../components/TargetCard/TargetCard';

import TargetDialog from '../components/TargetDialog/TargetDialog';

import { toggleTargetDialog } from '../state/actions';

const styles = theme => ({
  button: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  }
});

function Targets ({ classes, targets, ui, toggleDialog }) {
  return (
    <div>
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Button
            variant='outlined'
            color='primary'
            className={classes.button}
            onClick={() => toggleDialog(!ui.targetDialogOpen)}>
            New Stage
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.root} spacing={16}>
        {targets.map((t) => {
          return (
            <Grid item xs={4} key={t.id}>
              <TargetCard target={t} />
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
    toggleDialog (toggle) {
      dispatch(toggleTargetDialog(toggle));
    }
  };
})(withStyles(styles)(Targets));
