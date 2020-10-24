import React , {Component} from 'react';
import { Grid, Button } from 'semantic-ui-react';
import {database} from "../firebase/";

class FunctionHelper extends Component {
    state = {
        de : true,
        group: false,
    }
    
    handleGroup = () => {
        this.setState({ de: false, group: true })
    }
    handleQueue = () => {
        this.setState({de:false, group: false})
    }
    handleBack = (e) => {
        this.setState({de:true, group: false})
    }
    chooseSpeaker=(name)=>{
        database.ref('candidate').set({id:name})
      }
    clearSpeaker=()=>{
        database.ref('candidate').set({id:''})
    }
    render() {
        
        return(
            this.state.de ? 
                (<Grid>
                    <Grid.Row columns="two" divided>
                        <Grid.Column>
                            <Button primary onClick={this.handleGroup} >
                                Group
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button primary onClick={this.handleQueue} >
                                Queue
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>) : 
                this.state.group ? <Group handler={this.handleBack} /> : <Queue handler={this.handleBack} />

            
        )
        
    }
}

class Group extends Component {
    render(){
        return <div>
            <Button icon="angle left" onClick={this.props.handler} />
        </div>
    }
}

class Queue extends Component {
    render(){
        return (<Button icon="angle left" onClick={this.props.handler} />);
    }
}

export default FunctionHelper;