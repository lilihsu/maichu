import logo from './logo.svg';
import './App.css';
import Index1 from './Index1';
import React, { Component } from 'react';
import VideoConference from './VideoConference'
import YOYO from './YOYO'
const loadJitsiScript = async  () => {
  let resolveLoadJitsiScriptPromise = null;

  const loadJitsiScriptPromise = new Promise((resolve) => {
    resolveLoadJitsiScriptPromise = resolve;
  });

  const script = document.createElement("script");
  script.src = "https://meet.jit.si/external_api.js";
  script.async = true;
  script.onload = resolveLoadJitsiScriptPromise
  document.body.appendChild(script);

  return loadJitsiScriptPromise;
};

const initialiseJitsi = async () => {
  if (!window.JitsiMeetExternalAPI) {
    await loadJitsiScript();
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      vm:null,
      userlist:[]
  };
  initialiseJitsi();
}
  
  render (){
  return (
    <div className="App">
      <script src='https://meet.jit.si/external_api.js'></script>
      <header className="App-header">
        <YOYO/>
        <div id='react-jitsi-frame' ></div>
      </header>
    </div>
  );
  }
}

export default App;
