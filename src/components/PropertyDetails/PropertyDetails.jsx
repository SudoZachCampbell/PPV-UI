import React, { useState, useEffect, Suspense } from 'react';
import _ from 'lodash';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Typography } from '@material-ui/core';

import BarGraph from '../BarGraph/BarGraph';
import PPV from '../../api/ppv-service';

export default function PropertyDetails(props) {
  const [crimeData, setCrimeData] = useState([]);
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

  const marks = [
    {
      value: 0,
      label: '0m'
    },
    {
      value: 0.1
    },
    {
      value: 0.25,
      label: '250m'
    },
    {
      value: 0.3
    },
    {
      value: 0.4
    },
    {
      value: 0.5,
      label: '500m'
    },
    {
      value: 0.75
    },
    {
      value: 1,
      label: '1km'
    },
    {
      value: 1.5,
      label: '1.5km'
    },
    {
      value: 2,
      label: '2km'
    },
    {
      value: 3,
      label: '3km'
    },
    {
      value: 4,
      label: '4km'
    },
    {
      value: 5,
      label: '5km'
    }
  ];

  useEffect(() => {
    PPV.getCrimeData(props.property).then(data => {
      setCrimeData(() => {
        if (data.fullData.length !== 0) {
          return data.fullData;
        } else {
          return false;
        }
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

  const setDataDistance = value => {};

  const goBack = () => {
    props.callback(0, 0);
  };

  const valuetext = value => {
    if (value >= 1) {
      return `${value}km`;
    } else {
      return `${value}m`;
    }
  }

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
      {!crimeData ? (
        <Typography>No Crimes in that Area</Typography>
      ) : crimeData.length === 0 ? (
        <Typography>Loading Area Crime Data...</Typography>
      ) : (
        <div>
          <BarGraph data={crimeCategoryData} />
          <Slider
            id='map_slider'
            onChange={(event, value) => {
              setDataDistance(value);
            }}
            defaultValue={1}
            min={0}
            max={5}
            step={null}
            marks={marks}
            // aria-labelledby='vertical-slider'
            valueLabelDisplay='auto'
            getAriaValueText={valuetext}
          />
          <Typography>{JSON.stringify(crimeData)}}</Typography>
          <Typography>{JSON.stringify(crimeCategoryData)}}</Typography>
        </div>
      )}
    </div>
  );
}
