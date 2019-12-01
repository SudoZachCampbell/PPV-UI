import React, { useState, useEffect } from 'react';

import GoogleMapReact from 'google-map-react';

import Slider from '@material-ui/core/Slider';

import './GoogleMap.scss';

export default function GoogleMap(props) {

  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [zoom, setZoom] = useState(11);

  useEffect(() => {
    if (!props.lat || !props.long) {
      navigator.geolocation.getCurrentPosition(position => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    } else {
      setLat(props.lat);
      setLong(props.long);
    }
  }, [props.lat, props.long]);

  const metersPerPx = 156543.03392 * Math.cos(lat * Math.PI / 180) / Math.pow(2, zoom)

  const rangeCalc = (props.range * 1609.344) / metersPerPx

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

  const mapChanged = ({ center, zoom, bounds, marginBounds }) => {
      setZoom(zoom);
  }

  return (
    <div className='map'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCQLI34B1kJnIeAFKrcbzzJfqhwcfLBCK8' }}
        center={{ lat: lat, lng: long }}
        zoom={11}
        onChange={mapChanged}
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
