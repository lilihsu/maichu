import React, { useState } from 'react'
import Jitsi from 'react-jitsi'
import { storage } from "./firebase";
import imageDataURI from 'image-data-uri';
import base64Img from 'base64-img';
import dataURLtoBlob from 'dataurl-to-blob';
import Dictaphone from './Speech';
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
  const uploadImage = (image)=>{
    //storage.child('screenShot').delete();
    storage.ref(`screenShot/${image.name}`).put(image);
  }
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
    await api.captureLargeVideoScreenshot().then(async dataURL => {
      //console.log(dataURL.dataURL.split(',')[1]);
      // // 
      
      setreceiveMessage(dataURL.dataURL);
      // Some image data uri
      let a =await  dataURLtoBlob(dataURL.dataURL);
      let b = new Date().getTime();//何政儒要的時間戳記
      console.log(b);
        uploadImage(a);//uploadImage(a,b);
      
      console.log(a);
      // base64Img.img(dataURL.dataURL, 'dest', '1', function(err, filepath) {
      //   console.log(filepath);
      // });
      // It will create the full path in case it doesn't exist
      // If the extension is defined (e.g. fileName.png), it will be preserved, otherwise the lib will try to guess from the Data URI
      // let filePath = './out/path/filename';
      
      // // // // Returns a Promise
      // imageDataURI.outputFile(dataURL.dataURL, filePath).then(res => console.log(res))
      //  console.log(receivemessage);
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
      <Dictaphone />
      {/* <img  src={receivemessage} width='400px' height='300px'/> */}
      
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