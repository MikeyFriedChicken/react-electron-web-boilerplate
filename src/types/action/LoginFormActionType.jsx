/**
 * @flow
 */

import type {UserType} from "../common/UserType";

export type LoginFormActionType = {
  type: string,
  username: string,
  password: string,
  submitted: boolean,
  user: UserType,
  error: string
};

