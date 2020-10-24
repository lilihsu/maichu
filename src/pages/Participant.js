import React , {Component} from 'react';
import Layout from '../components/Layout';
import {Header, Grid} from 'semantic-ui-react';
import Conference from '../Conference';
import PartFuncHelper from './PartFuncList';


class Participant extends Component {
  render() {
    return (
      <Layout>
        <script src='https://meet.jit.si/external_api.js'></script>
        <Header as="h2">
          Student/Participant
        </Header>

        <Grid celled>
        <Grid.Row>
            <Grid.Column width={13}>
            <Conference inline-block />
            </Grid.Column>
            <Grid.Column width={3}>
            <PartFuncHelper />
            </Grid.Column>
        </Grid.Row>
        </Grid>

      </Layout>
    );
  }
}

export default Participant;
