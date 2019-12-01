import React from 'react';
import BarGraph from '../../components/BarGraph/BarGraph';

export default function Summary(props) {

  console.log(props.searchResult);

    return <BarGraph data={Object.values(props.searchResult.keywords)} />;
}