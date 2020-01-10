import React, { useState } from 'react';
import _ from 'lodash';

import PropertyList from '../../components/PropertyList/PropertyList';

import Box from '@material-ui/core/Box'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

import './Summary.scss';
import SearchStats from '../../components/SearchStats/SearchStats';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
      value === index && <Box p={3} width='100%'>{children}</Box>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid white`,
  },
}));

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Summary(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {/* <SearchStats /> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PropertyList result={props.searchResult.searchResult} />
      </TabPanel>
    </div>
  )
}
