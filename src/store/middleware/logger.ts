import { Middleware } from 'redux';

import { RootState } from '../store';

export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log('current State: ', store.getState());

  next(action);

  console.log('next State: ', store.getState());
};
