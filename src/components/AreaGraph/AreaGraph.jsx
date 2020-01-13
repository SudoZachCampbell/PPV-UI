import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function BarGraph(props) {
  const [data, setData] = useState({});

  useEffect(() => {
    setData(() => {
      const r = /^£\d+/;
      const graphData = _.orderBy(_.reduce(
        props.data,
        (accum, value, key) => {
          accum.push({
            rent: key.match(r)[0].replace('£', ''),
            [props.x]: key,
            [props.y]: value
          });
          return accum;
        },
        []
      ), o => new Number(o.rent) ).map(value => {
        delete value['rent'];
        return value;
      });
      console.log(graphData);
      return graphData;
    });
  }, [props.data]);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey={props.x} />
          <YAxis />
          <Tooltip />
          <Area
            type='monotone'
            dataKey={props.y}
            stroke='#8884d8'
            fill='#8884d8'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
