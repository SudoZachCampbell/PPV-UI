import React, { useState } from 'react';
import Search from './containers/Search/Search';
import Loading from './containers/Loading/Loading';
import Summary from './containers/Summary/Summary';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';

import './App.scss';

function App(props) {
  const [viewState, setViewState] = useState(0);
  const [area, setArea] = useState('');
  const [searchParams, setSearchParams] = useState({});
  const [searchResult, setSearchResult] = useState({});

  const executeSearch = (area, searchParams) => {
    setArea(area);
    setSearchParams(searchParams);
    setViewState(1);
  };

  const finishLoading = returnedSearchResult => {
    console.log(returnedSearchResult);
    setSearchResult(returnedSearchResult);
    setViewState(2);
  };

  let view;
  switch (viewState) {
    case 0:
      view = <Search executeSearch={executeSearch} />;
      break;
    case 1:
      console.log(searchParams);
      view = (
        <Loading
          area={area}
          searchParams={searchParams}
          finishLoading={finishLoading}
          performance={true}
        />
      );
      break;
    case 2:
      console.log(searchResult);
      view = <Summary searchResult={searchResult} />;
      break;
    default:
      break;
  }

  return (
    <div className='App'>
      <AppBar color='primary' position='static'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6'>Property Visualiser</Typography>
        </Toolbar>
      </AppBar>
      {view}
    </div>
  );
}

export default App;
