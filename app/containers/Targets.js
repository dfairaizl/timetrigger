import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fetch from 'cross-fetch';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Layout from '../Layout';
import TargetCard from '../components/TargetCard/TargetCard';
import TargetDialog from '../components/TargetDialog/TargetDialog';
import { getIDToken } from '../services/auth';
import db from '../services/db';

import {
  toggleNewTargetDialog,
  toggleEditTargetDialog
} from '../state/actions';

const styles = theme => ({
  button: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  }
});

function Targets ({ classes, auth, targets, ui, newTarget, editTarget }) {
  const { user } = auth;
  const deleteTarget = (target) => {
    const ref = db().doc(`users/${user.uid}/targets/${target.id}`);
    ref.delete().catch((e) => console.error(e));
  };

  const verifyTarget = (target) => {
    getIDToken().then((token) => {
      return fetch(`${process.env.API_HOST}/api/v1/target/verify?target=${target.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        if (res.ok) {
          console.log('Target verified');
        }
      }).catch((e) => {
        console.error(e);
      });
    });
  };

  const toggleTarget = (target) => {
    const ref = db().doc(`users/${user.uid}/targets/${target.id}`);
    ref.set({ active: !target.active }, { merge: true }).catch((e) => {
      console.error(e);
    });
  };

  return (
    <Layout>
      <Grid container className={classes.root} spacing={4}>
        <Grid item xs={12}>
          <Button
            variant='outlined'
            color='primary'
            className={classes.button}
            onClick={() => newTarget(!ui.targetDialogOpen)}>
            New Target
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.root} spacing={4}>
        {targets.map((t) => {
          return (
            <Grid item xs={12} sm={6} lg={4} key={t.id}>
              <TargetCard
                target={t}
                editCard={(target) => { editTarget(!ui.targetDialogOpen, target); }}
                deleteCard={(target) => { deleteTarget(target); }}
                verifyTarget={(target) => { verifyTarget(target); }}
                toggleTarget={(target) => { toggleTarget(target); }}
              />
            </Grid>
          );
        })}
      </Grid>
      <TargetDialog />
    </Layout>
  );
}

Targets.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect((state) => {
  return { auth: state.auth, targets: state.targets, ui: state.ui };
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
