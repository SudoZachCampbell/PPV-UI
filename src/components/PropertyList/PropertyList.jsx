import React from 'react';
import PropertyListItem from '../../components/PropertyListItem/PropertyListItem';
import _ from 'lodash';

import './PropertyList.scss';

export default function PropertyList(props) {
  let i = 0;

  const showDetails = propertyId => {
    props.callback(1, propertyId);
  }

  return (
    <div className='list'>
      {_.map(props.result, (value, key) => {
        i++;
        return <PropertyListItem key={i} id={i} property={value} callback={showDetails} />;
      })}
    </div>
  );
}
