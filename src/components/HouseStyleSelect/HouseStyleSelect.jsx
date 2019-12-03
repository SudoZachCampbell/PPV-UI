import React from 'react';

import Button from '@material-ui/core/Button';

import icons from './icons';

const styleOptions = [
  {
    value: 3,
    label: 'Apartments',
    icon: icons.APARTMENT
  },
  {
    value: 10,
    label: 'Bungalows',
    icon: icons.BUNGALOW
  },
  {
    value: 8,
    label: 'Detached Houses',
    icon: icons.DETACHED
  },
  {
    value: 9,
    label: 'Semi-Detached',
    icon: icons.SEMI
  },
  {
    value: 6,
    label: 'Terraced Houses',
    icon: icons.TERRACED
  },
  {
    value: 7,
    label: 'Room Lets',
    icon: icons.ROOM
  },
  {
    value: 2,
    label: 'All Houses',
    icon: icons.ALL
  }
];

export default function HouseStyleSelect(props) {
  return styleOptions.map(style => {
    return (
      <>
        <Button
          variant='contained'
          color='primary'
          value={style.value}
          key={style.value}
          startIcon={style.icon}
        >
          {style.label}
        </Button>
      </>
    );
  });
}
