import React from "react";

const VideoConference = () => {
  
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
        roomName: 'JitsiMeetAPIExample',
    width: 880,
      parentNode: document.getElementById(jitsiContainerId),
    });

    setJitsi(_jitsi)
  };

  React.useEffect(() => {
    initialiseJitsi();

    return () => jitsi?.dispose?.();
  }, []);
   
  return (
      <>
        <div id={jitsiContainerId} style={{ height: 500, width: 300 }} />
        
      </>);
};

export default VideoConference;



  