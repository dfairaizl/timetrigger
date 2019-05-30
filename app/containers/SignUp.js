import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { registerAccount } from '../services/auth';

import Logo from '../assets/images/Logo.svg';
import GoogleLogo from '../assets/images/btn_google_light_normal_ios.svg';

const styles = theme => ({
  button: {
    marginBottom: theme.spacing()
  },
  card: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  },
  content: {
    display: 'flex',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    width: '100%'
  },
  layout: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  link: {
    color: theme.palette.text.secondary
  },
  logo: {
    margin: '20px'
  },
  main: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    padding: '80px'
  },
  provider: {
    flex: 1
  },
  sepBackground: {
    position: 'relative',
    zIndex: 1,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    '&:before': {
      borderTop: `1px solid ${theme.palette.text.primary}`,
      content: '""',
      margin: '0 auto', /* this centers the line to the full width specified */
      position: 'absolute', /* positioning must be absolute here, and relative positioning must be applied to the parent */
      top: '50%',
      left: 0,
      right: 0,
      bottom: 0,
      width: '95%',
      zIndex: -1
    }
  },
  signUpButton: {
    marginBottom: theme.spacing(),
    marginTop: theme.spacing(2)
  },
  sepText: {
    display: 'inline',
    backgroundColor: 'white',
    padding: '0 15px'
  },
  text: {
    marginBottom: theme.spacing(2)
  }
});

const SignIn = ({ classes }) => {
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');

  const [emailError, updateEmailError] = useState('');
  const [passwordError, updatePasswordError] = useState('');

  const validateForm = () => {
    if (!email.length) {
      updateEmailError('Please enter a valid email address');
      return false;
    }

    if (!password.length) {
      updatePasswordError('Please enter a password');
      return false;
    }

    return true;
  };

  const onSignUp = () => {
    if (validateForm()) {
      updateEmailError('');
      updatePasswordError('');

      registerAccount(email, password).catch((err) => {
        console.log(err);
        if (err.code === 'auth/invalid-email') {
          updateEmailError('Please enter a correctly formatted email address');
        } else if (err.code === 'auth/user-not-found') {
          updateEmailError('There is no account registered for this email address');
        } else if (err.code === 'auth/email-already-in-use') {
          updateEmailError('An account with this email is already registered');
        } else if (err.code === 'auth/weak-password') {
          updatePasswordError('Password must be at least 6 characters');
        }
      });
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.layout}>
        <Container className={classes.container} maxWidth='sm'>
          <Card className={classes.card}>
            <Logo className={classes.logo} />
            <CardContent className={classes.content}>
              <Typography variant='h5' align='center' className={classes.text}>Hello There</Typography>
              <form className={classes.root} autoComplete='off'>
                <FormControl className={classes.formControl} fullWidth error={emailError.length > 0}>
                  <TextField
                    autoFocus
                    fullWidth
                    id='email'
                    label='E-mail'
                    margin='dense'
                    onChange={(e) => { updateEmail(e.target.value); }}
                    value={email}
                  />
                  <FormHelperText>{emailError}</FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl} fullWidth error={passwordError.length > 0}>
                  <TextField
                    fullWidth
                    id='password'
                    label='Password'
                    margin='dense'
                    onChange={(e) => { updatePassword(e.target.value); }}
                    value={password}
                    inputProps={{
                      type: 'password'
                    }}
                  />
                  <FormHelperText>{passwordError}</FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                  <Button
                    size='large'
                    variant='outlined'
                    className={classes.signUpButton}
                    color='primary'
                    onClick={onSignUp}
                  >
                      Sign Up
                  </Button>
                  <Typography component='span' align='center' variant='body2'>Already have an acount? <Link to='/sign-in' className={classes.link}>Sign In</Link></Typography>
                </FormControl>
              </form>
              <div className={classes.sepBackground}>
                <Typography className={classes.sepText} align='center' variant='body2'>OR</Typography>
              </div>
              <Button size='large' variant='outlined' className={classes.button} color='secondary'><GoogleLogo /><span className={classes.provider}>Sign In With Google</span></Button>
            </CardContent>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(SignIn);
