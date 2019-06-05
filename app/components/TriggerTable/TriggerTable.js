import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import TriggerTableRow from '../TriggerTableRow/TriggerTableRow';

const styles = (theme) => ({

});

function TriggerTable (props) {
  const { data } = props;

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Trigger Time</TableCell>
            <TableCell align='center'>Job Type</TableCell>
            <TableCell align='center'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TriggerTableRow key={row.id} data={row} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

TriggerTable.propTypes = {
  data: PropTypes.array.isRequired
};

export default withStyles(styles)(TriggerTable);
