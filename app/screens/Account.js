import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Layout from '../Layout';

import { updateEmail, updatePassword } from '../services/auth';

import GoogleLogo from '../assets/images/btn_google_light_normal_ios.svg';

const styles = theme => ({
  button: {
    marginTop: theme.spacing(2),
    alignSelf: 'flex-end',
    minWidth: '100px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formContainer: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2)
  },
  heading: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  subHeading: {
    marginBottom: theme.spacing(),
    marginTop: theme.spacing(6)
  },
  provider: {
    flex: 1,
    paddingLeft: theme.spacing(2)
  },
  providerButton: {
    alignSelf: 'center',
    minWidth: '320px',
    marginTop: theme.spacing(2),
    maxWidth: '420px'
  }
});

function Account ({ classes, auth }) {
  const { user } = auth;

  const [email, updateFormEmail] = useState(user.email);
  const [emailError, updateEmailError] = useState('');
  const [emailSaveState, updateEmailSaveState] = useState('Save');

  const updateAccountEmail = () => {
    if (email.length) {
      updateEmail(email).then(() => {
        updateEmailError('');

        updateEmailSaveState('Saved!');
        setTimeout(() => updateEmailSaveState('Save'), 3000);
      }).catch((e) => {
        console.error(e);
        if (e.code === 'auth/invalid-email') {
          updateEmailError(e.message);
        }
      });
    } else {
      updateEmailError('Please enter an email address');
    }
  };

  const [password, updateFormPassword] = useState('');
  const [passwordConfirm, updatePasswordConfirm] = useState('');
  const [passwordError, updatePasswordError] = useState('');
  const [passwordSaveState, updatePasswordSaveState] = useState('Save');

  const updateAccountPassword = () => {
    if (password.length && passwordConfirm.length && password === passwordConfirm) {
      updatePassword(password).then(() => {
        updatePasswordSaveState('Saved');
        setTimeout(() => updatePasswordSaveState('Save'), 3000);
      }).catch((e) => {
        console.error(e);

        if (e.code === 'auth/requires-recent-login') {
          updatePasswordError('Your session has expired. Please sign out and back in to change password.');
        } else if (e.code === 'auth/weak-password') {
          updatePasswordError('Please use a strong password that is at least 6 characters');
        }
      });
    } else {
      updatePasswordError('Passwords entered do not match');
    }
  };

  return (
    <Layout>
      <Typography variant='h5' className={classes.heading}>Account</Typography>
      <Divider />
      <Container className={classes.formContainer} maxWidth='sm'>
        <Typography variant='h5' className={classes.heading}>Email Address</Typography>
        <form className={classes.form} autoComplete='off'>
          <FormControl className={classes.formControl} fullWidth error={emailError.length > 0}>
            <TextField
              fullWidth
              id='email'
              margin='dense'
              onChange={(e) => { updateFormEmail(e.target.value); }}
              value={email}
            />
            <FormHelperText>{emailError.length ? emailError : 'Update the email address used for this account' }</FormHelperText>
          </FormControl>
          <Button
            align='right'
            variant='outlined'
            color='primary'
            className={classes.button}
            onClick={updateAccountEmail}
          >
            {emailSaveState}
          </Button>
        </form>
        <Typography variant='h5' className={classes.subHeading}>Change Password</Typography>
        <form className={classes.form} autoComplete='off'>
          <FormControl className={classes.formControl} fullWidth error={passwordError.length > 0}>
            <TextField
              fullWidth
              id='password'
              label='Password'
              margin='dense'
              inputProps={{
                type: 'password'
              }}
              onChange={(e) => { updateFormPassword(e.target.value); }}
              value={password}
            />
            <FormHelperText>{passwordError.length ? passwordError : '' }</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl} fullWidth>
            <TextField
              fullWidth
              id='confirm-password'
              label='Re-type Password'
              margin='dense'
              inputProps={{
                type: 'password'
              }}
              onChange={(e) => { updatePasswordConfirm(e.target.value); }}
              value={passwordConfirm}
            />
          </FormControl>
          <Button
            align='right'
            variant='outlined'
            color='primary'
            className={classes.button}
            onClick={updateAccountPassword}
          >
            {passwordSaveState}
          </Button>
        </form>
        <form className={classes.form}>
          <Typography variant='h5' className={classes.subHeading}>Linked Accounts</Typography>
          <Button
            size='large'
            variant='outlined'
            className={classes.providerButton}
            color='secondary'
          >
            <GoogleLogo />
            <span className={classes.provider}>Sign In With Google</span>
          </Button>
        </form>
      </Container>
    </Layout>
  );
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect((state) => {
  return { auth: state.auth };
})(withStyles(styles)(Account));
