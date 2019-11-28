import React, { useState } from 'react';
import ListAdder from '../components/ListAdder';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import GoogleMapReact from 'google-map-react';
import { makeStyles } from '@material-ui/core/styles';

import './Search.scss';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: 0,
    fullWidth: true,
    display: 'flex',
    wrap: 'nowrap'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Search(props) {
  const classes = useStyles;
  const [area, setArea] = useState('');
  const [searchParams, setSearchParams] = useState({});
  const [furnished, setFurnished] = useState('');
  const [bedrooms, setBedrooms] = useState([1, 6]);

  const mapStats = { center: { lat: 59.95, lng: 30.33 }, zoom: 11 };

  const keywordListUpdate = keywordList => {
    searchParams.keywords = keywordList;
    setSearchParams(searchParams);
  };

  const textChange = e => {
    setArea(e.target.value);
  };

  const bedsChanged = (e, newValue) => {
    setBedrooms(newValue);
  };

  const searchStarted = () => {
    props.executeSearch(area, searchParams);
  };

  return (
    <div className='search-container'>
      <FormControl>
        <TextField
          required
          id='app_areainput'
          label='Area'
          onChange={textChange}
          margin='normal'
        />
      </FormControl>
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
      <div className='map'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCQLI34B1kJnIeAFKrcbzzJfqhwcfLBCK8' }}
        defaultCenter={mapStats.center}
        defaultZoom={mapStats.zoom}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text='My Marker' />
      </GoogleMapReact>
      </div>
      <br />
      <Button variant='contained' color='primary' onClick={searchStarted}>
        Search
      </Button>
    </div>
  );
}
