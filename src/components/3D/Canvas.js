import React, {  useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Card from './Card';
import { useSpring, a } from '@react-spring/three';
import { useGesture } from '@use-gesture/react';
import { clamp } from 'three/src/math/MathUtils.js';

function CardContainer({ data, onClick, onPointerEnter, onPointerLeave, selected }) {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const cardWidth = 1; // Adjust based on your card size
  const gap = 2.9; // Space between cards
  const totalWidth = data.length * (cardWidth + gap);


  console.log(totalWidth)


  const [spring, set] = useSpring(() => ({
    scale: [1, 1, 1],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    config: { friction: 40 },
  }));
  
  // Keep track of current position manually
  const previousPositionRef = useRef(0);
  
  const bind = useGesture({
    onDrag: ({ movement: [x], last }) => {
      let adjustedX = previousPositionRef.current + (x * 2) / aspect;
  
      // Apply rubber-banding effect if out of bounds
      if (adjustedX > 0) {
        adjustedX = adjustedX / (1 + adjustedX / 10);
      } else if (adjustedX < -totalWidth) {
        adjustedX = -totalWidth + (adjustedX + totalWidth) / (1 - (adjustedX + totalWidth) / 10); // Scale down beyond left bound
      }
  
      set({ position: [adjustedX, 0, 0] });
  
      if (last) {
        const snappedX = clamp(adjustedX, -totalWidth, 0); 
        set({ position: [snappedX, 0, 0] });
        previousPositionRef.current = snappedX
        
      }
    },
  });
  

  
  return (
    <>
      <a.group {...spring} {...bind()} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
        {data.map((cardData, index) => {
          const cardPositionX = index * 4.5;
          const outline = selected.filter((selected) => selected === cardData).length>=1 ? true : false

          return (
            <group position={[cardPositionX + 0.6, -2, 0]}>
              <Card
                onClick={() => onClick(cardData)}
                data={cardData}
                outlines={outline}
                battleRound={cardData.battle_rounds && cardData.battle_rounds[1]}
              />
            </group>
          );
        })}
      </a.group>
    </>
  );
}

export default function CardCanvas({ data, onClick, onPointerEnter, onPointerLeave, style, carousel, selected }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        ...style,
      }}
    >
      <Canvas dpr={[1, 2]} gl={{ antialias: true }} style={{ background: 'transparent' }}>
        <PerspectiveCamera makeDefault position={[0, 0, carousel ? 6 : 6+6*(data.length-1)]} fov={75} near={0.1} far={1000} />
        
        <Environment preset="park" />
        {carousel ? (
          <CardContainer
            selected = {selected}
            data={data}
            onClick={(data) => onClick(data)}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
          />
        ) : (
        <>
        <OrbitControls/>
        {data.map((cardData, index) => {
            const zPos = -10*(data.length-1)
            console.log(zPos)
            const xPos = (index - (data.length - 1.45) / 2) * 4.5; // Center cards based on data length
            return (
              <group position={[xPos + 0.06, -2, 0 ]}>
                <Card
                  key={index}
                  data={cardData}
                  battleRound={cardData.battle_rounds && cardData.battle_rounds[1]}
                  // Cards stay in fixed position relative to camera
                  rotation={[0.02, 0, 0]}
                  onClick={() => onClick(cardData)}
                  onPointerEnter={onPointerEnter}
                  onPointerLeave={onPointerLeave}
                />
              </group>
            );
          })}
        
        </>
          
        )}
      </Canvas>
    </div>
  );
}
