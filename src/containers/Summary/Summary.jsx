import React from 'react';
import PropertyListItem from '../../components/PropertyListItem/PropertyListItem';
import _ from 'lodash';

import './Summary.scss';

export default function Summary(props) {
  let i = 0;
  return (
    <div className='list'>
      {_.map(props.searchResult.searchResult, (value, key) => {
        i++;
        return <PropertyListItem key={i} id={i} property={value} />;
      })}
    </div>
  );
}
