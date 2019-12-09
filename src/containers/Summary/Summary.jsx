import React from 'react';
import PropertyListItem from '../../components/PropertyListItem/PropertyListItem';
import _ from 'lodash';

import './Summary.scss';

export default function Summary(props) {
  let i = 1;
  return (
    <div className='list'>
      {_.map(props.searchResult.searchResult, (value, key) => {
        return <PropertyListItem key={i} property={value} />;
        i++;
      })}
    </div>
  );
}
