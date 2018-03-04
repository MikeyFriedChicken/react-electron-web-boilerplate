
/**
 * @flow
 */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// This 'SecureRoute' creator function checks that a logged in user is available in storage
// before setting the component on the Route, otherwise will redirect to the login page.
export const SecureRoute = ({ component: Component, ...rest }: any) => (
    <Route {...rest} render={(props: any) => (
        localStorage.getItem('user') ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)