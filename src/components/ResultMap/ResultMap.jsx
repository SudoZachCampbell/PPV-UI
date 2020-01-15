import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import _ from 'lodash';

import Box from '@material-ui/core/Box';

import MapMarker from '../MapMarker/MapMarker';

export default function ResultMap(props) {
  console.log("Map Result: ", props.result);
  return (
    <Box width='100%' height='100%'>
      <GoogleMapReact
        id='result-map'
        bootstrapURLKeys={{ key: 'AIzaSyCQLI34B1kJnIeAFKrcbzzJfqhwcfLBCK8' }}
        center={{
          lat: props.lat,
          lng: props.lng
        }}
        zoom={11}
        //   onZoomAnimationStart={mapChanged}
      >
        {_.map(props.result, value => {
          console.log(`Lat: ${value.lat}, Lng: ${value.lng}`);
          return <MapMarker lat={value.lat} lng={value.lng} />;
        })}
      </GoogleMapReact>
    </Box>
  );
}
