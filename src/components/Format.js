import { useEffect, useState } from 'react';
import formats from '../components/data/formats.json';
import { useStore } from '../store/store';

export default function Format(props) {
    const store = useStore();
    const [selectedFormat, setFormat] = useState(false)

    const handleClick = (selected) =>{
        setFormat(selected)
    };

    useEffect(() =>{
        if(selectedFormat && !store.gamemode && !store.gameRules ){
            const gamemode = require('../components/data'+selectedFormat.src+'/deck.json')
            const gameRules = require('../components/data'+selectedFormat.src+'/rules.json')
            store.setGamemode(gamemode)
            store.setGameRules(gameRules)
            props.nextPhase()
        }
    },[selectedFormat, store, props])
  return (
    <div style={{ width: '50vw', display: 'flex', gap: '5vw' }}>
      <h1>Choose a Format</h1>
      {formats.map((format) => {
        return (
            <div
            onClick={() => handleClick(format)}
            style={{
              flex: '1',
              padding: '10px',
              minWidth: '200px',
              position: 'relative',
              border: '1px solid white',
              transition: 'border-color 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'red'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'white'}
          >
            <h5>{format.name}</h5>
            <p style={{ fontSize: '10px', paddingBottom: '20px' }}>{format.lastUpdate}</p>
          </div>
        );
      })}
    </div>
  );
}
