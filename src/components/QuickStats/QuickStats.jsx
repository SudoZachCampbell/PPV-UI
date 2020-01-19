import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';

import getProperty from '../../api/ppv-service';

export default function QuickStats(props) {
  const [count, setCount] = useState('');

  useEffect(() => {
    if (props.toggled === 0) {
      setCount('');
      getProperty.getPropertyCount(props.query).then(data => {
        let dataObject = JSON.parse(data);
        if (Object.entries(dataObject.propertyCount).length !== 0) {
          setCount(dataObject.propertyCount);
        } else {
          setCount('empty');
        }
      });
    }
  }, [props.toggled, props.term, props.query]);

  return (
    <Typography color='textPrimary' variant='h5'>
      {!count
        ? 'Loading Number of Properties...'
        : count === 'empty'
        ? 'No Properties Found'
        : count}
    </Typography>
  );
}
