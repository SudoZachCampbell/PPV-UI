import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';

import _ from 'lodash';

import icons from './icons';

export default function HouseStyleSelect(props) {
  const [selected, setSelected] = useState({});

  useEffect(() => {
    const styleOptions = {
      houses: {
        10: {
          value: 10,
          label: 'Bungalows',
          icon: icons.BUNGALOW,
          toggled: false
        },
        8: {
          value: 8,
          label: 'Detached Houses',
          icon: icons.DETACHED,
          toggled: false
        },
        9: {
          value: 9,
          label: 'Semi-Detached',
          icon: icons.SEMI,
          toggled: false
        },
        6: {
          value: 6,
          label: 'Terraced Houses',
          icon: icons.TERRACED,
          toggled: false
        },
        2: {
          value: 2,
          label: 'All Houses',
          icon: icons.ALL,
          toggled: false
        }
      },
      3: {
        value: 3,
        label: 'Apartments',
        icon: icons.APARTMENT,
        toggled: false
      },
      7: {
        value: 7,
        label: 'Room Lets',
        icon: icons.ROOM,
        toggled: false
      }
    };
    setSelected(styleOptions);
  }, []);

  useEffect(() => {
    const stylesArray = _.reduce(selected, (accum, value, key) => {
      if (key === 'houses') {
        let houseArray = _.reduce(value, (innerAccum, innerValue, innerKey) => {
          if (innerValue.toggled) innerAccum.push(innerKey);
          return innerAccum;
        }, []);
        accum = accum.concat(houseArray)
      } else {
        if (value.toggled) accum.push(key);
      }
      return accum;
    }, []);
    props.callback(stylesArray);
  }, [selected]);

  const toggleButton = e => {
    const value = e.currentTarget.value;
    selected[value].toggled = !selected[value].toggled;
    setSelected({ ...selected });
  };

  const houseToggle = e => {
    const value = e.currentTarget.value;
    if (value === '2') {
      if (!selected.houses[2].toggled) {
        _.forEach(selected.houses, (value, key) => {
          selected.houses[key].toggled = false;
        });
      }
      selected.houses[value].toggled = !selected.houses[value].toggled;
    } else {
      selected.houses[2].toggled = false;
      selected.houses[value].toggled = !selected.houses[value].toggled;
    }
    setSelected({ ...selected });
  };

  return (
    <>
      <ButtonGroup
        variant='contained'
        size='large'
        aria-label='large contained secondary button group'
      >
        {_.map(selected.houses, (value, key) => {
          return (
            <Button
              value={value.value}
              color={value.toggled ? 'primary' : 'secondary'}
              key={value.value}
              onClick={houseToggle}
              startIcon={value.icon}
            >
              {value.label}
            </Button>
          );
        })}
        <Divider orientation='vertical' />
        {_.map(_.omit(selected, ['houses']), (value, key) => {
          return (
            <Button
              value={value.value}
              color={value.toggled ? 'primary' : 'secondary'}
              key={value.value}
              onClick={toggleButton}
              startIcon={value.icon}
            >
              {value.label}
            </Button>
          );
        })}
      </ButtonGroup>
      {/* <p>{JSON.stringify(selected)}</p> */}
    </>
  );
}
