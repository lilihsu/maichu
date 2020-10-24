import React, { useState ,useEffect} from 'react'
import Jitsi from 'react-jitsi'
import { database, storage } from "./firebase";
import imageDataURI from 'image-data-uri';
import base64Img from 'base64-img';
import dataURLtoBlob from 'dataurl-to-blob';
import Dictaphone from './Speech';
const YOYO = (props) => {
 

  const [displayName, setDisplayName] = useState('')
  // const [roomName, setRoomName] = useState('')
  const [sendmessage, setSendMessage] = useState('')
  const [receivemessage = '', setreceiveMessage] = useState('')
  const [password, setPassword] = useState('')
  const [onCall, setOnCall] = useState(false)
  const [userlist, setuserlist] = useState('')
  const [api,setapi] = useState('');
  const [flag = false ,setflag] = useState('');
  const [picArray,setpicArray] = useState([]);
  const [chsnName,setChsnName]=useState('');
  // setTimeout(() => {
  //   if(flag){
  //     screenshot();
  //   }
  // }, 500);

  useEffect(()=>{
    database.ref('candidate').on('value',e=>{
      setChsnName(e.val().id);
      console.log(e.val())
    });
  })

  const uploadImage = (image)=>{
    //storage.child('screenShot').delete();
    let time=new Date().getTime();
    storage.ref(`screenShot/${time}`).put(image);
  }
  const showuser = async() => {
    let temp = await api.getParticipantsInfo()
    setuserlist(temp);
    console.log(temp);
    props.test(temp)
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
        roomName={props.roomName}
        displayName={displayName}
        password={password}
        containerStyle={{ width: props.width, height: '600px' }}
        frameStyle={{display:true}}
        onAPILoad={JitsiMeetAPI => {console.log('Good Morning everyone!'); setapi(JitsiMeetAPI)}}
      />
      <button onClick={showuser}>press</button>
      <button onClick={getdevice}>getdevice</button>
      <input type='text' placeholder='Send Message!' value={sendmessage} onChange={e => setSendMessage(e.target.value)} />
      <button onClick={screenshot}>ENTER</button>
      <Dictaphone Name = {displayName}/>
      {/* <img  src={receivemessage} width='400px' height='300px'/> */}
      
      </>
      )
    : (
      <>
        <h1>Crate a Meeting</h1>
        <input type='text' placeholder='Your name' value={displayName} onChange={e => setDisplayName(e.target.value)} />
        <button onClick={() => setOnCall(true)}> Let&apos;s start!</button>
        
      </>
    )
 
}

export default YOYO