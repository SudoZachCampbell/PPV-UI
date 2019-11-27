import React, { useState, useEffect } from 'react';
import Search from './containers/Search';
import Loading from './containers/Loading';
import Summary from './containers/Summary';
import './App.scss';

function App(props) {
  const [viewState, setViewState] = useState(0);
  const [area, setArea] = useState('');
  const [searchParams, setSearchParams] = useState({});
  const [searchResult, setSearchResult] = useState({});

  const executeSearch = (area, searchParams) => {
    setViewState(1);
    setArea(area);
    setSearchParams(searchParams);
  };

  const finishLoading = searchResult => {
    setViewState(2);
    setSearchResult(setSearchResult);
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
        />
      );
      break;
    case 2:
      view = <Summary searchResult={searchResult} />;
      break;
    default:
      break;
  }

  return <div className='App'>{view}</div>;
}

export default App;
