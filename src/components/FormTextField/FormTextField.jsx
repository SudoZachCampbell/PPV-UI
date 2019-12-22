import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import './FormTextField.scss';

const useStyles = makeStyles({
  areaBox: {

  },

  areaText: {
    fontSize: '50px',
    fontFamily: 'segoe ui'
  },

  areaLabel: {
    fontSize: '30px',
    fontFamily: 'segoe ui'

  }
});

export default function FormTextField(props) {
  const id = `search_${props.label.toLowerCase().replace(/\s/g, '')}`;
  const classes = useStyles();

  return (
    <FormControl>
      <TextField
        required
        id={id}
        label={props.label}
        onChange={props.callbacks.onChange}
        onFocus={props.callbacks.onFocus}
        onBlur={props.callbacks.onBlur}
        className='text-field'
        value={props.value}
        margin='normal'
        InputProps={{
          className: classes.areaText
        }}
        InputLabelProps={{
          className: classes.areaLabel
        }}
      />
    </FormControl>
  );
}
