import React , {Component} from 'react';
import Layout from '../components/Layout';
import {Header, Grid} from 'semantic-ui-react';
import YOYO from '../YOYO';
import AdminFuncHelper from './AdminFuncList';


class Administrator extends Component {
  constructor(props) {
    super(props);
    this.state={
      roomName: "",
      arr:[]
    }
  }
  
  setV = (Value) => {
    this.setState({arr:Value})
  }
  getV = () => {
    return this.state.arr;
  }
  render() {
    return (
      <Layout>
        <script src='https://meet.jit.si/external_api.js'></script>
        <Header as="h2">
          Teacher/Administrator
          <input type='text' placeholder='Room name' value={this.state.roomName} onChange={e => this.setState({roomName: e.target.value})} />
        </Header>
          <Grid celled>
            <Grid.Row>
              <Grid.Column width={13}>
                {/* <Conference inline-block /> */}
                <YOYO inline-block  test={this.setV} roomName={this.state.roomName}/>
              </Grid.Column>
              <Grid.Column width={3}>
                <AdminFuncHelper  userlist={this.state.arr} roomName={this.state.roomName}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </Layout>
    );
  }
}

export default Administrator;
