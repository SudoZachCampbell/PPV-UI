import React from 'react';
import Search from './containers/Search';
import Loading from './containers/Loading';
import Summary from './containers/Summary';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { viewState: 0, area: '', searchParams: {}, searchResult: {} };
    this.executeSearch = this.executeSearch.bind(this);
    this.finishLoading = this.finishLoading.bind(this);
  }

  executeSearch = (area, searchParams) => {
    this.setState({ viewState: 1, area: area, searchParams: searchParams });
  };

  finishLoading = searchResult => {
    this.setState({ viewState: 2, searchResult: searchResult });
  };

  searchToggle = () => {};

  render() {
    let view = '';
    switch (this.state.viewState) {
      case 0:
        view = <Search executeSearch={this.executeSearch} />;
        break;
      case 1:
        view = (
          <Loading
            area={this.state.area}
            searchParams={this.state.searchParams}
            finishLoading={this.finishLoading}
          />
        );
        break;
      case 2:
        view = <Summary searchResult={this.state.searchResult} />;
        break;
      default:
        break;
    }
    return <div className='App'>{view}</div>;
  }
}

export default App;
