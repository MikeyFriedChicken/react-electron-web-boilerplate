/**
 * @flow
 */

import * as React from "react";
import { Button,Segment,Header,Grid, Image,TransitionablePortal,Popup,Icon} from "semantic-ui-react";
import { applicationHistory } from '../../helpers';

import reactImage from "../../assets/react.svg";
import electronImage from "../../assets/flow.png";
import flowImage from "../../assets/react.svg";
import reduxImage from "../../assets/redux.svg";
import webPackImage from "../../assets/webpack.svg";
import semanticUiReact from "../../assets/semantic-ui-react.png";
import githubImage from "../../assets/github.png";

type Props = {
};

type State = {
};

class LandingPage extends React.Component<Props,State> {
  constructor(props: Props,state: State) {
    super(props,state);

  }

  render() {
    return (
      <div style={{ margin: '1em 1em 1em 1em', padding: '0em 0em 0em 0em' ,borderColor: 'red', borderStyle: 'none'}}>
      <Grid columns={3} centered>
          <Grid.Row centered>
              <Grid.Column>
              </Grid.Column>
              <Grid.Column >
                 <Button fluid primary><Image src={reactImage} size="mini" />React</Button>
              </Grid.Column>
              <Grid.Column>
              </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
              <Grid.Column >
              <Button fluid primary><Image src={reduxImage} size="mini" />Redux</Button>
              </Grid.Column>
              <Grid.Column>
              </Grid.Column>
              <Grid.Column >
              <Button fluid primary><Image src={webPackImage} size="mini"/>Webpack</Button>
              </Grid.Column>
          </Grid.Row>

          <Grid.Row centered>
              <Grid.Column>
              </Grid.Column>
              <Grid.Column >
              <Button fluid primary><Image src={flowImage} size="mini" />Flow</Button>
              </Grid.Column>

              <Grid.Column>

              </Grid.Column>
          </Grid.Row>

          <Grid.Row centered>
              <Grid.Column >
              <Button fluid primary><Image src={semanticUiReact} size="mini" />Semantic UI React</Button>
              </Grid.Column>
              <Grid.Column>
              </Grid.Column>
              <Grid.Column  >
              <Button fluid primary><Image src={electronImage} size="mini" />Electron</Button>
              </Grid.Column>
          </Grid.Row>

          <Grid.Row centered>
            <Grid.Column>
            
              </Grid.Column>
              <Grid.Column  >
              <Button fluid primary><Image src={githubImage} size="mini"/>View on Github</Button>
              </Grid.Column>

            <Grid.Column>
            
            </Grid.Column>
          </Grid.Row>

        <Grid.Row textAlign="right">
          <Grid.Column>
              </Grid.Column>
              <Grid.Column>
              </Grid.Column>

              <Grid.Column  textAlign="right">
              <Button name="loginlogoff"  onClick={() => this.redirect("/login")}>Sign Out</Button>
              </Grid.Column>
          </Grid.Row>

      </Grid>
      
      </div>
  
      );
  }

  redirect(to: string) {
      console.log(to);
        applicationHistory.push({ pathname: to });
  }
}
export default LandingPage;
