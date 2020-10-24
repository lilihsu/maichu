import 'semantic-ui-css/semantic.min.css'
import React , {Component} from 'react';
import Layout from './components/Layout';
<<<<<<< HEAD
import {Grid} from 'semantic-ui-react';
import './VideoConference';
import VideoConference from './VideoConference';
import Conference from './Conference';
=======
import { Route } from 'react-router-dom';
import Administrator from './Administrator';
import Participant  from './Participant';

>>>>>>> ui


class App extends Component {
  render() {
    return (
<<<<<<< HEAD
      <Layout>
        <script src='https://meet.jit.si/external_api.js'></script>
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={13}>
              <Conference inline-block />
            </Grid.Column>
            <Grid.Column width={3}>
              <h4>Function bar</h4>
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </Layout>
=======
      <div className="container">
        {/* The corresponding component will show here if the current URL matches the path */}
        <Route path="/" exact component={Administrator} />
        <Route path="/admin" component={Administrator} />
        <Route path="/participant" component={Participant} />
      </div>
>>>>>>> ui
    );
  }
}

export default App;
