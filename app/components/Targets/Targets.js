import React, { useEffect } from 'react';
import Button from '@material/react-button';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import {
  TopAppBarFixedAdjust
} from '@material/react-top-app-bar';

import TargetCard from './TargetCard';
import TargetDialog from '../TargetDialog/TargetDialog';

import { useUIContext } from '../../context/ui-context';
import db from '../../services/db';

import './Targets.scss';

const Targets = () => {
  const [{ targetDialogOpen }, dispatch] = useUIContext();
  const ref = db.collection('jobs');

  useEffect(() => {
    ref.onSnapshot((querySnapshot) => {
    });
  }, []);

  return (
    <TopAppBarFixedAdjust>
      <Grid className='Targets--grid'>
        <Row className='Targets--grid-row'>
          <Cell columns={12} className='Targets--grid__top-cell'>
            <Button
              onClick={(ref) => dispatch({ type: 'ToggleTargetDialog', toggle: !targetDialogOpen })}
              outlined
            >
              New Target
            </Button>
          </Cell>
        </Row>
        <Row>
          <Cell columns={4} className='Targets--grid-cell'>
            <TargetCard />
          </Cell>
          <Cell columns={4} className='Targets--grid-cell'>
            <TargetCard />
          </Cell>
          <Cell columns={4} className='Targets--grid-cell'>
            <TargetCard />
          </Cell>
        </Row>
      </Grid>
      <TargetDialog />
    </TopAppBarFixedAdjust>
  );
};

export default Targets;
