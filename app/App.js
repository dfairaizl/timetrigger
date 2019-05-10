import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Mark from './assets/images/Mark.svg';

import Nav from './components/Nav/Nav';

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.unit * 2,
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  main: {
    flex: '1',
    padding: '20px 80px'
  },
  mark: {
    // marginBottom: theme.spacing.unit * 2,
    // marginRight: theme.spacing.unit,
    // marginTop: theme.spacing.unit * 2
  },
  layout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  footer: {
    backgroundColor: theme.palette.secondary.main
  }
});

const App = (props) => {
  const { classes } = props;

  return (
    <div >
      <CssBaseline />
      <div className={classes.layout}>
        <Nav />
        <main className={classes.main}>{props.children}</main>
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
};

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
