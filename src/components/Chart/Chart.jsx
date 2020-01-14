import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import CanvasJSReact from '../../canvasjs.react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Chart(props) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const r = /^£\d+/;
    const graphData = _.orderBy(
      _.reduce(
        props.data,
        (accum, value, key) => {
          accum.push({
            rent: key.match(r)[0].replace('£', ''),
            x: key,
            y: value
          });
          return accum;
        },
        []
      ),
      o => new Number(o.rent)
    ).map(value => {
      delete value['rent'];
      return value;
    });

    setChartData(() => {
      return {
        animationEnabled: true,
        exportEnabled: true,
        theme: 'light2', //"light1", "dark1", "dark2"
        title: {
          text: 'Simple Column Chart with Index Labels'
        },
        data: [
          {
            type: 'column', //change type to bar, line, area, pie, etc
            //indexLabel: "{y}", //Shows y value on all Data Points
            indexLabelFontColor: '#5A5757',
            indexLabelPlacement: 'outside',
            dataPoints: graphData
          }
        ]
      };
    });
  }, [props.data]);

  return (
    <div>
      {console.log('Graph State Data: ', chartData)}
      <CanvasJSChart options={chartData} />
    </div>
  );
}
