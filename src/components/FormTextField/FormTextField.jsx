import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

export default function FormTextField(props) {

    const id = `search_${props.label.toLowerCase().replace(/\s/g, "")}`

    return(
        <FormControl className='area-control'>
        <TextField
          required
          id={id}
          label={props.label}
          onChange={props.callbacks.onChange}
          onBlur={props.callbacks.onBlur}
          value={props.value}
          margin='normal'
        />
      </FormControl>
    )
}