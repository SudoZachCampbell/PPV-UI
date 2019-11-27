import React, { setState } from 'react';
import TextField from '@material-ui/core/TextField';

export default function ListAdder(props) {
  const [inputs, setInputs] = setState([]);
  const [currentInput, setCurrentInput] = setState('');

  const addInputToList = () => {
    if (this.state.currentInput) {
      const newInputList = [...this.state.inputs, this.state.currentInput];
      this.setState({ inputs: newInputList, currentInput: '' }, () => {
        this.props.callback(this.state.inputs);
      });
    }
  };

  const inputTextChange = e => {
    this.setState({ currentInput: e.target.value });
  };

  return (
    <div>
      <TextField
        id={props.id}
        onChange={inputTextChange}
        value={currentInput}
      />
      <button onClick={addInputToList}>Add</button>
      <ul>
        {inputs.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
}
