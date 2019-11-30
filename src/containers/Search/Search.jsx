import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import DropDown from '../../components/DropDown/DropDown';
import FormTextField from '../../components/FormTextField/FormTextField';
import GoogleMap from '../../components/GoogleMap/GoogleMap';
import HorizontalSlider from '../../components/HorizontalSlider/HorizontalSlider';
import ListAdder from '../../components/ListAdder/ListAdder';
import PriceTextField from '../../components/PriceTextField/PriceTextField';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';

import geocoder from '../../api/geocoder';

import './Search.scss';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: '0 5%',
    fullWidth: true,
    display: 'flex',
    wrap: 'nowrap'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function Search(props) {
  const classes = useStyles;
  const [area, setArea] = useState('');
  const [searchParams, setSearchParams] = useState({});
  const [furnished, setFurnished] = useState('');
  const [bedrooms, setBedrooms] = useState([1, 6]);
  const [minPrice, setMinPrice] = useState(0.0);
  const [maxPrice, setMaxPrice] = useState(0.0);
  const [student, setStudent] = useState(false);
  const [expoa, setExpoa] = useState(false);
  const [range, setRange] = useState(5);
  const [position, setPosition] = useState([0, 0]);

  const summary = {
    area,
    searchParams,
    furnished,
    bedrooms,
    minPrice,
    maxPrice,
    student,
    expoa,
    range
  };

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
    searchParams.keywords = keywordList;
    setSearchParams(searchParams);
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
    setRange(newValue);
  };

  const areaUnfocused = e => {
    geocoder.getLLByArea(e.target.value).then(data => {
      const location = data.results[0].geometry.location;
      setPosition([location.lat, location.lng]);
    });
  };

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
      <DropDown
        label='Furnished'
        values={furnishedOptions}
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

      <br />
      <Button variant='contained' color='primary' onClick={searchStarted}>
        Search
      </Button>
      <br />
      <GoogleMap
        range={range}
        steps={steps}
        lat={position[0]}
        long={position[1]}
        callback={rangeChanged}
      />
      <br />
      <p>{JSON.stringify(summary)}</p>
    </div>
  );
}
