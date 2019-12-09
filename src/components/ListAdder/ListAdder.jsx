import React, { useState, useEffect } from 'react';
import '../FormTextField/FormTextField'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import FormTextField from '../FormTextField/FormTextField';

export default function ListAdder(props) {
  const [inputs, setInputs] = useState(props.value);
  const [currentInput, setCurrentInput] = useState('');

  const addInputToList = () => {
    if (currentInput && !inputs.includes(currentInput.toLowerCase())) {
      const newInputList = [...inputs, currentInput.toLowerCase()];
      setInputs(newInputList);
      setCurrentInput('');
    }
  };

  const inputTextChange = e => {
    setCurrentInput(e.target.value);
  };

  useEffect(() => {
    props.callback(inputs);
  }, [inputs]);

  return (
    <div>
      <FormTextField
        id={props.id}
        label='Keywords'
        value={currentInput}
        callbacks={{ onChange: inputTextChange, onBlur: () => {} }}
      />
      <Button variant='outlined' color='primary' onClick={addInputToList}>
        Add
      </Button>
      <List>
        {inputs.map((value, index) => (
          <ListItem key={index}>
            <ListItemText primary={value} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
