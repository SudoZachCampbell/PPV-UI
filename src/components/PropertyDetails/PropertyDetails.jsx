import React, { useState, useEffect, Suspense } from 'react';
import _ from 'lodash';

import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Typography } from '@material-ui/core';

import PPV from '../../api/ppv-service';

export default function PropertyDetails(props) {
const [crimeData, setCrimeData] = useState(0);

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

  useEffect(() => {
    const openData = PPV.getCrimeData(props.property);
    setCrimeData(openData.crimes);
  }, [])

  return (
    <div>
      <Typography variant='h1'>{`${props.property.address}, ${props.property.postcode}`}</Typography>
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
      <Typography>{!crimeData ? 'Loading Area Crime Data...' : crimeData}</Typography>
    </div>
  );
}
