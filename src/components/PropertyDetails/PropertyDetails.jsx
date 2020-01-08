import React, { useState, useEffect, Suspense } from 'react';
import _ from 'lodash';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Typography } from '@material-ui/core';

import BarGraph from '../BarGraph/BarGraph';
import PPV from '../../api/ppv-service';

export default function PropertyDetails(props) {
  const [crimeData, setCrimeData] = useState({});
  const [crimeCategoryData, setCrimeCategoryData] = useState({});

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
    PPV.getCrimeData(props.property).then(data => {
      setCrimeData(() => {
        return data.fullData
      });
      setCrimeCategoryData(() => {
        return _.reduce(
          data.categoryCounts,
          (accum, value, key) => {
            accum.push({
              name: key,
              occurences: value
            });
            return accum;
          },
          []
        );
      });
    });
  }, []);

  const goBack = () => {
    props.callback(0, 0);
  };

  return (
    <div>
      <Button color='secondary' onClick={goBack}>
        Back
      </Button>
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
      {!Object.keys(crimeData).length ? (
        'Loading Area Crime Data...'
      ) : (
        <div>
          <BarGraph data={crimeCategoryData} />
          <Typography>{JSON.stringify(crimeData)}}</Typography>
          <Typography>{JSON.stringify(crimeCategoryData)}}</Typography>
        </div>
      )}
    </div>
  );
}
