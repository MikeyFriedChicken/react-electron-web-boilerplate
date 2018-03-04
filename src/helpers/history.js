/**
 * @flow
 */
import { syncHistoryWithStore } from 'react-router-redux';
import { createHashHistory } from 'history'
import { store } from '.';

// Gives access anywhere in the application to the history
// This history is synchronised with the redux store
export const applicationHistory = syncHistoryWithStore(createHashHistory(), store);
