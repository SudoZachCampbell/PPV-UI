import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

export default function HorizontalSlider(props) {
  const id = `hslider_${props.label.toLowerCase().replace(/\s/g, '')}`;

  return (
    <div className='slider'>
      <Typography id='discrete-slider' gutterBottom>
        {props.label}
      </Typography>
      <Slider
        id={id}
        value={props.value}
        onChange={props.callback}
        aria-labelledby='discrete-slider'
        valueLabelDisplay='auto'
        step={props.form[2]}
        marks
        min={props.form[0]}
        max={props.form[1]}
      />
    </div>
  );
}
