import React, { useState, Fragment, Suspense } from 'react';
import _ from 'lodash';

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@material-ui/core/Typography';

import FilterToggle from '../../components/FilterToggle/FilterToggle';
import FormTextField from '../../components/FormTextField/FormTextField';
import GoogleMap from '../../components/GoogleMap/GoogleMap';
import HorizontalSlider from '../../components/HorizontalSlider/HorizontalSlider';
import HouseStyleSelect from '../../components/HouseStyleSelect/HouseStyleSelect';
import ListAdder from '../../components/ListAdder/ListAdder';
import MultiDropDown from '../../components/MultiDropDown/MultiDropDown';
import PriceTextField from '../../components/PriceTextField/PriceTextField';
import QuickStats from '../../components/QuickStats/QuickStats';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';

import geocoder from '../../api/geocoder';

import './Search.scss';

const filters = {
  term: false,
  sta: false,
  stygrp: false,
  keywords: false,
  ft: false,
  bedrooms: false,
  min: false,
  max: false,
  student: false,
  excludePoa: false
};

export default function Search(props) {
  const [term, setArea] = useState('Banbridge');
  const [sta, setRentTypes] = useState(['toLet', 'letAgreed', 'let']);
  const [stygrp, setHouseStyle] = useState(['2']);
  const [keywords, setKeywords] = useState(['kitchen', 'bathroom']);
  const [ft, setFurnished] = useState([
    'fullyFurnished',
    'optional',
    'unfurnished'
  ]);
  const [minbeds, setMinBeds] = useState(1);
  const [maxbeds, setMaxBeds] = useState(6);
  const [min, setMinPrice] = useState(100);
  const [max, setMaxPrice] = useState(1000);
  const [student, setStudent] = useState(false);
  const [excludePoa, setExpoa] = useState(false);
  const [radius, setRadius] = useState(5);
  const [position, setPosition] = useState([0, 0]);

  const [areaFocusedBool, setAreaFocusedBool] = useState(false);
  const [toggledCount, setToggledCount] = useState(0);

  const [checkedFilters, setCheckedFilters] = useState(filters);

  const steps = [
    {
      value: 0.25
    },
    {
      value: 0.5
    },
    {
      value: 0.75
    },
    {
      value: 1
    },
    {
      value: 2
    },
    {
      value: 3
    },
    {
      value: 4
    },
    {
      value: 5
    },
    {
      value: 10
    },
    {
      value: 15
    },
    {
      value: 20
    },
    {
      value: 25
    }
  ];

  const furnishedOptions = [
    {
      value: 'unfurnished',
      label: 'Unfurnished'
    },
    {
      value: 'fullyFurnished',
      label: 'Fully Furnished'
    },
    {
      value: 'partlyFurnished',
      label: 'Partly Furnished'
    },
    {
      value: 'optional',
      label: 'Optional'
    }
  ];

  const rentTypeOptions = [
    {
      value: 'toLet',
      label: 'To Let'
    },
    {
      value: 'let',
      label: 'Let'
    },
    {
      value: 'letAgreed',
      label: 'Let Agreed'
    }
  ];
  const areaChanged = e => {
    setArea(e.target.value);
  };

  const rentTypeChanged = e => {
    setRentTypes(e.target.value);
  };

  const keywordListUpdate = keywordList => {
    setKeywords(keywordList);
  };

  const studentChanged = e => {
    setStudent(e.target.checked);
  };

  const furnishedChanged = e => {
    setFurnished(e.target.value);
  };

  const expoaChanged = e => {
    setExpoa(e.target.checked);
  };

  const minPriceChanged = e => {
    setMinPrice(e.target.value);
  };

  const maxPriceChanged = e => {
    setMaxPrice(e.target.value);
  };

  const bedsChanged = (e, newValue) => {
    setMinBeds(newValue[0]);
    setMaxBeds(newValue[1]);
  };

  const rangeChanged = (e, newValue) => {
    setRadius(newValue);
  };

  const styleChanged = styleList => {
    setHouseStyle(styleList);
  };

  const areaFocused = e => {
    if (e.target.value) {
      geocoder.getLLByArea(e.target.value).then(data => {
        if (!_.isEmpty(data.results)) {
          const location = data.results[0].geometry.location;
          setPosition([location.lat, location.lng]);
        }
      });
    }
    setAreaFocusedBool(true);
  };

  const areaUnfocused = e => {
    if (e.target.value) {
      geocoder.getLLByArea(e.target.value).then(data => {
        if (!_.isEmpty(data.results)) {
          const location = data.results[0].geometry.location;
          setPosition([location.lat, location.lng]);
        }
      });
    }
  };

  const toggleCounter = increment => {
    let currentCount = toggledCount + increment;
    setToggledCount(currentCount);
    // setCheckedFilters(() => {
    //   return { ...checkedFilters, [key]: !checkedFilters[key] };
    // });
  };

  const toggleCheckbox = (id, apply) => {
    const keys = id.split('_');
    let newFilters = { ...checkedFilters };
    keys.forEach(key => {
      newFilters[key] = apply;
    });
    setCheckedFilters(() => {
      return newFilters;
    });
  };
  const searchParams = {
    st: 'rent',
    currency: 'GBP',
    runit: 'm',
    pt: 'residential'
  };

  const valueStore = {
    sta: sta,
    min: min,
    max: max,
    minbeds: minbeds,
    maxbeds: maxbeds,
    term: term,
    radius: radius,
    excludePoa: excludePoa,
    stygrp: stygrp,
    ft: ft,
    keywords: keywords
  };

  _.forEach(checkedFilters, (value, key) => {
    if (value) searchParams[key] = valueStore[key];
  });

  const tracking = {
    areaFocusedBool,
    toggledCount
  };

  if (student) searchParams.excatt = 20;

  const searchStarted = () => {
    props.executeSearch(term, searchParams);
  };

  return (
    <div id='search_container'>
      <div id='search_top'>
        <ClickAwayListener onClickAway={() => setAreaFocusedBool(false)}>
          <div>
            <div>
              <FormTextField
                label='Area'
                value={term}
                callbacks={{
                  onChange: areaChanged,
                  onFocus: areaFocused,
                  onBlur: areaUnfocused
                }}
              />
            </div>
            {areaFocusedBool && (
              <GoogleMap
                range={radius}
                steps={steps}
                lat={position[0]}
                long={position[1]}
                callback={rangeChanged}
                value={radius}
              />
            )}
          </div>
        </ClickAwayListener>
      </div>
      <div id='search_filtersbar'>
        <FilterToggle id='sta' callback={{ toggleCounter, toggleCheckbox }}>
          <MultiDropDown
            label='Rent Type'
            values={rentTypeOptions}
            link={sta}
            callback={rentTypeChanged}
          />
        </FilterToggle>
        <FilterToggle
          id='min_max'
          callback={{ toggleCounter, toggleCheckbox }}
          divClass='price-container'
        >
          <Fragment label='Price'>
            <Typography label='Price' id='discrete-slider'>
              Price
            </Typography>
            <div>
              <PriceTextField
                label='Min'
                value={min}
                callback={minPriceChanged}
              />
              <PriceTextField
                label='Max'
                value={max}
                callback={maxPriceChanged}
              />
            </div>
          </Fragment>
        </FilterToggle>
        <FilterToggle callback={{ toggleCounter, toggleCheckbox }}>
          <HouseStyleSelect
            label='House Style'
            preselected={stygrp}
            callback={styleChanged}
          />
        </FilterToggle>
        <FilterToggle callback={{ toggleCounter, toggleCheckbox }}>
          <HorizontalSlider
            label='Bedrooms'
            value={[minbeds, maxbeds]}
            form={[1, 6, 1]}
            callback={bedsChanged}
          />
        </FilterToggle>
        <FilterToggle callback={{ toggleCounter, toggleCheckbox }}>
          <MultiDropDown
            label='Furnished'
            values={furnishedOptions}
            link={ft}
            callback={furnishedChanged}
          />
        </FilterToggle>
        <FilterToggle callback={{ toggleCounter, toggleCheckbox }}>
          <ListAdder
            id='app_keywordinput'
            label='Keywords'
            callback={keywordListUpdate}
            value={keywords}
          />
        </FilterToggle>
        <FilterToggle callback={{ toggleCounter, toggleCheckbox }}>
          <Fragment label='Toggles'>
            <ToggleSwitch
              label='Student'
              value={student}
              callback={studentChanged}
            />
            <ToggleSwitch
              label='Exclude POA'
              value={excludePoa}
              callback={expoaChanged}
            />
          </Fragment>
        </FilterToggle>
        <div>
          {toggledCount === 0 && (
            // <Suspense fallback={<h1>Loading...</h1>}>
            <>
              <QuickStats
                toggled={toggledCount}
                areaFocused={areaFocusedBool}
                query={searchParams}
              />
            </>
          )}
        </div>
      </div>
      <div id='search_bottom'>
        <div>
          <div>
            <Button variant='contained' color='primary' onClick={searchStarted}>
              Search
            </Button>
          </div>
          <div>
            <p>{JSON.stringify(searchParams)}</p>
          </div>
          <div>
            <p>{JSON.stringify(tracking)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
