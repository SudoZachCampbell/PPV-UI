import React, { useState } from 'react';
import ListAdder from '../components/ListAdder';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import GoogleMap from 'google-map-react';
import { makeStyles } from '@material-ui/core/styles';

import '../stylesheets/pages/Search.scss';

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

  const mapStyle = {
    width: range * 10 + 'px',
    height: range * 10 + 'px',
    marginLeft: -(range * 10)/2 + 'px',
    marginTop: -(range * 10)/2 + 'px',
    transition: ['width'],
    transitionDuration: 3000
  };

  const AnyReactComponent = ({ text }) => (
    <div className='radius-range' style={mapStyle}></div>
  );

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

  const mapStats = { center: { lat: 59.95, lng: 30.33 }, zoom: 11 };

  const keywordListUpdate = keywordList => {
    searchParams.keywords = keywordList;
    setSearchParams(searchParams);
  };

  const textChange = e => {
    setArea(e.target.value);
  };

  const studentChanged = e => {
    setStudent(e.target.checked);
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

  const searchStarted = () => {
    props.executeSearch(area, searchParams);
  };

  return (
    <div className='search-container'>
      <FormControl className='area-control'>
        <TextField
          required
          id='search_areainput'
          label='Area'
          onChange={textChange}
          margin='normal'
        />
      </FormControl>
      <br />
      <div className='price-container'>
        <Typography id='discrete-slider'>Price</Typography>
        <div>
          <FormControl>
            <TextField
              id='search_minprice'
              label='Min'
              onChange={minPriceChanged}
              margin='normal'
              className='text-field'
            />
          </FormControl>
          <FormControl>
            <TextField
              id='app_areainput'
              label='Max'
              onChange={maxPriceChanged}
              margin='normal'
              className='text-field'
            />
          </FormControl>
        </div>
      </div>
      <br />
      <div className='slider'>
        <Typography id='discrete-slider' gutterBottom>
          Bedrooms
        </Typography>
        <Slider
          value={bedrooms}
          onChange={bedsChanged}
          aria-labelledby='discrete-slider'
          valueLabelDisplay='auto'
          step={1}
          marks
          min={1}
          max={6}
        />
      </div>
      <br />
      <div className='select'>
        <FormControl className='{classes.formControl} select'>
          <InputLabel htmlFor='furnished-dropdown'>Furnished</InputLabel>
          <Select
            id='furnished-dropdown'
            value={furnished}
            onChange={e => setFurnished(e.target.value)}
          >
            <MenuItem value={''}>
              <em>None</em>
            </MenuItem>
            <MenuItem value={'unfurnished'}>Unfurnished</MenuItem>
            <MenuItem value={'partlyFurnished'}>Partially Furnished</MenuItem>
            <MenuItem value={'fullyFurnished'}>Fully Furnished</MenuItem>
            <MenuItem value={'optional'}>Optional</MenuItem>
          </Select>
        </FormControl>
      </div>
      <br />
      <ListAdder
        id='app_keywordinput'
        label='Keywords: '
        callback={keywordListUpdate}
      />
      <br />
      <FormControlLabel
        control={
          <Switch
            checked={student}
            onChange={studentChanged}
            value={student}
            color='primary'
          />
        }
        label='Student'
        labelPlacement='start'
      />
      <FormControlLabel
        control={
          <Switch
            checked={expoa}
            onChange={expoaChanged}
            value={expoa}
            color='primary'
          />
        }
        label='Include POA'
        labelPlacement='start'
      />
      <br />
      <div className='map'>
        <GoogleMap
          bootstrapURLKeys={{ key: 'AIzaSyCQLI34B1kJnIeAFKrcbzzJfqhwcfLBCK8' }}
          defaultCenter={mapStats.center}
          defaultZoom={mapStats.zoom}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text='My Marker' />
        </GoogleMap>
        <Slider
          orientation='vertical'
          onChange={rangeChanged}
          defaultValue={5}
          min={0.25}
          max={25}
          step={null}
          marks={steps}
          valueLabelDisplay='auto'
        />
      </div>
      <br />
      <Button variant='contained' color='primary' onClick={searchStarted}>
        Search
      </Button>
      <br />
      <p>{JSON.stringify(summary)}</p>
    </div>
  );
}
