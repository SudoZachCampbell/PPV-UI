import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
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
import ppvService from '../../api/ppv-service';

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
  const [area, setArea] = useState('Banbridge');
  const [term, setTerm] = useState(28);
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

  const [searchParams, setSearchParams] = useState({
    st: 'rent',
    currency: 'GBP',
    radius,
    runit: 'm',
    pt: 'residential',
    term
  });

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
      console.log(`Value: ${e.target.value}`);
      ppvService.getAreaTerm(area).then(newTerm => {
        console.log('Term: ', newTerm);
        const areaId = parseInt(newTerm.params.term[0]);
        console.log(`ID: ${areaId}`);
        if (areaId && !Number.isNaN(areaId)) {
          setTerm(areaId);
          setPosition([
            newTerm.phrase.search.geoTerm.coordinate.latitude,
            newTerm.phrase.search.geoTerm.coordinate.longitude
          ]);
        } else {
          setTerm(-1);
        }
      });
    }
    setAreaFocusedBool(false);
  };

  useEffect(() => {
    if (term !== -1) {
      geocoder.getLLByArea(area).then(data => {
        if (!_.isEmpty(data.results)) {
          const location = data.results[0].geometry.location;
          setPosition([location.lat, location.lng]);
        }
      });
    }
  }, [term]);

  useEffect(() => {
    const searchQuery = {
      st: 'rent',
      currency: 'GBP',
      radius,
      runit: 'm',
      pt: 'residential',
      term,
      lat: position[0],
      lng: position[1]
    };

    const valueStore = {
      sta,
      min,
      max,
      minbeds,
      maxbeds,
      excludePoa,
      stygrp,
      ft,
      keywords
    };

    _.forEach(checkedFilters, (value, key) => {
      if (value) searchQuery[key] = valueStore[key];
    });

    setSearchParams(() => {
      return searchQuery;
    });
  }, [
    term,
    radius,
    sta,
    min,
    max,
    minbeds,
    maxbeds,
    excludePoa,
    stygrp,
    ft,
    keywords,
    checkedFilters,
    position
  ]);

  const toggleCounter = (id, increment) => {
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
      <Box display='flex' flexDirection='row' id='search_top'>
        <div>
          <FormTextField
            label='Area'
            type='header'
            value={area}
            callbacks={{
              onChange: areaChanged,
              onFocus: areaFocused,
              onBlur: areaUnfocused
            }}
          />
          <QuickStats toggled={toggledCount} query={searchParams} term={term} />
          <Button
            variant='contained'
            color='primary'
            onClick={searchStarted}
            disabled={term === -1}
          >
            Search
          </Button>
        </div>
        <GoogleMap
          range={radius}
          steps={steps}
          lat={position[0]}
          long={position[1]}
          callback={rangeChanged}
          value={radius}
        />
      </Box>
      <div id='search_filtersbar'>
        <FilterToggle
          key='sta'
          id='sta'
          label='Rent Type'
          callback={{ toggleCounter, toggleCheckbox }}
        >
          <MultiDropDown
            values={rentTypeOptions}
            link={sta}
            callback={rentTypeChanged}
          />
        </FilterToggle>
        <FilterToggle
          key='min_max'
          id='min_max'
          label='Price'
          callback={{ toggleCounter, toggleCheckbox }}
          divClass='price-container'
        >
          <>
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
          </>
        </FilterToggle>
        <FilterToggle
          key='house_style'
          label='House Style'
          id='house_style'
          callback={{ toggleCounter, toggleCheckbox }}
        >
          <HouseStyleSelect preselected={stygrp} callback={styleChanged} />
        </FilterToggle>
        <FilterToggle
          key='bedrooms'
          label='Bedrooms'
          id='bedrooms'
          callback={{ toggleCounter, toggleCheckbox }}
        >
          <HorizontalSlider
            value={[minbeds, maxbeds]}
            form={[1, 6, 1]}
            callback={bedsChanged}
          />
        </FilterToggle>
        <FilterToggle
          key='furnished'
          id='furnished'
          label='Furnished'
          callback={{ toggleCounter, toggleCheckbox }}
        >
          <MultiDropDown
            values={furnishedOptions}
            link={ft}
            callback={furnishedChanged}
          />
        </FilterToggle>
        <FilterToggle
          key='keywords'
          id='keywords'
          label='Keywords'
          callback={{ toggleCounter, toggleCheckbox }}
        >
          <ListAdder
            id='app_keywordinput'
            callback={keywordListUpdate}
            value={keywords}
          />
        </FilterToggle>
        <FilterToggle
          key='toggles'
          id='toggles'
          label='Options'
          callback={{ toggleCounter, toggleCheckbox }}
        >
          <>
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
          </>
        </FilterToggle>
      </div>
      <div id='search_bottom'>
        <div>
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
