import React, { useState } from 'react';
import Search from './containers/Search/Search';
import Loading from './containers/Loading/Loading';
import Summary from './containers/Summary/Summary';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
    setSearchResult(returnedSearchResult);
    setViewState(2);
  };

  let view;
  switch (viewState) {
    case 0:
      view = <Search executeSearch={executeSearch} />;
      break;
    case 1:
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
      view = <Summary searchResult={searchResult} />;
      break;
    default:
      break;
  }

  return (
    <div className='App'>
      <AppBar position='static' color='fix-theme'>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6'>Property Visualiser</Typography>
        </Toolbar>
      </AppBar>
      <Box padding='35px'>
        {view}
      </Box>
    </div>
  );
}

export default App;
