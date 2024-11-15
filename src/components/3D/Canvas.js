import React from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Card from './Card';
import { useSpring, a } from '@react-spring/three';
import { useGesture } from '@use-gesture/react';

function CardContainer({ data, onClick, onPointerEnter, onPointerLeave }) {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const [spring, set] = useSpring(() => ({
    scale: [1, 1, 1],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    config: { friction: 50 },
  }));
  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => set({ position: [(x * 2) / aspect, 0, 0] }),
  });

  return (
    <>
      <a.group {...spring} {...bind()} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
        {data.map((cardData, index) => {
          const cardPositionX = index * 5;

          return (
            <Card
              onClick={() => onClick(cardData)}
              data={cardData}
              position={[cardPositionX, 0, 0]}
              battleRound={cardData.battle_rounds && cardData.battle_rounds[1]}
            />
          );
        })}
      </a.group>
    </>
  );
}

export default function CardCanvas({ data, onClick, onPointerEnter, onPointerLeave, style, carousel }) {
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
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={75} near={0.1} far={1000} />
        <Environment preset="park" />
        {carousel ? (
          <CardContainer
            data={data}
            onClick={(data) => onClick(data)}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
          />
        ) : (
          data.map((cardData, index) => {
            const xPos = (index - (data.length - 1.45) / 2) * 4.5; // Center cards based on data length
            return (
              <group position={[xPos+0.06, -1, 0]}>
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
          })
        )}
      </Canvas>
    </div>
  );
}
