import React from 'react';
import Card from '@material/react-card';
import Button from '@material/react-button';
import {
  Body2,
  Headline4
} from '@material/react-typography';
import TextField, { Input } from '@material/react-text-field';

import './SignUp.scss';
import GoogleSVG from '../../assets/images/btn_google_light_normal_ios.svg';

export default (props) => {
  return (
    <div className='SignUp'>
      <Card className='SignUp--card'>
        <div className='SignUp--form'>
          <Headline4>Sign Up</Headline4>
          <TextField
            label='E-Mail'
            outlined
            className='SignUp--input'
          >
            <Input value='' />
          </TextField>
          <TextField
            label='Password'
            outlined
            className='SignUp--input'
          >
            <Input secure='secure' value='' />
          </TextField>
          <Button className='SignUp--button' outlined>
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
