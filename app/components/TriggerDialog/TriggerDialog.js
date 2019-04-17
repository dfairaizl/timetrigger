import React, { Component } from 'react';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton
} from '@material/react-dialog';

import './TriggerDialog.scss';

class TriggerDialog extends Component {
  render () {
    return (
      <Dialog
        open={this.props.open}
      >
        <DialogTitle>New Trigger</DialogTitle>
        <DialogContent>
          <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h1>
        </DialogContent>
        <DialogFooter>
          <DialogButton action='dismiss'>Dismiss</DialogButton>
          <DialogButton action='accept' isDefault>Accept</DialogButton>
        </DialogFooter>
      </Dialog>
    );
  }
}

export default TriggerDialog;
