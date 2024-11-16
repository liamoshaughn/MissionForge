import { Model } from './Geometries/Card';
import { Text } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { TextureLoader, ClampToEdgeWrapping } from 'three';



function TexturedPlane(props) {
    // Load the image texture
    const texture = useLoader(TextureLoader, props.image);
    texture.wrapS = ClampToEdgeWrapping;
    texture.wrapT = ClampToEdgeWrapping;
    texture.needsUpdate = true;

    const imageAspectRatio = texture.image.width / texture.image.height;
  const planeWidth = 5; // Choose any width you like
  const planeHeight = planeWidth / imageAspectRatio; // Height based on aspect ratio

  return (
    <mesh position={[-1.1, 1.5, -0.7]} scale={0.7}>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshStandardMaterial map={texture} />
    </mesh>
    );
  }

function Card({ onClick, data, ...props }) {
  const cardRef = useRef();

  let time = 0 + Math.random() * 3;



  useFrame(() => {
    if (cardRef.current) {
      time += 0.008; // Control the speed of movement
      cardRef.current.position.y = Math.sin(time) * 0.02; //range
    }
  });

  return (
    <group ref={cardRef} onClick={() => onClick()} {...props}>
      {/* 3D Card Model */}
      <Model outlines={props.outlines} position={[0, 0, 0]} rotation={[-0.06, Math.PI / 2, Math.PI / 50]} />
      {/* 3D Text positioned above the card */}
      <mesh position={[-1.1, 1.5, -0.75]}>
            <planeGeometry args={[3.7   , 4.5]} /> {/* Width and height to cover both lines of text */}
            <meshStandardMaterial color="black" transparent opacity={0.8} />
        </mesh>
      <Text
        position={[-1.1, 3.7, -0.7]} 
        fontSize={0.3} 
        color="white" 
        anchorX="center" 
        anchorY="top" 
        maxWidth={3}
        fontWeight="bold"
      >
        {data.name}
      </Text>
      <Text
        position={[-1.1, 2.7, -0.7]}
        fontSize={0.087}
        color="white"
        anchorX="center"
        anchorY="top"
        maxWidth={3.5}
        fontWeight="normal"
      >
        {data.special}
        {props.battleRound}
        {data.rule}
        {data.mission}
      </Text>
      {data.image && <TexturedPlane image={data.image}/>}
    </group>
  );
}

export default Card;
