import React, { useState, useEffect } from 'react';

import getProperty from '../../api/get-property';

export default function QuickStats(props) {
  const [count, setCount] = useState('');

  useEffect(() => {
    if (props.toggled === 0 && !props.areaFocused) {
      console.log(`Toggled: ${props.toggled}, Area: ${props.areaFocused}`);
      getProperty.getPropertyCount(props.query).then(data => {
        let dataObject = JSON.parse(data);
        if (dataObject.propertyCount) {
          setCount(dataObject.propertyCount);
        } else {
          setCount('empty');
        }
      });
    }
  }, [props.toggled, props.areaChanged]);

  return !count ? (
    <h1>Loading Number of Properties...</h1>
  ) : count === 'empty' ? (
    <h1>No Properties Found</h1>
  ) : (
    <h1>{count}</h1>
  );
}
