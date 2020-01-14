import React, { useState, useEffect } from 'react';

import BarGraph from '../BarGraph/BarGraph';
import AreaGraph from '../AreaGraph/AreaGraph';
import Chart from '../Chart/Chart'

import { Typography } from '@material-ui/core';

export default function SearchStats(props) {
  const [keywords, setKeywords] = useState({});

  return (
    <div>
      <div>
        <BarGraph data={props.result.keywords} x='keyword' y='count' />
      </div>
      <div>
        <AreaGraph data={props.result.priceCounts} x='price' y='count' />
      </div>
    </div>
  );
}
