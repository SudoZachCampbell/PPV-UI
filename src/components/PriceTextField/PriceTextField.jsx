import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import './PriceTextField.scss';

export default function PriceTextField(props) {

    const id = `ptf_${props.label.toLowerCase().replace(/\s/g, "")}`;

  return (
    <FormControl>
      <TextField
        id={id}
        label={props.label}
        onChange={props.callback}
        type='number'
        className='text-field'
        value={props.value}
        InputProps={{
          startAdornment: <InputAdornment position='start'>£</InputAdornment>
        }}
      />
    </FormControl>
  );
}
