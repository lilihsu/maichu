import 'semantic-ui-css/semantic.min.css'
import React , {Component} from 'react';
import Layout from './components/Layout';
import {Grid} from 'semantic-ui-react';
import './VideoConference';
import VideoConference from './VideoConference';
import Conference from './Conference';
import { Route } from 'react-router-dom';
import Administrator from './Administrator';
import Participant  from './Participant';



class App extends Component {
  render() {
    return (
      <div className="container">
        {/* The corresponding component will show here if the current URL matches the path */}
        <Route path="/" exact component={Administrator} />
        <Route path="/admin" component={Administrator} />
        <Route path="/participant" component={Participant} />
      </div>
    );
  }
}

export default App;
