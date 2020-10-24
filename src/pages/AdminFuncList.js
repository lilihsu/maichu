import React , {Component} from 'react';
import { Message, Input, Form, Grid, Button } from 'semantic-ui-react';

class FunctionHelper extends Component {
    state = {
        de : true,
        group: false,
        queue: false,
        qa: false,
        cs: false

    }
    constructor(props) {super(props)}
    
    handleGroup = () => {
        this.setState({de:false, group: true, queue: false, qa: false ,cs: false})
    }
    handleQueue = () => {
        this.setState({de:false, group: false, queue: true, qa: false ,cs: false})
    }
    handleQA = () => {
        this.setState({de:false, group: false, queue: false, qa: true,cs: false})
    }
    handleCS = () => {
        this.setState({de:false, group: false, queue: false, qa: false,cs: true})
    }
    handleEmotion = () => {
        this.setState({de:false, group: false, queue: false, qa: false,cs: false})
    }
    handleBack = (e) => {
        this.setState({de:true, group: false, queue:false, qa:false,cs: false})
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
                    <Grid.Row centered>
                        <Button onClick={this.handleQA} >
                            Q/A Mode
                        </Button>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Button onClick={this.handleCS}>
                            Choose speaking
                        </Button>
                    </Grid.Row>
                </Grid>) : 
                this.state.group ? <Group handler={this.handleBack} /> : 
                this.state.queue ? <Queue handler={this.handleBack} /> :
                this.state.qa ? <QA handler={this.handleBack} /> : 
                this.state.cs ? <ChooseSpeaker handler={this.handleBack} /> : 
                <EmotionDetect handler={this.handleBack} 
                    emotion={this.props.emotion}
                />

            
        )
        
    }
}

class Group extends Component {
    constructor(props) {
        super(props);
    }
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

class ChooseSpeaker extends Component {
    render(){
        return (<Button icon="angle left" onClick={this.props.handler} />);
    }
}

class QA extends Component {
    render(){
        return (<Button icon="angle left" onClick={this.props.handler} />);
    }
}

class EmotionDetect extends Component {
    state={
        id: "",
        show: false
    }
    constructor(props){super(props)}
    handleSubmit = () => {
        this.setState({show: true})
    }
    render(){
        return(
            <>
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <Input placeholder="Student ID"
                        onChange={event=>this.setState({id:event.target.value})}
                    />
                </Form.Field>
                <Button type="submit">Check</Button>
            </Form>
            <Message visible={!!this.props.emotion}>
                <Message.Header>{this.props.emotion}</Message.Header>
            </Message>
            </>
        )
    }
}

export default FunctionHelper;
