import React from 'react';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton
} from '@material/react-dialog';
import {
  Subtitle1
} from '@material/react-typography';
import TextField, { Input } from '@material/react-text-field';
import Select from '@material/react-select';

import db from '../../services/db';
import { useAuthContext } from '../../context/auth-context';
import { useUIContext } from '../../context/ui-context';
import './TargetDialog.scss';

const TargetDialog = (props) => {
  const { user } = useAuthContext();
  const [{ targetDialogOpen }, dispatch] = useUIContext();

  // const ref = db.doc(`users/${user.uid}/targets`);

  const options = [{
    label: '',
    defaultValue: true,
    disabled: true
  }, {
    label: 'DNS',
    value: 'dns'
  }, {
    label: 'Static File',
    value: 'file'
  }];

  return (
    <Dialog
      open={targetDialogOpen}
      className='TargetDialog'
      onClose={(value) => {
        dispatch({ type: 'ToggleDialog', toggle: !targetDialogOpen });
      }}
    >
      <DialogTitle>New Targert</DialogTitle>
      <DialogContent>
        <Subtitle1>Create a new target to execute triggers agaist.</Subtitle1>
        <TextField
          label='Target Name'
        >
          <Input value='test' />
        </TextField>
        <TextField
          label='API Endpoint'
        >
          <Input value='' />
        </TextField>
        <Select
          className='select-input'
          label='Verification Method'
          onChange={(evt) => console.log(evt.target.value)}
          options={options}
        />
      </DialogContent>
      <DialogFooter className='TargetDialog--footer'>
        <DialogButton action='cancel' isDefault>Cancel</DialogButton>
        <DialogButton action='done' isDefault>Done</DialogButton>
      </DialogFooter>
    </Dialog>
  );
};

export default TargetDialog;
