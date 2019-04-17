import React from 'react';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import {
  TopAppBarFixedAdjust
} from '@material/react-top-app-bar';

import './Main.scss';

const Main = () => (
  <TopAppBarFixedAdjust>
    <Grid className='main'>
      <Row>
        <Cell columns={4}>Tennis</Cell>
        <Cell columns={4}>Cricket</Cell>
        <Cell columns={4}>StarCraft</Cell>
      </Row>
    </Grid>
  </TopAppBarFixedAdjust>
);

export default Main;
