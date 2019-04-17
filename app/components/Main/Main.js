import React, { Component } from 'react';
import Button from '@material/react-button';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import {
  TopAppBarFixedAdjust
} from '@material/react-top-app-bar';

import TriggerDialog from '../TriggerDialog/TriggerDialog';

import './Main.scss';

// this.state = { isOpen: false };

class Main extends Component {
  constructor () {
    super();

    this.state = {
      open: false
    };
  }
  render () {
    return (
      <TopAppBarFixedAdjust>
        <Grid className='main'>
          <Row className='row'>
            <Cell columns={12}>
              <Button onClick={(ref) => this.setState({ open: !this.state.open })} outlined>New Trigger</Button>
            </Cell>
          </Row>
          <Row>
            <Cell columns={4}>Tennis</Cell>
            <Cell columns={4}>Cricket</Cell>
            <Cell columns={4}>StarCraft</Cell>
          </Row>
        </Grid>
        <TriggerDialog open={this.state.open} />
      </TopAppBarFixedAdjust>
    );
  }
}

export default Main;
