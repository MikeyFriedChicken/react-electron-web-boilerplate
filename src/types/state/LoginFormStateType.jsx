
/**
 * @flow
 */

import type {UserType} from "../common/UserType";

export  type LoginFormStateType = {
        user: ?UserType,
        loggedIn: boolean,
        loggingIn: boolean,
        error: string,
        currentUserName: string,
        currentPassword: string,
        submitted: boolean
      };
