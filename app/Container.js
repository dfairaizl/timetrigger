import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Mark from './assets/images/Mark.svg';

import Nav from './components/Nav/Nav';

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.unit * 2,
    width: '100%'
  },
  footer: {
    backgroundColor: theme.palette.secondary.main
  },
  layout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    flex: '1',
    padding: '20px 80px'
  }
});

function Container (props) {
  const {
    classes,
    children
  } = props;

  return (
    <div>
      <CssBaseline />
      <div className={classes.layout}>
        <Nav />
        <main className={classes.main}>
          {children}
        </main>
        <AppBar position='static' color='secondary' className={classes.footer}>
          <Toolbar>
            <div className={classes.container}>
              <div>
                <Typography variant='body1' color='inherit' noWrap>
                  Made with ❤️ in New York City
                </Typography>
                <Typography variant='caption' color='inherit' noWrap>
                  Copyright © 2019 Time Trigger
                </Typography>
              </div>
              <Mark className={classes.mark} />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}

Container.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Container);
