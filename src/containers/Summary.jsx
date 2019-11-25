import React from "react";
import BarGraph from "../components/BarGraph";

export default class Summary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <BarGraph data={Object.values(this.props.searchResult.keywords)} />;
  }
}
