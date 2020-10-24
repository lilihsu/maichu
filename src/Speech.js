import React , {Component, useState } from 'react';
import Layout from './components/Layout';
import {Header, Grid} from 'semantic-ui-react';
class Speech_test extends Component {
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
                  <Speech inline-block />
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

//https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
const Speech = () => {
//   const { transcript, resetTranscript } = useSpeechRecognition();
  const [activity ,setactivity] = useState([]);
  const [start ,setstart] = useState(0);
  const [end ,setend] = useState(0);
  const [cumulate ,setcumulate] = useState(0);
  const recognition =  new window.webkitSpeechRecognition();
  
//   if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//     return null
//   }
const stop_listen= () => {
    recognition.stop();
}
    const start_listen = () => {
        
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.start();
    }
    //recognition.onresult = event => {
    recognition.onspeechend = event => {
  // do something with event.results
    setend(event.timeStamp);
    
    console.log(event);
    console.log(cumulate)
    console.log(start);
    console.log(end);
    // var transcript = event.results[current][0].transcript
    // console.log(transcript);
    let add = parseFloat(cumulate) + parseFloat(end) - parseFloat(start);
    setcumulate(add);
    console.log(add);
    setactivity('Ended:' + end)
    }

  

  
   recognition.onspeechstart = event => {
       setstart(event.timeStamp);
  }
    
    
  return (
    <div>
      
      <div>{start}</div>
      <div>{end}</div>
      {/* <p>{transcript}</p> */}
      <div>cumulate</div>
      <div>{cumulate}</div>
      <button onClick={start_listen}>start</button>
      <button onClick={stop_listen}>stop</button>
    </div>
  )
}
export default Speech_test