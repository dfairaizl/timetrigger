import React, { useReducer, useState } from 'react';
import Card from '@material/react-card';
import Button from '@material/react-button';
import {
  Body1,
  Body2,
  Headline4
} from '@material/react-typography';
import TextField, { Input } from '@material/react-text-field';
import { registerAccount } from '../../services/auth';

import './SignUp.scss';
import GoogleSVG from '../../assets/images/btn_google_light_normal_ios.svg';

const ErrorMessage = (props) => {
  return (
    <Body1 className={props.className}>{props.message}</Body1>
  );
};

export default (props) => {
  const [error, setError] = useState('');
  const [currentState, updater] = useReducer((state, action) => {
    switch (action.type) {
      case 'UPDATE_EMAIL':
        return { ...state, email: action.value };
      case 'UPDATE_PASSWORD':
        return { ...state, password: action.value };
      default:
        return state;
    }
  }, { email: '', password: '' });

  const errors = () => {
    if (error.length) {
      return <ErrorMessage
        className='ErrorMessage'
        message={error}
      />;
    }

    return null;
  };

  return (
    <div className='SignUp'>
      <Card className='SignUp--card'>
        <div className='SignUp--form'>
          <Headline4>Sign Up</Headline4>
          { errors() }
          <TextField
            label='E-Mail'
            outlined
            className='SignUp--input'
          >
            <Input value={currentState.email} onChange={(e) => updater({ type: 'UPDATE_EMAIL', value: e.currentTarget.value })} />
          </TextField>
          <TextField
            label='Password'
            outlined
            className='SignUp--input'
          >
            <Input secure='secure' value={currentState.password} onChange={(e) => updater({ type: 'UPDATE_PASSWORD', value: e.currentTarget.value })} />
          </TextField>
          <Button className='SignUp--button' outlined onClick={(e) => {
            e.preventDefault();
            registerAccount(currentState.email, currentState.password)
              .catch((e) => {
                setError(e.message);
              });
          }}>
            Sign UP
          </Button>
          <Body2 className='SignUp--link'><a href='#'>Forgot Password?</a></Body2>
          <div className='SignUp--divider'><span /><div>or</div></div>
          <Button className='SignUp--button' raised>
            <div className='SignUp--button__social'>
              <GoogleSVG />
              <div>Sign In With Google</div>
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
};
