import React from 'react';
import ListAdder from '../components/ListAdder';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

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
        <InputLabel id='label'>Bedrooms</InputLabel>
        <Select labelId='label' id='select' value='20'>
          <MenuItem value='10'>Ten</MenuItem>
          <MenuItem value='20'>Twenty</MenuItem>
        </Select>
        <button onClick={this.searchStarted}>Search</button>
      </div>
    );
  }
}
