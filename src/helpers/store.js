/**
 * @flow
 */

import { createStore, applyMiddleware} from 'redux';  // compose found here
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import allReducers from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const loggerMiddleware = createLogger();
const middlewareApplied = applyMiddleware(thunkMiddleware,loggerMiddleware);
const composeDev = composeWithDevTools(middlewareApplied);

export const store = createStore(allReducers,composeDev);




