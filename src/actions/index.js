export const searchTypes = {
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
  type: searchTypes.SET_RENT_TYPES,
  sta
});

export const setMinPrice = min => ({
  type: searchTypes.SET_MIN_PRICE,
  min
});

export const setMaxPrice = max => ({
  type: searchTypes.SET_MAX_PRICE,
  max
});

export const setMinBeds = minbeds => ({
  type: searchTypes.SET_MIN_BEDS,
  minbeds
});

export const setMaxBeds = maxbeds => ({
  type: searchTypes.SET_MAX_BEDS,
  maxbeds
});

export const setArea = term => ({
  type: searchTypes.SET_AREA,
  term
});

export const setRadius = radius => ({
  type: searchTypes.SET_RADIUS,
  radius
});

export const setExpoa = excludePoa => ({
  type: searchTypes.SET_EXPOA,
  excludePoa
});

export const setHouseStyle = stygrp => ({
  type: searchTypes.SET_HOUSE_STYLE,
  stygrp
});

export const setFurnished = ft => ({
  type: searchTypes.SET_FURNISHED,
  ft
});

export const setKeywords = keywords => ({
  type: searchTypes.SET_KEYWORDS,
  keywords
});

export const pageTypes = {
    SET_PAGE_STATE: 'SET_PAGE_STATE'
}


export const setPageState = pageState => ({
    type: pageTypes.SET_PAGE_STATE,
    pageState
});
