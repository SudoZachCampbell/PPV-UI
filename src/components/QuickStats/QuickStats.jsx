import React, { useState, useEffect } from 'react';

import getProperty from '../../api/get-property';

export default function QuickStats(props) {
  const [count, setCount] = useState('');

  useEffect(() => {
    if (props.toggled === 0 && !props.areaFocused) {
      console.log(`Toggled: ${props.toggled}, Area: ${props.areaFocused}`);
      getProperty.getPropertyCount(props.query).then(data => {
        let dataObject = JSON.parse(data);
        setCount(dataObject.propertyCount);
      });
    }
  }, [props.toggled, props.areaChanged]);

  return <h1>{count}</h1>;
}
