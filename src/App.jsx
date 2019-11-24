import React from 'react';
import logo from './logo.svg';
import Summary from './containers/Summary';
import Search from './containers/Search';
import ComponentButton from './components/ComponentButton';
import Keywords from './containers/Keywords';
import ListAdded from './components/ListAdder'
import './App.scss';
import ListAdder from './components/ListAdder';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { area: '', result: {}, keywords: [] }
    this.textChange = this.textChange.bind(this);
    this.searchToggle = this.searchToggle.bind(this);
    this.searchResult = this.searchResult.bind(this);
    this.keywordListUpdate = this.keywordListUpdate.bind(this);
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

  keywordListUpdate = (keywordList) => {
    this.setState({ keywords: keywordList});
  }

  render() {
    let area = ''
    if (this.state.area) {
      area = this.state.area
    }
    return (
      <div className="App">
        <label htmlFor='app_areainput'>Area: </label>
        <input id='app_areainput' value={area} onChange={this.textChange} placeholder="Belfast" />
        <br />
        <ListAdder id="app_keywordinput" label="Keywords: " callback={this.keywordListUpdate} />
        <ComponentButton buttonText="Search">
          <Search area={this.state.area} keywords={this.state.keywords} callback={this.searchResult} />
        </ComponentButton>
        <p>{JSON.stringify(this.state.result)}</p>
      </div >
    );
  }
}

export default App;
