import React, { useEffect, useReducer } from 'react';
import Button from '@material/react-button';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import {
  TopAppBarFixedAdjust
} from '@material/react-top-app-bar';
import MaterialTable from 'material-table';

import { useUIContext } from '../../context/ui-context';
import TriggerDialog from '../TriggerDialog/TriggerDialog';
import KeysDialog from '../KeysDialog/KeysDialog';
import db from '../../services/db';

import './Main.scss';

const Main = () => {
  const ref = db.collection('jobs');
  const [{ keysDialogOpen, triggerDialogOpen }, dispatch] = useUIContext();

  const [currentState, updater] = useReducer((state, action) => {
    const newState = [...state];

    switch (action.type) {
      case 'ADD_JOB':
        newState.splice(0, 0, action.job);
        return newState;
      case 'MODIFY_JOB':
        const modIndex = newState.findIndex((s) => s.id === action.job.id);
        newState.splice(modIndex, 1, action.job);
        return newState;
      case 'REMOVE_JOB':
        const delIndex = newState.findIndex((s) => s.id === action.job.id);
        newState.splice(delIndex, 1);
        return newState;
      default:
        return newState;
    }
  }, []);

  useEffect(() => {
    ref.onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          updater({ type: 'ADD_JOB', job: { id: change.doc.id, ...change.doc.data() } });
        }

        if (change.type === 'modified') {
          updater({ type: 'MODIFY_JOB', job: { id: change.doc.id, ...change.doc.data() } });
        }

        if (change.type === 'removed') {
          updater({ type: 'REMOVE_JOB', job: { id: change.doc.id, ...change.doc.data() } });
        }
      });
    });
  }, []);

  return (
    <TopAppBarFixedAdjust>
      <Grid className='main'>
        <Row className='row'>
          <Cell columns={12} className='top-cell'>
            <Button
              onClick={(ref) => dispatch({ type: 'ToggleTriggerDialog', toggle: !triggerDialogOpen })}
              outlined
            >
              New Trigger
            </Button>
            <Button
              onClick={(ref) => dispatch({ type: 'ToggleKeysDialog', toggle: !keysDialogOpen })}
              outlined
            >
              API Keys
            </Button>
          </Cell>
        </Row>
        <MaterialTable
          columns={[
            { title: 'Trigger Time', field: 'trigger_at', defaultSort: 'desc', render: (data) => <p>{data.trigger_at.toDate().toString()}</p> },
            { title: 'Job Types', field: 'surname', render: (data) => <p>{data.run.map(j => j.type).join(', ')}</p> },
            { title: 'Status', field: 'status' }
          ]}
          data={currentState}
          title='Time Jobs'
          options={{
            emptyRowsWhenPaging: false,
            pageSize: 25
          }}
        />

      </Grid>
      <TriggerDialog />
      <KeysDialog />
    </TopAppBarFixedAdjust>
  );
};

export default Main;
