import React, { useState } from 'react';
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
      console.log(searchParams)
      view = (
        <Loading
          area={area}
          searchParams={searchParams}
          finishLoading={finishLoading}
        />
      );
      break;
    case 2:
      console.log(searchResult)
      view = <Summary searchResult={searchResult} />;
      break;
    default:
      break;
  }

  return <div className='App'>{view}</div>;
}

export default App;
