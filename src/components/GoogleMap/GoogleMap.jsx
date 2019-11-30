import React, { useState, useEffect } from 'react';

import GoogleMapReact from 'google-map-react';
import useAxios from 'axios-hooks';

import Slider from '@material-ui/core/Slider';

export default function GoogleMap(props) {
  //   const [{ data, loading, error }, refetch] = useAxios(
  //     'https://api.myjson.com/bins/820fc'
  //   );

  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  const rangeCalc = props.range * 10;

  const mapStyle = {
    width: `${rangeCalc}px`,
    height: `${rangeCalc}px`,
    marginLeft: -rangeCalc / 2 + 'px',
    marginTop: -rangeCalc / 2 + 'px',
    transition: 'all 2s'
  };

  const RangeCircle = ({ text }) => (
    <div className='radius-range' style={mapStyle}></div>
  );

  useEffect(() => {
    if (!props.lat || !props.long) {
      navigator.geolocation.getCurrentPosition(position => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    } else {
      console.log(props.lat + ' ' + props.long);
      setLat(props.lat);
      setLong(props.long);
    }
  }, [props.lat, props.long]);

  return (
    <div className='map'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCQLI34B1kJnIeAFKrcbzzJfqhwcfLBCK8' }}
        center={{ lat: lat, lng: long }}
        zoom={11}
      >
        <RangeCircle lat={lat} lng={long} text='My Marker' />
      </GoogleMapReact>
      <Slider
        orientation='vertical'
        onChange={props.callback}
        defaultValue={5}
        min={0.25}
        max={25}
        step={null}
        marks={props.steps}
        valueLabelDisplay='auto'
      />
    </div>
  );
}
