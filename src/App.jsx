import React from 'react';
import logo from './logo.svg';
import Summary from './containers/Summary';
import Search from './containers/Search';
import ComponentButton from './components/ComponentButton';
import Keywords from './containers/Keywords';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { area: '', result: {} }
    this.textChange = this.textChange.bind(this);
    this.searchToggle = this.searchToggle.bind(this);
    this.searchResult = this.searchResult.bind(this);
  }

  textChange = (e) => {
    this.setState({ area: e.target.value })
  }

  searchToggle = () => {
    // let area = ''
    // if (this.state.area) {
    //   area = this.state.area
    // }
    // if (Object.entries(this.state.result).length === 0) {
    //   return (
    //     <div>
    //       <input value={area} onChange={this.textChange} placeholder="Belfast" />
    //       <ComponentButton buttonText="Search">
    //         <Search area={this.state.area} callback={this.searchResult} />
    //       </ComponentButton>
    //     </div>
    //   )
    // } else {
    //   return (
    //     <div>
    //       <Keywords keywords={this.state.result.keywords} />
    //     </div>
    //   )
    // }
  }

  searchResult = (result) => {
    this.setState({ result: result })
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
          <Search area={this.state.area} callback={this.searchResult} />
        </ComponentButton>
        <p>{JSON.stringify(this.state.result)}</p>
      </div >
    );
  }
}

export default App;
