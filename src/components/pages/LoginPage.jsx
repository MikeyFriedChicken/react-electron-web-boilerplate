/**
 * @flow
 */

import * as React from "react";
import * as DOM from "react-dom";
import { Link } from "react-router-dom";
import { applicationHistory } from "../../helpers";

import { Button, Icon, Segment, Input, Header, Grid, Label, Divider, Form, TextArea, Image, Progress, TransitionablePortal,Portal, Message, Card } from "semantic-ui-react";
import type {LoginFormStateType} from "../../types/state/LoginFormStateType";

type Props = {
  loginForm: LoginFormStateType,
  logout: () => void,
  login: (username: string, passwors: string) => void,
  setUserName: (username: string) => void,
  setPassword: (password: string) => void,
  setSubmitted: (submitted: boolean) => void
};

class LoginPage extends React.Component<Props, any> {
  constructor(props: Props, state: any) {
    super(props);

    // reset login status
    this.props.logout();

    // Set initial values for login form
    this.props.setUserName("");
    this.props.setPassword("");
    this.props.setSubmitted(false);
  }

  handleChange(event: any, target: any) {
    const name = target.name;
    const value = target.value;

    // If the user is editting again submitted must be false...
    if (value == "") {
      this.props.setSubmitted(false);
    }

    if (name == "username") {
      this.props.setUserName(value);
    } else if (name == "password") {
      this.props.setPassword(value);
    } else {
      console.error("Not handled form field: " + name);
    }
  }

  handleSubmit(event: any, target: any) {
    console.log("submitted");
    event.preventDefault();

    this.props.setSubmitted(true);

    const {currentUserName, currentPassword} = this.props.loginForm;

    if (currentUserName && currentPassword) {
      this.props.login(currentUserName, currentPassword);
    } else {
      // No need to do anything as validation will kick in due to submitted status changing
    }
  }

  renderLoginFailureMessage(message: string) {
    return (
      <Message negative size="tiny">
        <p>{message}</p>
      </Message>
    );
  }

  renderFieldMessage(message: string) {
    return (
      <Label basic color="red" pointing>
        {message}
      </Label>
    );
  }

  render() {
    console.log("Render Login Page");
    console.log(this.props);

    const {currentUserName, currentPassword,loggingIn,submitted,error} = this.props.loginForm;

    return (
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          padding: "0em 0em 0em 0em",
          borderColor: "blue",
          borderStyle: "none"
        }}
      >
        <div
          style={{
            width: "350px",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "0em 0em 0em 0em",
            borderColor: "green",
            borderStyle: "none"
          }}
        >
          <Segment raised basic>
            <h4>Login</h4>

            <Form
              onSubmit={(event: any, target: any) => {
                this.handleSubmit(event, target);
              }}
              error={submitted && !currentUserName ? true : false}
              loading={loggingIn}
            >
              <Form.Input
                placeholder="Username"
                name={"username"}
                value={currentUserName}
                onChange={(event: any, target: any) => {
                  this.handleChange(event, target);
                }}
              />
              {!loggingIn && submitted &&
                !currentUserName &&
                this.renderFieldMessage("Username is required")}
              <p />
              <Form.Input
                placeholder="Password"
                name="password"
                type="password"
                value={currentPassword}
                onChange={(event: any, target: any) => {
                  this.handleChange(event, target);
                }}
              />

              {!loggingIn && submitted &&
                !currentPassword &&
                this.renderFieldMessage("Password is required")}
              <p />
              {error &&
                currentPassword &&
                currentPassword &&
                this.renderLoginFailureMessage(error)}

              <div>
                <Button type="submit" color="blue" basic>
                  Login
                </Button>
              </div>
            </Form>
          </Segment>
        </div>
      </div>
    );
  }
}

export default LoginPage;
