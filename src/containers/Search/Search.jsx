import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import MultiDropDown from '../../components/MultiDropDown/MultiDropDown';
import FormTextField from '../../components/FormTextField/FormTextField';
import GoogleMap from '../../components/GoogleMap/GoogleMap';
import HorizontalSlider from '../../components/HorizontalSlider/HorizontalSlider';
import ListAdder from '../../components/ListAdder/ListAdder';
import PriceTextField from '../../components/PriceTextField/PriceTextField';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';

import geocoder from '../../api/geocoder';

import './Search.scss';

export default function Search(props) {  const [area, setArea] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [furnished, setFurnished] = useState([]);
  const [bedrooms, setBedrooms] = useState([1, 6]);
  const [minPrice, setMinPrice] = useState(0.0);
  const [maxPrice, setMaxPrice] = useState(0.0);
  const [student, setStudent] = useState(false);
  const [expoa, setExpoa] = useState(false);
  const [radius, setRadius] = useState(5);
  const [position, setPosition] = useState([0, 0]);

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

  const areaChanged = e => {
    setArea(e.target.value);
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
    setBedrooms(newValue);
  };

  const rangeChanged = (e, newValue) => {
    setRadius(newValue);
  };

  const areaUnfocused = e => {
    geocoder.getLLByArea(e.target.value).then(data => {
      const location = data.results[0].geometry.location;
      setPosition([location.lat, location.lng]);
    });
  };

  const searchParams = {
    sta: ['toLet', 'letAgreed', 'let'],
    st: 'rent',
    min: minPrice,
    max: maxPrice,
    currency: 'GBP',
    minbeds: bedrooms[0],
    maxbeds: bedrooms[1],
    term: area,
    radius: radius,
    runit: 'm',
    excludePoa: !expoa,
    pt: 'residential',
    stygrp: [3, 10, 8, 9, 6, 7, 2],
    ft: furnished,
    keywords: keywords
  };

  if (student) searchParams.excatt = 20;

  const searchStarted = () => {
    props.executeSearch(area, searchParams);
  };

  return (
    <div className='search-container'>
      <FormTextField
        label='Area'
        callbacks={{ onChange: areaChanged, onBlur: areaUnfocused }}
      />
      <br />
      <div className='price-container'>
        <Typography id='discrete-slider'>Price</Typography>
        <div>
          <PriceTextField label='Min' callback={minPriceChanged} />
          <PriceTextField label='Max' callback={maxPriceChanged} />
        </div>
      </div>
      <br />
      <HorizontalSlider
        label='Bedrooms'
        value={bedrooms}
        form={[1, 6, 1]}
        callback={bedsChanged}
      />
      <br />
      <MultiDropDown
        label='Furnished'
        values={furnishedOptions}
        link={furnished}
        callback={furnishedChanged}
      />
      <br />
      <ListAdder
        id='app_keywordinput'
        label='Keywords: '
        callback={keywordListUpdate}
      />
      <br />
      <ToggleSwitch label='Student' callback={studentChanged} />
      <ToggleSwitch label='Include POA' callback={expoaChanged} />
      <br />
      <GoogleMap
        range={radius}
        steps={steps}
        lat={position[0]}
        long={position[1]}
        callback={rangeChanged}
      />
      <br />
      <Button variant='contained' color='primary' onClick={searchStarted}>
        Search
      </Button>
      <br />
      <p>{JSON.stringify(searchParams)}</p>
    </div>
  );
}
