export const types = {
  SET_RENT_TYPES: 'SET_RENT_TYPES',
  SET_MIN_PRICE: 'SET_MIN_PRICE',
  SET_MAX_PRICE: 'SET_MAX_PRICE',
  SET_MIN_BEDS: 'SET_MIN_BEDS',
  SET_MAX_BEDS: 'SET_MAX_BEDS',
  SET_AREA: 'SET_AREA',
  SET_RADIUS: 'SET_RADIUS',
  SET_EXPOA: 'SET_EXPOA',
  SET_HOUSE_STYLE: 'SET_HOUSE_STYLE',
  SET_FURNISHED: 'SET_FURNISHED',
  SET_KEYWORDS: 'SET_KEYWORDS'
};
export const setRentTypes = sta => ({
  type: SET_RENT_TYPES,
  sta
});

export const setMinPrice = min => ({
  type: SET_MIN_PRICE,
  min
});

export const setMaxPrice = max => ({
  type: SET_MAX_PRICE,
  max
});

export const setMinBeds = minbeds => ({
  type: SET_MIN_BEDS,
  minbeds
});

export const setMaxBeds = maxbeds => ({
  type: SET_MAX_BEDS,
  maxbeds
});

export const setArea = term => ({
  type: SET_AREA,
  term
});

export const setRadius = radius => ({
  type: SET_RADIUS,
  radius
});

export const setExpoa = excludePoa => ({
  type: SET_EXPOA,
  excludePoa
});

export const setHouseStyle = stygrp => ({
  type: SET_HOUSE_STYLE,
  stygrp
});

export const setFurnished = ft => ({
  type: SET_FURNISHED,
  ft
});

export const setKeywords = keywords => ({
  type: SET_KEYWORDS,
  keywords
});

export const PageState = {
  SEARCH: 'SEARCH',
  LOADING: 'LOADING',
  SUMMARY: 'SUMMARY'
};
