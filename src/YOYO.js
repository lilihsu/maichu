import React, { useState } from 'react'
import Jitsi from 'react-jitsi'
 
const YOYO = () => {
 

  const [displayName, setDisplayName] = useState('')
  const [roomName, setRoomName] = useState('')
  const [sendmessage, setSendMessage] = useState('')
  const [receivemessage = '', setreceiveMessage] = useState('')
  const [password, setPassword] = useState('')
  const [onCall, setOnCall] = useState(false)
  const [userlist, setuserlist] = useState('')
  const [api,setapi] = useState('');
  const [flag = false ,setflag] = useState('');
  const [picArray,setpicArray] = useState([]);

  // setTimeout(() => {
  //   if(flag){
  //     screenshot();
  //   }
  // }, 500);

  const showuser = async() => {
    setuserlist(await api.getParticipantsInfo());
    console.log(userlist);
  }

  const getdevice = async() => {
    console.log(await api.getCurrentDevices());
  }

  const screenshot = async()=>{
    setflag(false);
    setreceiveMessage('');
    await api.resizeLargeVideo('400px', '300px');
    await api.captureLargeVideoScreenshot().then(dataURL => {
      // console.log(dataURL);
      // console.log(receivemessage);
      setreceiveMessage(dataURL.dataURL);
      
      //setpicArray(dataURL.dataURL)
      //console.log(picArray[0]);
      setflag(true);
      // dataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAA..."
  });

  }
  return onCall
    ? (
      <>
      <Jitsi
        roomName={roomName}
        displayName={displayName}
        password={password}
        containerStyle={{ width: '400px', height: '300px' }}
        frameStyle={{display:true}}
        onAPILoad={JitsiMeetAPI => {console.log('Good Morning everyone!'); setapi(JitsiMeetAPI)}}
      />
      <button onClick={showuser}>press</button>
      <button onClick={getdevice}>getdevice</button>
      <input type='text' placeholder='Send Message!' value={sendmessage} onChange={e => setSendMessage(e.target.value)} />
      <button onClick={screenshot}>ENTER</button>
      
      <img  src={receivemessage} width='400px' height='300px'/>
      
      </>
      )
    : (
      <>
        <h1>Crate a Meeting</h1>
        <input type='text' placeholder='Room name' value={roomName} onChange={e => setRoomName(e.target.value)} />
        <input type='text' placeholder='Your name' value={displayName} onChange={e => setDisplayName(e.target.value)} />
        <button onClick={() => setOnCall(true)}> Let&apos;s start!</button>
      </>
    )
 
}

export default YOYO