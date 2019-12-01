import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import './MultiDropDown.scss';

export default function MultiDropDown(props) {
  const id = `dropdown_${props.label.toLowerCase()}`;

  return (
    <div className='select'>
      <FormControl className='select'>
        <InputLabel htmlFor={id}>{props.label}</InputLabel>
        <Select id={id} onChange={props.callback} value={props.link} multiple>
          {/* <MenuItem key='none' value={''}>
            <em>None</em>
          </MenuItem> */}
          {props.values.map(item => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
