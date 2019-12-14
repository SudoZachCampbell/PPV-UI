import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import './FormTextField.scss';

export default function FormTextField(props) {
  const id = `search_${props.label.toLowerCase().replace(/\s/g, '')}`;

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
      />
    </FormControl>
  );
}
