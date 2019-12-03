import { searchTypes } from '../actions/index';

const initialSearch = {
  sta: [],
  st: 'rent',
  min: 0,
  max: 0,
  currency: 'GBP',
  minbeds: 0,
  maxbeds: 0,
  term: '',
  radius: 5,
  runit: 'm',
  excludePoa: false,
  pt: 'residential',
  stygrp: [],
  ft: [],
  keywords: []
};

export default (state = initialSearch, action) => {
  switch (action.type) {
    case searchTypes.SET_RENT_TYPES:
      return Object.assign({}, state, { ...state, sta: action.sta });
    case searchTypes.SET_MIN_PRICE:
      return Object.assign({}, state, { ...state, min: action.min });
    case searchTypes.SET_MAX_PRICE:
      break;
    case searchTypes.SET_MIN_BEDS:
      break;
    case searchTypes.SET_MAX_BEDS:
      break;
    case searchTypes.SET_AREA:
      break;
    case searchTypes.SET_RADIUS:
      break;
    case searchTypes.SET_EXPOA:
      break;
    case searchTypes.SET_HOUSE_STYLE:
      break;
    case searchTypes.SET_FURNISHED:
      break;
    case searchTypes.SET_KEYWORDS:
      break;
    default:
      return state;
  }
};
