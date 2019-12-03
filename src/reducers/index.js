import { PageState, types } from '../actions/index';

const initialState = {
  pageState: PageState.SEARCH,
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
    case types.SET_RENT_TYPES:
    case types.SET_MIN_PRICE:
    case types.SET_MAX_PRICE:
    case types.SET_MIN_BEDS:
    case types.SET_MAX_BEDS:
    case types.SET_AREA:
    case types.SET_RADIUS:
    case types.SET_EXPOA:
    case types.SET_HOUSE_STYLE:
    case types.SET_FURNISHED:
    case types.SET_KEYWORDS:
    default:
      return state;
  }
};
