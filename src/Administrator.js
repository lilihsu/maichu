import 'semantic-ui-css/semantic.min.css'
import React , {Component} from 'react';
import Layout from './components/Layout';
import {Header, Grid} from 'semantic-ui-react';
import Conference from './Conference';
import YOYO from './YOYO';


class Administrator extends Component {
  render() {
    return (
      <Layout>
        <script src='https://meet.jit.si/external_api.js'></script>
        <Header as="h2">
          Teacher/Administrator
        </Header>
          <Grid celled>
            <Grid.Row>
              <Grid.Column width={13}>
                {/* <Conference inline-block /> */}
                <YOYO inline-block />
              </Grid.Column>
              <Grid.Column width={3}>
                <h4>Function bar</h4>
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </Layout>
    );
  }
}

export default Administrator;
