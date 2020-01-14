import React from 'react';

import { useTheme } from '@material-ui/core/styles';

export default function MapMarker(props) {
  const theme = useTheme();

  const markerStyle = {
    width: '5px',
    height: '5px',
    backgroundColor: 'none',
    borderRadius: '50%',
    display: 'inline-block',
    border: `2px solid ${theme.palette.secondary.main}`
  };

  return <div lat={props.lat} lng={props.lng} style={markerStyle} />;
}
