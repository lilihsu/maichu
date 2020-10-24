import React , {Component} from 'react';
import Layout from '../components/Layout';
import {Header, Grid} from 'semantic-ui-react';
<<<<<<< HEAD:src/pages/Administrator.js
import Conference from '../Conference';
import AdminFuncHelper from './AdminFuncList';
=======
import Conference from './Conference';
import YOYO from './YOYO';
>>>>>>> origin/api_create:src/Administrator.js


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
                <AdminFuncHelper />
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </Layout>
    );
  }
}

export default Administrator;
