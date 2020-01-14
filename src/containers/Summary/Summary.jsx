import React, { useState } from 'react';
import _ from 'lodash';

import PropertyList from '../../components/PropertyList/PropertyList';
import SearchStats from '../../components/SearchStats/SearchStats';
import ResultMap from '../../components/ResultMap/ResultMap';
import GoogleMap from '../../components/GoogleMap/GoogleMap';

import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { makeStyles } from '@material-ui/core/styles';

import './Summary.scss';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    value === index && (
      <Box p={3} width='100%'>
        {children}
      </Box>
    )
  );
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: 224
  },
  tabs: {
    borderRight: `1px solid white`
  }
}));

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

const steps = [
  {
    value: 0.25
  },
  {
    value: 0.5
  },
  {
    value: 0.75
  },
  {
    value: 1
  },
  {
    value: 2
  },
  {
    value: 3
  },
  {
    value: 4
  },
  {
    value: 5
  },
  {
    value: 10
  },
  {
    value: 15
  },
  {
    value: 20
  },
  {
    value: 25
  }
];

export default function Summary(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(props.searchResult);

  return (
    <div className={classes.root}>
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label='Vertical tabs example'
        className={classes.tabs}
      >
        <Tab label='Summary' {...a11yProps(0)} />
        <Tab label='Map' {...a11yProps(1)} />
        <Tab label='Property List' {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SearchStats result={props.searchResult} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ResultMap
          lat={props.searchResult.location.lat}
          long={props.searchResult.location.lng}
          result={props.searchResult.searchResult}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PropertyList result={props.searchResult.searchResult} />
      </TabPanel>
    </div>
  );
}
