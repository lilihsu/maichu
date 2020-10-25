import React , {Component} from 'react';
import { Grid, Button,Form,Message,Input } from 'semantic-ui-react';
import { storage ,database} from "../firebase";

class FunctionHelper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            de : true,
            group: false,
            queue: false,
            qa: false,
            array : [],
            processedUserList: [],
            qqaamode:true,
            rank:[]
        }
    }


    getuserlist=()=>{
        console.log(this.props.userlist)
        if(this.props.userlist == null || this.props.userlist == undefined ){
            alert("Please retry again ")
        }
        else{
            //對userlist做處理
            let temp = this.props.userlist
            console.log(temp);
            this.setState({processedUserList: temp});
            this.forceUpdate();
        }
    }
    
    handleGroup = () => {
        this.setState({de:false, group: true, queue: false, qa: false ,cs: false})
    }
    handleQueue = async () => {
        let rank = await this.props.getSpeakTime();
        this.setState({rank: rank});
        this.setState({de:false, group: false, queue: true, qa: false ,cs: false})
    }
    handleQA = () => {
        this.setState({de:false, group: false, queue: false, qa: true})
        if(this.state.qqaamode){//foreign
            //f to a
            this.setState({qqaamode : false})
        }
        else{
            //a to f
            this.setState({qqaamode : true})
        }
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
                    <Grid.Row centered>
                        <Button primary onClick={this.handleQueue} >
                            Queue
                        </Button>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Button onClick={this.handleQA} >
                            Q/A Mode
                        </Button>
                    </Grid.Row>
                    <Grid.Row centered>
                    <Button onClick={this.getuserlist}>
                            get user
                        </Button>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Button onClick={this.handleEmotion}>
                            Check Student Emotion
                        </Button>
                    </Grid.Row>
                </Grid>) : 
                this.state.group ? <Group handler={this.handleBack} /> : 
                this.state.queue ? <Queue handler={this.handleBack} rank={this.state.rank} /> :
                this.state.qa ? <QA handler={this.handleBack}  mode={this.state.qqaamode}/> : 
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
    chooseSpeaker= async (name)=>{
        await database.ref('candidate').set({id:name});
        setTimeout(()=>{
            database.ref('candidate').set({id:''});
        },100)
      }
    render(){
        return (
            <>
            
            <Button icon="angle left" onClick={this.props.handler} />
            <br/>
            <br/>
            {this.props.rank.map((user)=>
            <>
            <div key={user.name}>
                <Button onClick={()=>{this.chooseSpeaker(user.name)}}>{user.name}</Button>
                <div>speakTime : {user.time/1000} seconds</div>
                </div>
                </>
            )}
            </>
            );
    }
}

class ChooseSpeaker extends Component {
    render(){
        return (
            <>
        <Button icon="angle left" onClick={this.props.handler} />
            <br/>
            <br/>
            {this.props.userlist.map((user)=>
                <Button>{user.displayName}</Button>
            )}
            </>
        );
    }
}

class QA extends Component {
    render(){
        return (
        <>
        <Button icon="angle left" onClick={this.props.handler} />
        <br/>
        <br/>
        {(!this.props.mode)?<div>this is Asian Mode</div>:<div>this is Foreign Mode</div>}
        </>
        );
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
            <Message visible={this.state.show}>
                <Message.Header>{this.props.emotion}</Message.Header>
            </Message>
            </>
        )
    }
}

export default FunctionHelper;
