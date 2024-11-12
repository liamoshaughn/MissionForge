import './App.css';
import Battle from './components/Battle';
import Missions from './components/Missions';
import Rules from './components/Rules';
import { useEffect, useState } from 'react';
import { useStore } from '../src/store/store';
import Format from './components/Format';

function App() {
  const turn = useStore((state) => state.turn);
  const [phase, setPhase] = useState(0); // Default phase while loading


  useEffect(() => {
    // Set initial phase based on turn value from the store
    setPhase(turn >= 1 ? 3 : 0);
  }, [turn]);

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div style={{ display: "flex", justifyContent: "center", textAlign: "left" }}>
        {phase === 0 && <Format nextPhase={() => setPhase(1)}/>}
        {phase === 1 && <Rules nextPhase={() => setPhase(2)} />}
        {phase === 2 && <Missions nextPhase={() => setPhase(3)} />}
        {phase === 3 && <Battle />}
      </div>
    </div>
  );
}


export default App;
