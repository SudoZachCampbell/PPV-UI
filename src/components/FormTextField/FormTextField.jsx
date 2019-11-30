import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

export default function FormTextField(props) {

    const id = `search_${props.label.toLowerCase()}`

    return(
        <FormControl className='area-control'>
        <TextField
          required
          id={id}
          label={props.label}
          onChange={props.callbacks.onChange}
          onBlur={props.callbacks.onBlur}
          margin='normal'
        />
      </FormControl>
    )
}