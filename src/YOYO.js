import React, { useState } from 'react'
import Jitsi from 'react-jitsi'
import VideoConference from './VideoConference'
 
const YOYO = () => {
 
  const [displayName, setDisplayName] = useState('')
  const [roomName, setRoomName] = useState('')
  const [password, setPassword] = useState('')
  const [onCall, setOnCall] = useState(false)
  const [api,setapi] = useState('');
 

  const showuser = async() => {
    console.log(await api.getParticipantsInfo());
  }

  const getdevice = async() => {
    console.log(await api.getCurrentDevices());
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