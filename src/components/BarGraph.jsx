import React from 'react';
import * as d3 from 'd3';
import styles from './BarGraph.module.scss';

class BarGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rankings: props.ranks }
    }

    componentDidMount() {
        this.drawChart()
    }

    drawChart() {
        var data = this.props.data;

        var width = 420,
            barHeight = 20;

        var x = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, width]);

        var chart = d3.select("#keyword-chart")
            .attr("width", width)
            .attr("height", barHeight * data.length);

        var bar = chart.selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function (d, i) { return "translate(0," + i * barHeight + ")"; });

        bar.append("rect")
            .attr("width", x)
            .attr("height", barHeight - 1);

        bar.append("text")
            .attr("x", function (d) { return x(d) - 3; })
            .attr("y", barHeight / 2)
            .attr("dy", ".35em")
            .text(function (d) { return d; });
    }

    render() {
        return (
            <svg id="keyword-chart" className={styles.chart}>
                {this.drawChart()}
            </svg>
        );
    }
};

export default BarGraph;