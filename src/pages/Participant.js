import React , {Component} from 'react';
import Layout from '../components/Layout';
import {Header, Grid} from 'semantic-ui-react';
import Conference from '../Conference';
import PartFuncHelper from './PartFuncList';
import YOYO from '../YOYO';

class Participant extends Component {
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
          Student/Participant
        </Header>

        <Grid celled>
        <Grid.Row>
            <Grid.Column width={13}>
            {/* <Conference inline-block /> */}
            <YOYO inline-block  test={this.setV} roomName={this.state.roomName}/>
            </Grid.Column>
            <Grid.Column width={3}>
            <PartFuncHelper userlist={this.state.arr} roomName={this.state.roomName} />
            </Grid.Column>
        </Grid.Row>
        </Grid>

      </Layout>
    );
  }
}

export default Participant;
