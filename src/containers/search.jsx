import React, { useState, useEffect } from 'react';
import ListAdder from '../components/ListAdder';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

export default function Search(props) {
  const [area, setArea] = useState('');
  const [searchParams, setSearchParams] = useState({});

  const keywordListUpdate = keywordList => {
    searchParams.keywords = keywordList;
    setSearchParams({ searchParams: searchParams });
  };

  const textChange = e => {
    setArea(e.target.value);
  };

  const searchStarted = () => {
    props.executeSearch(area, searchParams);
  };

  return (
    <div>
      <TextField
        required
        id='app_areainput'
        label='Area'
        onChange={textChange}
        margin='normal'
      />
      <br />
      <ListAdder
        id='app_keywordinput'
        label='Keywords: '
        callback={keywordListUpdate}
      />
      <InputLabel id='label'>Bedrooms</InputLabel>
      <Select labelId='label' id='select' value='20'>
        <MenuItem value='10'>Ten</MenuItem>
        <MenuItem value='20'>Twenty</MenuItem>
      </Select>
      <button onClick={searchStarted}>Search</button>
    </div>
  );
}
