import React, { Component } from 'react';

//import Jitsi from './jitsi';
//import firebase from 'firebase';
//import config from '../../components/config';
//

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
class Index1 extends Component {
    constructor(props) {
      super(props);
      this.state ={
        vm:null,
        userlist:[]
    };
    this.init = this.init.bind(this);
    initialiseJitsi();
    this.init();
  }
  async init() {
    let vm =  new window.JitsiMeetExternalAPI("meet.jit.si/", {
      roomName: 'JitsiMeetAPIExample',
      width: 500,
      height: 300,
      parentNode: document.getElementById('start'),
    })

    this.setState({vm:vm});
  }

  async getuserinfo() {
    let arr = await this.state.vm.getParticipantsInfo();
    let device = await this.state.vm.getCurrentDevices();
    console.log(arr);
    console.log(device);
    this.setState({userlist:arr});
  }
    render() {
        return(
          <>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous"/>

          
          <div id="start"> 
              
          </div>

          <button onClick={this.getuserinfo}></button>
         </>
    )
    }
}


export default Index1;