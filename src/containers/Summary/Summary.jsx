import React, { useState } from 'react';
import PropertyList from '../../components/PropertyList/PropertyList';
import _ from 'lodash';

import './Summary.scss';

export default function Summary(props) {
  const [subPage, setSubPage] = useState(0);
  const [focusedProperty, setFocusedProperty] = useState('');

  const changePage = (page, propertyId) => {
    setFocusedProperty(propertyId);
    setSubPage(page);
  };

  let view = '';

  switch (subPage) {
    case 0:
      view = (
        <PropertyList result={props.searchResult.searchResult} />
      );
      break;
    default:
      break;
  }

  let i = 0;
  return (
    <div className='list'>
      {view}
    </div>
  );
}
