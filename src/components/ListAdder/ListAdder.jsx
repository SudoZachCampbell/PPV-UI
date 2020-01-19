import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'

import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import FormTextField from '../FormTextField/FormTextField';

export default function ListAdder(props) {
  const [inputs, setInputs] = useState(props.value);
  const [currentInput, setCurrentInput] = useState('');

  const addInputToList = () => {
    if (currentInput && !inputs[currentInput.toLowerCase()]) {
      const newInputList = {...inputs, [currentInput.toLowerCase()]: currentInput.toLowerCase()};
      setInputs(newInputList);
    }
  };

  const removeInputFromList = (key) => {
    delete inputs[key];
    setInputs({...inputs});
  }

  const inputTextChange = e => {
    setCurrentInput(e.target.value);
  };

  useEffect(() => {
    setCurrentInput('');
    props.callback(inputs);
  }, [inputs]);

  return (
    <div>
      <FormTextField
        id={props.id}
        label='Keywords'
        value={currentInput}
        callbacks={{ onChange: inputTextChange, onBlur: () => { } }}
      />
      <Button variant='outlined' color='primary' onClick={addInputToList}>
        Add
      </Button>
      <List>
        {_.map(inputs, (value, key) => (
          <ListItem key={key}>
            <ListItemIcon>
              <IconButton onClick={() => {return removeInputFromList(key)}}>
                <RemoveCircleOutlineIcon color='error' />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary={<Typography color='textPrimary'>{value}</Typography>} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
