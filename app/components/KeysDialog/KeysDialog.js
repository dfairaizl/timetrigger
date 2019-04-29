import React, { useEffect, useState } from 'react';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton
} from '@material/react-dialog';
import Button from '@material/react-button';
import {
  Subtitle1
} from '@material/react-typography';
import TextField, { HelperText, Input } from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import copy from 'clipboard-copy';

import db from '../../services/db';
import { getIDToken } from '../../services/auth';
import { useAuthContext } from '../../context/auth-context';
import { useUIContext } from '../../context/ui-context';
import './KeysDialog.scss';

const KeysDialog = (props) => {
  const { user } = useAuthContext();
  const [{ keysDialogOpen }, dispatch] = useUIContext();

  const [apiKey, updateAPIKey] = useState('');
  const [secretKey, updateSecretKey] = useState('');

  const ref = db.doc(`users/${user.uid}`);

  useEffect(() => {
    ref.onSnapshot((doc) => {
      if (doc.exists) {
        const creds = doc.data().credentials || {};
        updateAPIKey(creds.api_key);
      }
    });
  }, []);

  const fetchAPIToken = () => {
    getIDToken().then((token) => {
      return window.fetch('http://localhost:8080/api/v1/user/api-key', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    }).then((data) => {
      updateAPIKey(data.key);
      updateSecretKey(data.secret);
    }).catch((error) => console.error(error));
  };

  return (
    <Dialog
      open={keysDialogOpen}
      className='KeysDialog'
      onClose={(value) => {
        updateSecretKey('');
        dispatch({ type: 'ToggleDialog', toggle: !keysDialogOpen });
      }}
    >
      <DialogTitle>API Keys</DialogTitle>
      <DialogContent>
        <Subtitle1>Generate or regenerate your API key pair.</Subtitle1>
        <TextField
          className='form-input'
          label='API Key'
          onTrailingIconSelect={() => copy(apiKey)}
          trailingIcon={<MaterialIcon role='button' icon='file_copy' />}
        >
          <Input value={apiKey} />
        </TextField>
        <TextField
          className='form-input'
          label='Secret'
          helperText={<HelperText persistent>This value is only shown once upon key generation!</HelperText>}
          onTrailingIconSelect={() => copy(secretKey)}
          trailingIcon={<MaterialIcon role='button' icon='file_copy' />}
        >
          <Input value={secretKey} />
        </TextField>
        <Button className='SignUp--button' outlined onClick={(e) => {
          e.preventDefault();
          fetchAPIToken();
        }}>
          { apiKey && apiKey.length ? 'Regenerage' : 'Generate' }
        </Button>
      </DialogContent>
      <DialogFooter className='KeysDialog--footer'>
        <DialogButton action='done' isDefault>Done</DialogButton>
      </DialogFooter>
    </Dialog>
  );
};

export default KeysDialog;
