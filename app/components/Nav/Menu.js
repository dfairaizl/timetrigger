import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
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

const styles = {};

const UserMenu = ({ classes, history, user }) => {
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
  );
};

export default (withStyles(styles)(withRouter(UserMenu)));
