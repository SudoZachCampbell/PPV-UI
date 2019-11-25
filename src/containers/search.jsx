import React from 'react';
import ComponentButton from '../components/ComponentButton';
import ListAdder from '../components/ListAdder';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { area: '', searchParams: {} };
    this.keywordListUpdate = this.keywordListUpdate.bind(this);
    this.textChange = this.textChange.bind(this);
  }

  keywordListUpdate = keywordList => {
    let searchParams = { ...this.state.searchParams };
    searchParams.keywords = keywordList;
    this.setState({ searchParams: searchParams });
  };

  textChange = e => {
    this.setState({ area: e.target.value });
  };

  searchStarted = () => {
    this.props.executeSearch(this.state.area, this.state.searchParams);
  };

  render() {
    let area = '';
    if (this.state.area) {
      area = this.state.area;
    }
    return (
      <div>
        <label htmlFor='app_areainput'>Area: </label>
        <input
          id='app_areainput'
          value={area}
          onChange={this.textChange}
          placeholder='Belfast'
        />
        <br />
        <ListAdder
          id='app_keywordinput'
          label='Keywords: '
          callback={this.keywordListUpdate}
        />
        <button onClick={this.searchStarted}>Search</button>
      </div>
    );
  }
}
