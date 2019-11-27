import React, { useState } from 'react';
import ListAdder from '../components/ListAdder';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

export default function Search(props) {
  const [area, setArea] = useState('');
  const [searchParams, setSearchParams] = useState({});

  const keywordListUpdate = keywordList => {
    searchParams.keywords = keywordList;
    setSearchParams(searchParams);
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
      <Button variant='contained' color='primary' onClick={searchStarted}>Search</Button>
    </div>
  );
}
