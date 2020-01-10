import React, { useState } from 'react';
import _ from 'lodash';

import PropertyListItem from '../../components/PropertyListItem/PropertyListItem';
import PropertyDetails from '../../components/PropertyDetails/PropertyDetails';

import Box from '@material-ui/core/Box'

import './PropertyList.scss';

export default function PropertyList(props) {
  const [page, setPage] = useState(0);
  const [propertyId, setPropertyId] = useState(-1);
  let i = 0;

  const changePage = (newPage, newPropertyId) => {
    setPropertyId(newPropertyId);
    setPage(newPage);
  };

  let view = '';

  switch (page) {
    case 0:
      view = _.map(props.result, (value, key) => {
        i++;
        return (
          <PropertyListItem
            key={i}
            id={i}
            property={value}
            callback={changePage}
          />
        );
      });
      break;
    case 1:
      view = (
        <PropertyDetails
          property={props.result[propertyId]}
          callback={changePage}
        />
      );
      break;
    default:
      break;
  }

  return <Box width='100%'>{view}</Box>;
}
