import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CloudDone from "@material-ui/icons/CloudDone";
import DeviceHubIcon from "@material-ui/icons/DeviceHub";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import PersonIcon from "@material-ui/icons/Person";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

import { signOut } from "../../services/auth";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

const UserMenu = ({ classes, history, user }) => {
  const [anchorElement, setAnchorElement] = useState(null);
  const [menuOpen, updateMenu] = useState(false);

  const handleOpen = event => {
    setAnchorElement(event.currentTarget);
    updateMenu(true);
  };

  const handleClose = event => {
    setAnchorElement(null);
    updateMenu(false);
  };

  return (
    <div>
      <IconButton color="inherit" onClick={handleOpen}>
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={menuOpen}
        onClose={handleClose}
      >
        <div className={classes.root}>
          <List component="nav">
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText
                primary="Account"
                secondary={user.email}
                onClick={() => history.push("/account")}
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <CloudDone />
              </ListItemIcon>
              <ListItemText
                primary="Triggers"
                onClick={() => history.push("/triggers")}
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DeviceHubIcon />
              </ListItemIcon>
              <ListItemText
                primary="API Targets"
                onClick={() => history.push("/targets")}
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PowerSettingsNewIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" onClick={() => signOut()} />
            </ListItem>
          </List>
        </div>
      </Menu>
    </div>
  );
};

export default withStyles(styles)(withRouter(UserMenu));
