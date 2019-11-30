import React from 'react';
import * as d3 from 'd3';
import styles from './BarGraph.module.scss';

class BarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rankings: props.ranks };
  }

  componentDidMount() {
    // this.drawChart();
  }

  drawChart() {
    let data = this.props.data;

    const w = 700,
      h = 300;

    const svg = d3
      .select('body')
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 70)
      .attr('y', (d, i) => d * 10)
      .attr('width', 65)
      .attr('height', (d, i) => h - d * 10)
      .attr('fill', 'green');
  }

  render() {
    return (
      <svg id='keyword-chart' className={styles.chart}>
        {this.drawChart()}
      </svg>
    );
  }
}

export default BarGraph;
