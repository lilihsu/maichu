import React , {Component} from 'react';
import Layout from '../components/Layout';
import {Header, Grid} from 'semantic-ui-react';
import YOYO from '../YOYO';
import AdminFuncHelper from './AdminFuncList';
import {database} from "../firebase/";

class Administrator extends Component {
  constructor(props){
    super(props)
    this.state={
      emotion:null
    }
  }
  componentDidMount(){
    database.ref('CUR_EMOTION').on('value',e=>{
      this.setState({emotion:e.val()});
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
                <YOYO inline-block />
              </Grid.Column>
              <Grid.Column width={3}>
                <AdminFuncHelper />
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </Layout>
    );
  }
}

export default Administrator;
