import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';

import getProperty from '../../api/ppv-service';

export default function QuickStats(props) {
  const [count, setCount] = useState('');

  useEffect(() => {
    if (props.toggled === 0 && !props.areaFocused) {
      setCount('');
      console.log(`Toggled: ${props.toggled}, Area: ${props.areaFocused}`);
      getProperty.getPropertyCount(props.query).then(data => {
        let dataObject = JSON.parse(data);
        if (Object.entries(dataObject.propertyCount).length !== 0) {
          setCount(dataObject.propertyCount);
        } else {
          setCount('empty');
        }
      });
    }
  }, [props.toggled, props.areaChanged, props.query]);

  return (
    <Typography variant='h5'>
      {!count
        ? 'Loading Number of Properties...'
        : count === 'empty'
        ? 'No Properties Found'
        : count}
    </Typography>
  );
}
