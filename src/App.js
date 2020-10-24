import 'semantic-ui-css/semantic.min.css'
import React , {Component} from 'react';
import Layout from './components/Layout';
import { Route } from 'react-router-dom';
import Administrator from './Administrator';
import Participant  from './Participant';
import Speech from './Speech';

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
      <div className="container">
        {/* The corresponding component will show here if the current URL matches the path */}
        <Route path="/" exact component={Administrator} />
        <Route path="/admin" component={Administrator} />
        <Route path="/participant" component={Participant} />
        <Route path="/speech" component={Speech} />
      </div>
    );
  }
}

export default App;
