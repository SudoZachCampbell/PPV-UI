import React from 'react';
import logo from './logo.svg';
import Summary from './containers/Summary';
import Search from './containers/Search';
import ComponentButton from './components/ComponentButton';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { area: '' }
    this.textChange = this.textChange.bind(this)
  }

  textChange = (e) => {
    this.setState({ area: e.target.value })
  }

  render() {
    let area = ''
    if (this.state.area) {
      area = this.state.area
    }
    return (
      <div className="App">
        <input value={area} onChange={this.textChange} placeholder="Belfast" />
        <ComponentButton buttonText="Search">
          <Search area={this.state.area} />
        </ComponentButton>
      </div >
    );
  }
}

export default App;
