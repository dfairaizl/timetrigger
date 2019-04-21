import React, { useReducer } from 'react';
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

import { useUIContext } from '../../context/ui-context';
import './TriggerDialog.scss';

const TriggerDialog = (props) => {
  const [{ triggerDialogOpen }, dispatch] = useUIContext();
  const [currentState, updater] = useReducer((state, action) => {
    switch (action.type) {
      case 'UPDATE_TIME':
        return { ...state, time: action.value };
      case 'UPDATE_URL':
        return { ...state, url: action.value };
      case 'UPDATE_PAYLOAD':
        return { ...state, payload: action.value };
      default:
        return state;
    }
  }, { time: new Date() });

  const submitJob = () => {
    const body = {
      trigger: currentState.time,
      run: [{
        type: 'api_callback',
        uri: currentState.url,
        payload: currentState.payload
      }]
    };

    global.fetch('http://localhost:8080/api/v1/trigger', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.ok) {
        console.log('success');
      }
    }).catch((e) => {
      console.error(e);
    });
  };

  return (
    <Dialog
      open={triggerDialogOpen}
      className='TriggerDialog'
      onClose={(value) => {
        if (value === 'accept') {
          submitJob();
        }

        dispatch({ type: 'ToggleDialog', toggle: !triggerDialogOpen });
      }}
    >
      <DialogTitle>New Trigger</DialogTitle>
      <DialogContent>
        <Subtitle1>Create a new trigger by entering the information below.</Subtitle1>
        <TextField
          label='Time'
          className='form-input'
        >
          <Input value={currentState.time} onChange={(e) => updater({ type: 'UPDATE_TIME', value: e.currentTarget.value })} />
        </TextField>
        <TextField
          label='Webhook URL'
          className='form-input'
        >
          <Input value={currentState.url} onChange={(e) => updater({ type: 'UPDATE_URL', value: e.currentTarget.value })} />
        </TextField>
        <TextField
          label='JSON Payload'
          textarea
          className='form-input'
        >
          <Input value={currentState.payload} onChange={(e) => updater({ type: 'UPDATE_PAYLOAD', value: e.currentTarget.value })} />
        </TextField>
      </DialogContent>
      <DialogFooter>
        <DialogButton action='dismiss'>Dismiss</DialogButton>
        <DialogButton action='accept' isDefault>Accept</DialogButton>
      </DialogFooter>
    </Dialog>
  );
};

export default TriggerDialog;
