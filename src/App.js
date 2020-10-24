import logo from './logo.svg';
import './App.css';
import Index1 from './Index1';

import VideoConference from './VideoConference'


function App() {
  return (
    <div className="App">
      <script src='https://meet.jit.si/external_api.js'></script>
      <header className="App-header">
        <VideoConference></VideoConference>
      </header>
    </div>
  );
}

export default App;
