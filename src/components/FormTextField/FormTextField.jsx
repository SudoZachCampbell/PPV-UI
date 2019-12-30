import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import './FormTextField.scss';

const useStyles = makeStyles({
  headerBox: {},

  headerText: {
    fontSize: '50px',
    fontFamily: 'segoe ui'
  },

  headerLabel: {
    fontSize: '30px',
    fontFamily: 'segoe ui'
  },
  normalBox: {},

  normalText: {
    fontSize: '20px',
    fontFamily: 'segoe ui'
  },
  normalLabel: {
    fontSize: '15px',
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
        value={props.value}
        margin='normal'
        InputProps={{
          className: classes[`${props.type ? props.type : 'normal'}Text`]
        }}
        InputLabelProps={{
          className: classes[`${props.type ? props.type : 'normal'}Label`]
        }}
      />
    </FormControl>
  );
}
