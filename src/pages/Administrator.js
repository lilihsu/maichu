import React , {Component} from 'react';
import Layout from '../components/Layout';
import {Header, Grid} from 'semantic-ui-react';
import YOYO from '../YOYO';
import AdminFuncHelper from './AdminFuncList';
import {database} from "../firebase/";

class Administrator extends Component {
  constructor(props) {
    super(props);
    this.state={
      roomName: "LogiGroup",
      arr:[],
      emotion:null
    }
  }
  
  setV = (Value) => {
    this.setState({arr:Value})
  }
  getV = () => {
    return this.state.arr;
  }

  changeRoom = (index) => {
    if(index===0) {
      this.setState({roomName: "LogiGroup"});
    }
    else if(index===1) {
      this.setState({roomName: "LogiSubGroup1"})
    }
    else if(index===2) {
      this.setState({roomName: "LogiSubGroup2"})
    }
  }

  componentDidMount(){
    database.ref('CUR_EMOTION').on('value',e=>{
      this.setState({emotion:e.val().cur_emotion});
      console.log(e.val())
    });
  }
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
                {/* <Conference inline-block /> */}
                <YOYO inline-block  test={this.setV} roomName={this.state.roomName}
                  setGroupCount={this.props.setGroupCount}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <AdminFuncHelper  
                  userlist={this.state.arr} 
                  roomName={this.state.roomName} 
                  emotion={this.state.emotion}
                  group1={this.props.group1}
                  group2={this.props.group2}
                  changeRoom={this.changeRoom}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </Layout>
    );
  }
}

export default Administrator;
