import React from 'react';
import logo from './logo.svg';
import PropertyList from './containers/PropertyList';
import Button from './components/Button';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <PropertyList name="Jimmy" />
        <Button text="Yes"/>
      </div>
    );
  }
}

export default App;
