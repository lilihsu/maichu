import React, { useState } from 'react'
import Jitsi from 'react-jitsi'
<<<<<<< HEAD
import VideoConference from './VideoConference'
=======
>>>>>>> ui
 
const Conference = (props) => {
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
        containerStyle={{ width: props.width, height: '600px' }}
        frameStyle={{display:true}}
        onAPILoad={JitsiMeetAPI => {console.log('Good Morning everyone!'); setapi(JitsiMeetAPI)}}
      />
      <button onClick={showuser}>press</button>
      <button onClick={getdevice}>getdevice</button>
      </>
      )
    : (
      <>
<<<<<<< HEAD
        <h1>Crate a Meeting</h1>
        <input type='text' placeholder='Room name' value={roomName} onChange={e => setRoomName(e.target.value)} />
        <input type='text' placeholder='Your name' value={displayName} onChange={e => setDisplayName(e.target.value)} />
        <button onClick={() => setOnCall(true)}> Let&apos;s start!</button>
=======
        <h1>Create a Meeting</h1>
        <input type='text' placeholder='Room name' value={roomName} onChange={e => setRoomName(e.target.value)} />
        <input type='text' placeholder='Your name' value={displayName} onChange={e => setDisplayName(e.target.value)} />
        <button onClick={() => setOnCall(true)}> Let's start!</button>
>>>>>>> ui
      </>
    )
 
}

export default Conference