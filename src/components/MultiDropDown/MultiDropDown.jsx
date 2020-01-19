import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

import './MultiDropDown.scss';

const classes = {
  formControl: {
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  }
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export default function MultiDropDown(props) {
  const id = `dropdown_${props.id}`;
  return (
    <div className='select'>
      <FormControl className='select'>
        <InputLabel htmlFor={id}>{props.label}</InputLabel>
        <Select
          id={id}
          onChange={props.callback}
          value={props.link}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          multiple
          MenuProps={MenuProps}
        >
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
