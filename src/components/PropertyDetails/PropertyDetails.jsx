import React, { useState, useEffect, Suspense } from 'react';
import _ from 'lodash';

import Box from '@material-ui/core/Box'
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
  const [crimeDistance, setCrimeDistance] = useState(1);
  const [filteredCrimeData, setFilteredCrimeData] = useState([]);
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
      value: 0.1,
      label: '100m'
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
    }
  ];

  useEffect(() => {
    PPV.getCrimeData(props.property).then(data => {
      setCrimeData(() => {
        if (data.length !== 0) {
          return data;
        } else {
          return false;
        }
      });


    });
  }, [props.property]);

  useEffect(() => {
    setFilteredCrimeData(() => {
      return crimeData.filter(value => value.distance <= crimeDistance);
    });
  }, [crimeData, crimeDistance])

  useEffect(() => {
    setCrimeCategoryData(countCategories(filteredCrimeData));
  }, [filteredCrimeData])

  const countCategories = crimeData => {
    return _.countBy(crimeData, (value) => value.category);
  };

  const setDataDistance = value => {
    setCrimeDistance(value);
  };

  const goBack = () => {
    props.callback(0, -1);
  };

  const valuetext = value => {
    if (value >= 1) {
      return `${value}km`;
    } else {
      return `${value}m`;
    }
  };

  return (
    <Box width='100%'>
      <Button color='secondary' onClick={goBack}>
        Back
      </Button>
      <Typography color='textPrimary' variant='h3'>{`${props.property.address}, ${props.property.postcode}`}</Typography>
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
            <Box width='100%'>
              <BarGraph data={crimeCategoryData} x='name' y='occurences' />
              <Slider
                id='map_slider'
                onChange={(event, value) => {
                  setDataDistance(value);
                }}
                defaultValue={1}
                min={0.1}
                max={1.5}
                step={null}
                marks={marks}
                // aria-labelledby='vertical-slider'
                valueLabelDisplay='auto'
                valueLabelFormat={valuetext}
              />
            </Box>
          )}
    </Box>
  );
}
