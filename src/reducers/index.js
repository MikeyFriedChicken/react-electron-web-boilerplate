/**
 * @flow
 */


import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import { loginForm } from './loginFormReducer';

const allReducers = combineReducers({
  loginForm,
  routing: routerReducer
});


export default allReducers;
