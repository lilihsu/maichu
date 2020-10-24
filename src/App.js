import 'semantic-ui-css/semantic.min.css'
import React , {Component} from 'react';
import Layout from './components/Layout';
import {Grid} from 'semantic-ui-react';
import './VideoConference';
//import VideoConference from './VideoConference';
import Conference from './Conference';
import { storage } from "./firebase";

class App extends Component {
  constructor(props){
    super(props)
  }
  uploadImage=(image)=>{
    storage.child('screenShot').delete();
    storage.ref(`screenShot/${image.name}`).put(image);
  }
    
  render() {
    return (
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
    );
  }
}

export default App;
