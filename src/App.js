import 'semantic-ui-css/semantic.min.css'
import React , {Component} from 'react';
import Administrator from './pages/Administrator';
import Participant  from './pages/Participant';
import {database} from "./firebase/";
//import VideoConference from './VideoConference';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


class App extends Component {
  constructor(props){
    super(props)
    this.state={
      group1:0,
      group2:0,
      logiGroup:0,
      id:null
    }
    
  }
  // selected_listener = async (event, name) => {
  //   event.preventDefault();
  //   var result = false;
  //   await database.ref('Selected').once('value').then((es)=>{
  //     if(es.exists()){
  //       es.forEach(function(e){
  //           if(name = e.key){
  //             result = true;
  //           }
  //       })
  //     }
  //   });
  //   return result;
  // }
  // Teacher_select_speaker = async (name)=>{

  //   console.log(name)
  //   let preTime=0;
  //   await database.ref('speakTime/'+name).once('value').then(e=>{
  //     if(e.exists())
  //       preTime=e.val().time;
  //   });
  //   await database.ref('Selected/'+name).set({time:preTime});
  // }
  addSpeakTime=async(name,time)=>{
    let selectedName;
    let selectedTime;
    await database.ref('Selected').once('value').then((es)=>{
      if(es.exists()){
        es.forEach(function(e){
            selectedName = e.key;
            selectedTime = e.val().time;
        })
      }
    })
    let preTime=0;
    await database.ref('speakTime/'+name).once('value').then(e=>{
      if(e.exists())
        preTime=e.val().time;
    })
    await database.ref('speakTime/'+name).set({time:preTime+time});
    if(selectedTime -　preTime > 10000){
      await database.ref('Selected').remove();
    }
  }
  getSpeakTime=async()=>{
    let result=[]
    await database.ref('speakTime/').orderByValue().once('value').then(es=>{
      if(es.exists()){
        es.forEach(e=>{
          result.push({name:e.key,time:e.val().time})
        })
      }
    })
    console.log(result)
    return result.sort((a,b)=>{
      return a.time -b.time
    });
  }

  setGroupCount=async(gName,op)=>{
    let num;
    await database.ref(gName).once('value').then(e=>{
      num=e.val().num;
    })
    if(op==='-'){
      await database.ref(gName).set({num:num-1})
    }
    else{
      await database.ref(gName).set({num:num+1})
    }
    
  }
  componentDidMount(){
    //this.dequeue();
    //this.enqueue('fuck');
    database.ref('group1').on('value',e=>{
      this.setState({group1:e.val().num});
    });
    database.ref('group2').on('value',e=>{
      this.setState({group2:e.val().num});
    });
    database.ref('logiGroup').on('value',e=>{
      this.setState({logiGroup:e.val().num});
    });

  }
  render() {
    return (
      <div className="container">
        <React.Fragment>
          <Router>
            <Switch>
              <Route path="/">
                <Administrator 
                  group1={this.state.group1} 
                  group2={this.state.group2} 
                  logiGroup={this.state.logiGroup}
                  addSpeakTime={this.addSpeakTime}
                  getSpeakTime={this.getSpeakTime}
                  />
              </Route>
              <Route path="/admin">
                <Administrator 
                  group1={this.state.group1} 
                  group2={this.state.group2} 
                  logiGroup={this.state.logiGroup}
                  addSpeakTime={this.addSpeakTime}
                  getSpeakTime={this.getSpeakTime}
                  />
              </Route>
              <Route path="/participant">
                <Participant  
                  group1={this.state.group1} 
                  group2={this.state.group2} 
                  logiGroup={this.state.logiGroup}
                  addSpeakTime={this.addSpeakTime}
                  getSpeakTime={this.getSpeakTime}
                 />
              </Route>
            </Switch>
          </Router>
        </React.Fragment>
        {/* <Route path="/" component={(props)=>{}} />
        <Route path="/admin" component={(props)=>{<Administrator group1={this.state.group1} group2={this.state.group2} logiGroup={this.state.logiGroup}/>}}/>
        <Route path="/participant" component={(props)=>{<Participant  group1={this.state.group1} group2={this.state.group2} logiGroup={this.state.logiGroup}/>}} /> */}
      </div>
    );
  }
}

export default App;
