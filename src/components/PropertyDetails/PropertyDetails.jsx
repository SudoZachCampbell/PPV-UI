import React from 'react';

import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import _ from 'lodash';

export default function PropertyDetails(props) {
  const omits = [
    'id',
    'search_id',
    'keywords',
    'rent',
    'description',
    'address',
    'postcode',
    'images',
    'lastUpdated'
  ];

  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableBody>
          {_.map(_.omit(props.property, omits), (value, key) => (
            <TableRow key={key}>
              <TableCell component='th' scope='row'>
                {_.startCase(key)}
              </TableCell>
              <TableCell align='right'>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
