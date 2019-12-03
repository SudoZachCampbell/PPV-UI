import { pageTypes } from '../actions/index';

export default (state = 0, action) => {
  switch (action.type) {
    case pageTypes.SET_PAGE_STATE:
      return action.pageState;
    default:
      return state;
  }
};
