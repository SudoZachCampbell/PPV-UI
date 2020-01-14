import React, {useState, useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import _ from 'lodash';

import Paper from '@material-ui/core/Paper';

import MapMarker from '../MapMarker/MapMarker';

export default function ResultMap(props) {
  return (
    <Paper width='300px' height='300px'>
      <GoogleMapReact
        id='google-map'
        bootstrapURLKeys={{ key: 'AIzaSyCQLI34B1kJnIeAFKrcbzzJfqhwcfLBCK8' }}
        center={{
            lat: props.result.location.lat,
            lng: props.result.location.lng
          }}
        //zoom={zoom}
        //   onZoomAnimationStart={mapChanged}
      >
        {/* {_.map(props.result.searchResult, value => {
          return <MapMarker lat={value.lat} lng={value.lng} />;
        })} */}
      </GoogleMapReact>
    </Paper>
  );
}
