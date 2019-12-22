import React from 'react';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function ToggleSwitch(props) {
    const id = `toggleswitch_${props.label.toLowerCase().replace(/\s/g, "")}`;

  return (
    <FormControlLabel
      id={id}
      control={<Switch checked={props.value} onChange={props.callback} color='primary' />}
      label={props.label}
      labelPlacement='start'
    />
  );
}
