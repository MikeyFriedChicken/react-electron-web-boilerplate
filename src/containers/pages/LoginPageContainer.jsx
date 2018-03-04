
/**
 * @flow
 */

import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginPage from '../../components/pages/LoginPage';
import { loginFormActions } from './../../actions/loginFormActions';
import type {LoginFormStateType} from "../../types/state/LoginFormStateType";

type State = {
    loginForm: LoginFormStateType
};

// Map the stuff we want from the global application state in redux to the props
function mapStateToProps(state: State) {
    return {
        loginForm: state.loginForm
    };
}

// Map any actions required to the props
function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
        setUserName: loginFormActions.setUserName,
        setPassword: loginFormActions.setPassword,
        setSubmitted: loginFormActions.setSubmitted,
        login: loginFormActions.login,
        logout: loginFormActions.logout
    },
    dispatch
  );
}

// Export our LoginPage which is now connected to the Redux store via the above state and actions
export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);
