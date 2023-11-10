import './App.css';
import Battle from './components/Battle';
import Missions from './components/Missions';
import Rules from './components/Rules';
import { useState } from 'react';

function App() {

  const [phase, setPhase] = useState(1);

  return (
    <div className="App">
      <header className="App-header">
      </header>
        <div style={{display:"flex", justifyContent:"center", textAlign:"left"}}>
          {phase === 1 && <Rules nextPhase={()=>setPhase(2)}/>}
          {phase === 2 && <Missions nextPhase={()=>setPhase(3) }/>}
          {phase === 3 && <Battle/>}
        </div>
    </div>
  );
}

export default App;
