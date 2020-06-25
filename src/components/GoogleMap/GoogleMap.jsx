import React, { useState, useEffect } from 'react';

import GoogleMapReact from 'google-map-react';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import { useTheme } from '@material-ui/core/styles';

import './GoogleMap.scss';

export default function GoogleMap(props) {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [zoom, setZoom] = useState(11);
  const [clickedZoom, setClickedZoom] = useState(true);

  const theme = useTheme();

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

  const metersPerPx =
    (156543.03392 * Math.cos((lat * Math.PI) / 180)) / Math.pow(2, zoom);

  const rangeCalc = (props.range * 1609.344) / metersPerPx;

  const mapStyle = {
    width: `${2*rangeCalc}px`,
    height: `${2*rangeCalc}px`,
    marginLeft: `${-rangeCalc}px`,
    marginTop: `${-rangeCalc}px`,
    transition: clickedZoom ? 'all 0.4s' : 'all 1s',
    backgroundColor: 'none',
    borderRadius: '50%',
    display: 'inline-block',
    border: `2px solid ${theme.palette.secondary.main}`
  };

  // const classes = useStyles();

  //   const RangeCircle = ({ text }) => (
  //   );

  const mapChanged = zoom => {
    setClickedZoom(true);
    setZoom(zoom);
  };

  return (
    <Paper className='map'>
      <GoogleMapReact
        id='google-map'
        bootstrapURLKeys={{ key: '' }}
        center={{ lat: lat, lng: long }}
        zoom={zoom}
        onZoomAnimationStart={mapChanged}
      >
        <div lat={lat} lng={long} style={mapStyle} />
      </GoogleMapReact>
      <Typography id='vertical-slider' gutterBottom>
        Range
      </Typography>
      <Slider
        id='map_slider'
        onChange={(event, value) => {
          setClickedZoom(false);
          props.callback(event, value);
        }}
        color='secondary'
        defaultValue={props.range}
        min={0.25}
        max={25}
        step={null}
        marks={props.steps}
        aria-labelledby='vertical-slider'
        valueLabelDisplay='auto'
      />
    </Paper>
  );
}
