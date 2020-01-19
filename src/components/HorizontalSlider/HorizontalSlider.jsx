import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  slider: {
    width: '100%'
  }
});

export default function HorizontalSlider(props) {
  const id = `hslider_${props.id}`;
  const classes = useStyles();

  const marks = [];

  for (let i = props.form[0]; i <= props.form[1]; i += props.form[2]) {
    let hold = {
      value: i,
      label: i
    };
    marks.push(hold);
  }

  return (
    <div style={{width:500}} className={classes.slider}>
      <Typography id='discrete-slider' gutterBottom>
        {props.label}
      </Typography>
      <Slider
        id={id}
        value={props.value}
        onChange={props.callback}
        aria-labelledby='discrete-slider'
        valueLabelDisplay='auto'
        className={classes.slider}
        step={props.form[2]}
        marks={marks}
        min={props.form[0]}
        max={props.form[1]}
      />
    </div>
  );
}
