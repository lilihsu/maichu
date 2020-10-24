import React from "react";

const VideoConference = (roomName) => {
  
  const jitsiContainerId = "jitsi-container-id";

  const [jitsi, setJitsi] = React.useState({});
  
  const loadJitsiScript = () => {
      let resolveLoadJitsiScriptPromise = null;
  
      const loadJitsiScriptPromise = new Promise((resolve) => {
        resolveLoadJitsiScriptPromise = resolve;
      });
  
      const script = document.createElement("script");
      script.src = "https://meet.jit.si/external_api.js";
      script.async = true;
      script.onload = resolveLoadJitsiScriptPromise
      document.body.appendChild(script);
  
      return loadJitsiScriptPromise;
    };

  const initialiseJitsi = async () => {
    if (!window.JitsiMeetExternalAPI) {
      await loadJitsiScript();
    }

    const _jitsi = new window.JitsiMeetExternalAPI("meet.jit.si/", {
        roomName: roomName,
    width: 500,
    height: 300,
      parentNode: document.getElementById(jitsiContainerId),
    });

    setJitsi(_jitsi)
  };

const showuser = async() => {
    console.log(jitsi._participants);
}

const getdevice = async() => {
  jitsi.getCurrentDevices();
}
  React.useEffect(() => {
    initialiseJitsi();

    return () => jitsi?.dispose?.();
  }, []);
   
  return (
      <>
        <div id={jitsiContainerId} style={{ height: 500, width: 300 }} />
        {console.log(jitsi)}
        <button onClick={showuser}>press</button>
        <button onClick={getdevice}>getdevice</button>
      </>);
};

export default VideoConference;



  