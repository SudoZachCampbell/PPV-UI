import React from 'react';
import BarGraph from '../../components/BarGraph/BarGraph';

export default class Summary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    Object.values(this.props.searchResult.keywords).forEach(value => {
      console.log(value);
    });
    return <BarGraph data={Object.values(this.props.searchResult.keywords)} />;
  }
}
