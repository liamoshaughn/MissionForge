import { useEffect, useState, useRef } from 'react';
import formats from '../components/data/formats.json';
import { useStore } from '../store/store';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Card from './3D/Card';
import CardCanvas from './3D/Canvas';

export default function Format(props) {
  const store = useStore();
  const [selectedFormat, setFormat] = useState(false);

  const handleClick = (selected) => {
    setFormat(selected);
  };

  useEffect(() => {
    if (selectedFormat && !store.gamemode && !store.gameRules) {
      console.log(selectedFormat)
      const gamemode = require('../components/data' + selectedFormat.src + '/deck.json');
      const gameRules = require('../components/data' + selectedFormat.src + '/rules.json');
      store.setGamemode(gamemode);
      store.setGameRules(gameRules);
      props.nextPhase();
    }
  }, [selectedFormat, store, props]);

  return (
    <div style={{ width: '50vw', display: 'flex', gap: '5vw', flexWrap: 'wrap' }}>
      <h1>Choose a Format</h1>
      <CardCanvas
        data={formats}
        onClick={(format) => handleClick(format)}
        onPointerEnter={null}
        onPointerLeave={null}
      />
    </div>
  );
}
