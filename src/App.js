import './App.css';
import Battle from './components/Battle';
import Missions from './components/Missions';
import Rules from './components/Rules';
import { useEffect, useState } from 'react';
import { useStore } from '../src/store/store';

function App() {
  const turn = useStore((state) => state.turn);
  const [phase, setPhase] = useState(1); // Default phase while loading


  useEffect(() => {
    // Set initial phase based on turn value from the store
    setPhase(turn >= 1 ? 3 : 1);
  }, [turn]);

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div style={{ display: "flex", justifyContent: "center", textAlign: "left" }}>
        {phase === 1 && <Rules nextPhase={() => setPhase(2)} />}
        {phase === 2 && <Missions nextPhase={() => setPhase(3)} />}
        {phase === 3 && <Battle />}
      </div>
    </div>
  );
}


export default App;
