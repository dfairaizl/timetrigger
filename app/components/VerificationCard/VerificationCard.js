import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  card: {
    marginTop: theme.spacing(2),
    borderColor: theme.palette.primary.main,
    borderWidth: '1px',
    borderStyle: 'solid',
    boxShadow: 'none'
  },
  verifyText: {
    marginBottom: '0px'
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  label: {
    marginRight: '10px'
  }
});

function getHelperText (method) {
  if (method === 'dns_txt') {
    return 'Very your endpoint by adding the following text as a DNS TXT record to your domain.';
  } else if (method === 'static_file') {
    return 'Very your endpoint by adding the following text to a file called timetrigger.txt located at the root of your domain.';
  }
}

const VerificationCard = ({ classes, method, verificationCode }) => {
  const verificationId = method ? `timetrigger-verify=${verificationCode}` : 'Please select a method';

  return (
    <Card className={classes.card}>
      <CardContent>
        <div>
          <Typography variant='h6' className={classes.label}>Verification</Typography>
          <Typography variant='subtitle1' paragraph>Target verification is used to prevent abuse. {getHelperText(method)}</Typography>
          <Typography className={classes.verifyText} variant='subtitle1' align='center' paragraph><strong>{verificationId}</strong></Typography>
        </div>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button>Help</Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(VerificationCard);
