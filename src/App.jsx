import React from 'react';
import logo from './logo.svg';
import Summary from './containers/Summary';
import Button from './components/Button';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Summary />
        <Button text="Yes"/>
      </div>
    );
  }
}

export default App;
