import React , {Component, useState ,useEffect ,props}  from 'react';
import Layout from './components/Layout';
import {Header, Grid} from 'semantic-ui-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import YOYO from './YOYO';
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
                  <YOYO inline-block />
                </Grid.Column>
                <Grid.Column width={3}>
                  <h4>Function bar</h4>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={13}>
                  <Dictaphone inline-block />
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
const reset_cumulate = () => {
    setcumulate(0);
}
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
      <button onClick={reset_cumulate}>reset_cumulate</button>
      <br/>
      <Dictaphone />
    </div>
  )
}

const Dictaphone = () => {
    const { transcript , resetTranscript } =  useSpeechRecognition()
    const [start ,setstart] = useState(0);
    const [end ,setend] = useState(0);
    const [cumulate ,setcumulate] = useState(0);
    const [start_flag ,setstart_flag] = useState(true);

    useEffect(() => {
        console.log('value changed!', transcript)
        console.log(cumulate)
        console.log(start);
        console.log(end);
        if(transcript != ''){ 
            let t = new Date().getTime();
            console.log(t);
            if(start_flag){
                setstart(t);
                setstart_flag(false);
            }else{
                setend(t);
                let add =  cumulate + t - start;
                setcumulate(add);
                setstart_flag(true);
            }
        }
    });
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return null
    }
    SpeechRecognition.startListening();

    const reset_cumulate = () => {
        setcumulate(0);
    }

    
    return (
      <div>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={reset_cumulate}>reset_cumulate</button>
        <p>{transcript}</p>
        <div>cumulate</div>
        <div>{cumulate/1000} sec</div>
        
      </div>
    )
  }
//export default Speech_test//這個file最後export  Dictaphone嵌在YOYO中就行

export default Dictaphone