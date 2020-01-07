import React, { useState } from 'react';
import PropertyList from '../../components/PropertyList/PropertyList';
import PropertyDetails from '../../components/PropertyDetails/PropertyDetails';

import _ from 'lodash';

import './Summary.scss';

export default function Summary(props) {
  const [subPage, setSubPage] = useState(0);
  const [focusedProperty, setFocusedProperty] = useState('');

  const changePage = (page, propertyId) => {
    console.log(`Page: ${page}`);
    setFocusedProperty(propertyId);
    setSubPage(page);
  };

  let view = '';

  switch (subPage) {
    case 0:
      view = (
        <PropertyList
          result={props.searchResult.searchResult}
          callback={changePage}
        />
      );
      break;
    case 1:
      view = (
        <PropertyDetails
          property={props.searchResult.searchResult[focusedProperty]}
          callback={changePage}
        />
      );
      break;
    default:
      break;
  }

  return <div className='list'>{view}</div>;
}
