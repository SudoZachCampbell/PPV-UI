import React, { useState } from 'react';
import PropertyList from '../../components/PropertyList/PropertyList';

import _ from 'lodash';

import './Summary.scss';

export default function Summary(props) {
  const [subPage, setSubPage] = useState(0);

  const changePage = (page, propertyId) => {
    console.log(`Page: ${page}`);
    setSubPage(page);
  };

  let view = '';

  switch (subPage) {
    case 0:
      view = (
        <PropertyList
          result={props.searchResult.searchResult}
        />
      );
      break;
    case 1:

      break;
    default:
      break;
  }

  return <div className='list'>{view}</div>;
}
