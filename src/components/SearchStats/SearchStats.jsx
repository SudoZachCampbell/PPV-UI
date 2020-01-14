import React from 'react';

import BarGraph from '../BarGraph/BarGraph';
import AreaGraph from '../AreaGraph/AreaGraph';

export default function SearchStats(props) {
  return (
    <div>
      <div>
        {props.result.keywords && <BarGraph data={props.result.keywords} x='keyword' y='count' />}
      </div>
      <div>
        <AreaGraph data={props.result.priceCounts} x='price' y='count' />
      </div>
    </div>
  );
}
