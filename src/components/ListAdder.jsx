import React from "react";

export default class ListAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputs: [], currentInput: "" };
    this.addInputToList = this.addInputToList.bind(this);
    this.inputTextChange = this.inputTextChange.bind(this);
  }

  addInputToList = () => {
    if (this.state.currentInput) {
      const newInputList = [...this.state.inputs, this.state.currentInput];
      this.setState({ inputs: newInputList, currentInput: "" }, () => {
        this.props.callback(this.state.inputs);
      });
    }
  };

  inputTextChange = e => {
    this.setState({ currentInput: e.target.value });
  };

  render() {
    return (
      <div>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input
          id={this.props.id}
          onChange={this.inputTextChange}
          value={this.state.currentInput}
        />
        <button onClick={this.addInputToList}>Add</button>
        <ul>
          {this.state.inputs.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
    );
  }
}
