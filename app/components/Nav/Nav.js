import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import CloudDone from '@material-ui/icons/CloudDone';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from '../../assets/images/Logo.svg';

const styles = theme => ({
  appBar: {
    borderBottom: '1px solid #E6E6E6',
    position: 'relative'
  },
  logo: {
    flexGrow: '1'
  }
});

const Nav = ({ classes, history, auth }) => {
  const { user = {} } = auth;

  const [anchorElement, setAnchorElement] = useState(null);
  const [menuOpen, updateMenu] = useState(false);

  const handleOpen = (event) => {
    setAnchorElement(event.currentTarget);
    updateMenu(true);
  };

  const handleClose = (event) => {
    setAnchorElement(null);
    updateMenu(false);
  };

  return (
    <AppBar position='static' className={classes.appBar} elevation={0}>
      <Toolbar>
        <Logo className={classes.logo} />
        <div>
          <IconButton
            color='inherit'
            onClick={handleOpen}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorElement}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={menuOpen}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon className={classes.icon}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary='Account 'secondary={user.email} />
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon className={classes.icon}>
                <CloudDone />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary='Triggers' onClick={() => history.push('/')} />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon className={classes.icon}>
                <DeviceHubIcon />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary='API Targets' onClick={() => history.push('/targets')} />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon className={classes.icon}>
                <PowerSettingsNewIcon />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary='Sign Out' />
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default connect((state) => {
  return { auth: state.auth };
})(withStyles(styles)(withRouter(Nav)));
