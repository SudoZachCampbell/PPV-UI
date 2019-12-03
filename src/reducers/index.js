import { pageTypes, searchTypes } from '../actions/index';

const initialState = {
  pageState: 0,
  search: {
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
  }
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case searchTypes.SET_RENT_TYPES:
      return Object.assign({}, state, { search: { ...state.search, sta: action.sta } });
    case searchTypes.SET_MIN_PRICE:
      break;
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
    case pageTypes.SET_PAGE_STATE:
      return Object.assign({}, state, { pageState: action.pageState });
    default:
      return state;
  }
};
