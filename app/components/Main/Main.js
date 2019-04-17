import React from 'react';
import Button from '@material/react-button';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import {
  TopAppBarFixedAdjust
} from '@material/react-top-app-bar';

import { getContextState } from '../../context/ui-context';
import TriggerDialog from '../TriggerDialog/TriggerDialog';

import './Main.scss';

const Main = () => {
  const [{ triggerDialogOpen }, dispatch] = getContextState();

  return (
    <TopAppBarFixedAdjust>
      <Grid className='main'>
        <Row className='row'>
          <Cell columns={12}>
            <Button
              onClick={(ref) => dispatch({ type: 'ToggleDialog', toggle: !triggerDialogOpen })}
              outlined
            >
              New Trigger
            </Button>
          </Cell>
        </Row>
        <Row>
          <Cell className='main-cell' columns={12}>Row 1</Cell>
        </Row>
        <Row>
          <Cell className='main-cell' columns={12}>Row 2</Cell>
        </Row>
        <Row>
          <Cell className='main-cell' columns={12}>Row 3</Cell>
        </Row>
        <Row>
          <Cell className='main-cell' columns={12}>Row 4</Cell>
        </Row>
      </Grid>
      <TriggerDialog />
    </TopAppBarFixedAdjust>
  );
};

export default Main;
