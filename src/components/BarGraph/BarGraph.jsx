import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import {useTheme} from '@material-ui/core/styles'

export default function BarGraph(props) {
  const [data, setData] = useState({});

  const theme = useTheme();

  useEffect(() => {
    setData(() => {
      const bananas = _.reduce(
        props.data,
        (accum, value, key) => {
          accum.push({
            [props.x]: key,
            [props.y]: value
          });
          return accum;
        },
        []
      );
      console.log(bananas);
      return bananas;
    });
  }, [props.data]);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
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
          <Legend />
          <Bar dataKey={props.y} fill={theme.palette.primary.main} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
