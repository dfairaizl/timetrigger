import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import dateformat from "dateformat";

const styles = () => ({
  card: {
    maxWidth: 400,
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
  label: {
    marginRight: "10px",
  },
  textGroup: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  switch: {
    marginLeft: "auto",
  },
});

const TargetCard = (props) => {
  const {
    target,
    classes,
    editCard,
    deleteCard,
    verifyTarget,
    toggleTarget,
  } = props;

  const [anchorElement, setAnchorElement] = useState(null);
  const [menuOpen, updateMenu] = useState(false);

  const handleOpen = (event) => {
    setAnchorElement(event.currentTarget);
    updateMenu(true);
  };

  const handleClose = () => {
    setAnchorElement(null);
    updateMenu(false);
  };

  const editTarget = () => {
    editCard(target);
    handleClose();
  };

  const deleteTarget = () => {
    deleteCard(target);
    handleClose();
  };

  const renderVerifyButton = () => {
    if (!target.verified) {
      return (
        <Button variant="outlined" onClick={() => verifyTarget(target)}>
          Verify Now
        </Button>
      );
    }

    return null;
  };

  const targetDate = dateformat(
    target.created_at.toDate().toString(),
    "mm/dd/yyyy"
  );

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        onClick={handleOpen}
        title={target.targetName}
        subheader={target.id}
      />
      <Menu
        id="menu-appbar"
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={menuOpen}
        onClose={handleClose}
      >
        <MenuItem onClick={editTarget}>Edit</MenuItem>
        <MenuItem onClick={deleteTarget}>Delete</MenuItem>
      </Menu>
      <CardContent>
        <div className={classes.textGroup}>
          <Typography
            variant="subtitle1"
            className={classes.label}
            paragraph
            display="inline"
          >
            <strong>Endpoint:</strong>
          </Typography>
          <Typography variant="subtitle1" paragraph display="inline">
            {target.endpoint}
          </Typography>
        </div>
        <div className={classes.textGroup}>
          <Typography
            variant="subtitle1"
            className={classes.label}
            paragraph
            display="inline"
          >
            <strong>Verification Method:</strong>
          </Typography>
          <Typography variant="subtitle1" paragraph display="inline">
            {target.verificationMethod}
          </Typography>
        </div>
        <div className={classes.textGroup}>
          <Typography
            variant="subtitle1"
            className={classes.label}
            paragraph
            display="inline"
          >
            <strong>Verified:</strong>
          </Typography>
          <Typography variant="subtitle1" paragraph display="inline">
            {String(target.verified)}
          </Typography>
        </div>
        <div className={classes.textGroup}>
          <Typography
            variant="subtitle1"
            className={classes.label}
            paragraph
            display="inline"
          >
            <strong>Created On:</strong>
          </Typography>
          <Typography variant="subtitle1" paragraph display="inline">
            {targetDate}
          </Typography>
        </div>
      </CardContent>
      <CardActions className={classes.actions}>
        {renderVerifyButton()}
        <FormControlLabel
          className={classes.switch}
          control={
            <Switch
              onChange={() => toggleTarget(target)}
              checked={target.active}
              color="primary"
            />
          }
          label="Active"
        />
      </CardActions>
    </Card>
  );
};

TargetCard.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteCard: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
  target: PropTypes.object.isRequired,
  toggleTarget: PropTypes.func.isRequired,
  verifyTarget: PropTypes.func.isRequired,
};

export default withStyles(styles)(TargetCard);
