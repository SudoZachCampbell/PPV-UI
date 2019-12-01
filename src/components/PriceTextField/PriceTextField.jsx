import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';


export default function PriceTextField(props) {

    const id = `ptf_${props.label.toLowerCase()}`;

  return (
    <FormControl>
      <TextField
        id={id}
        label={props.label}
        onChange={props.callback}
        type='number'
        margin='normal'
        className='text-field'
        InputProps={{
          startAdornment: <InputAdornment position='start'>£</InputAdornment>
        }}
      />
    </FormControl>
  );
}
