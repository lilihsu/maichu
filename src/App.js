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
  enqueue=(name)=>{
    //database.ref('queue').push(name)
  }
  dequeue=async ()=>{
    let id
    // await database.ref('/queue').once('value').then(e=>{
    //   id=e.val().id})
    // this.setState({id:id})
   // await database.ref('/queue').delete()
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
                  logiGroup={this.state.logiGroup}/>
              </Route>
              <Route path="/admin">
                <Administrator 
                  group1={this.state.group1} 
                  group2={this.state.group2} 
                  logiGroup={this.state.logiGroup}/>
              </Route>
              <Route path="/participant">
                <Participant  
                  group1={this.state.group1} 
                  group2={this.state.group2} 
                  logiGroup={this.state.logiGroup}/>
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
