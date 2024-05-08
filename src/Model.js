import React, { useRef, useState } from 'react';
import { useGLTF, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function Model(props) {
  const { nodes, materials } = useGLTF('/Badge_01.glb');
  const badgeRef = useRef();
  const textRef = useRef()
  const [hovered, setHovered] = useState(false);

  // Function to toggle hover state
  const handleHover = () => setHovered(!hovered);

  // useFrame to animate rotation
  useFrame(() => {
    if (badgeRef.current) {
      // Rotate towards 180 degrees when hovered, and return to 0 otherwise
      const targetRotation = hovered ? Math.PI : 0;
      badgeRef.current.rotation.y += (targetRotation - badgeRef.current.rotation.y) * 0.05;
      textRef.current.rotation.y += (targetRotation - textRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <group >
        <mesh
          castShadow
          receiveShadow
          name='plane'
          ref={badgeRef}
          geometry={nodes.Badge_LP.geometry}
          material={materials.Badge_mat_01}
          position={[0, 0, -69.25]}
          rotation={[Math.PI / 2, 0, -Math.PI / 6]}
          scale={0.71}
          onPointerOver={handleHover}
          onClick={handleHover}
        />
         <group
            name="Text"
            position={[0, 0.069, -24.348]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[0.8, 0.8, 1]}
            ref={textRef}
          >
            <Text
              color='white'
              fontSize={12}
              maxWidth={100}
              font="/AlegreyaSansSC-Bold.otf"
              lineHeight={1}
              letterSpacing={0.02}
              textAlign={"center"}
              anchorX="center"
              anchorY="middle"
              position={[0, 58, -1.246]}
              rotation={[-Math.PI, 0, -Math.PI]}
            >
              SamHuber
            </Text>
            <Text
              color="white"
              maxWidth={100}
              font="/AlegreyaSansSC-Bold.otf"
              fontSize={10}
              position={[0.589, 65.891, 1.414]}
            >
              Total Points
            </Text>
            <Text
              font="/AlegreyaSansSC-Bold.otf"
              color="white"
              fontSize={18}
              position={[0, 45.891, 1.414]}
            >
              1200
            </Text>
          </group>
        </group>
          <mesh
            castShadow
            receiveShadow
            name='Badge'
            geometry={nodes.Frame_LP001.geometry}
            material={materials.Badge_mat_01}
            
          />
         
      </group>
    </group>
  );
}

useGLTF.preload('/Badge_01.glb');
