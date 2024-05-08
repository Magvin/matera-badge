import React, { useRef, useState, useMemo } from "react";
import { useGLTF, Text, Extrude } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RoundedPlane = ({
  width,
  height,
  radius,
  position,
  rotation,
  material,
}) => {
  const roundedShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = -width / 2;
    const y = -height / 2;

    shape.moveTo(x, y + radius);
    shape.lineTo(x, y + height - radius);
    shape.quadraticCurveTo(x, y + height, x + radius, y + height);
    shape.lineTo(x + width - radius, y + height);
    shape.quadraticCurveTo(
      x + width,
      y + height,
      x + width,
      y + height - radius
    );
    shape.lineTo(x + width, y + radius);
    shape.quadraticCurveTo(x + width, y, x + width - radius, y);
    shape.lineTo(x + radius, y);
    shape.quadraticCurveTo(x, y, x, y + radius);

    return shape;
  }, [width, height, radius]);

  const extrudeSettings = useMemo(
    () => ({
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 2,
    }),
    []
  );

  return (
    <Extrude
      args={[roundedShape, extrudeSettings]}
      position={position}
      rotation={rotation}
    >
      <mesh color="white" material={material} castShadow receiveShadow />
    </Extrude>
  );
};

export function Model(props) {
  const { nodes, materials } = useGLTF("/Badge_03.glb");
  const badgeRef = useRef();
  const textRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Function to toggle hover state
  const handleHover = () => setHovered(!hovered);

  // useFrame to animate rotation
  useFrame(() => {
    if (badgeRef.current) {
      // Rotate towards 180 degrees when hovered, and return to 0 otherwise
      const targetRotation = hovered ? Math.PI : 0;
      badgeRef.current.rotation.y +=
        (targetRotation - badgeRef.current.rotation.y) * 0.05;
      textRef.current.rotation.y +=
        (targetRotation - textRef.current.rotation.y) * 0.05;
    }
  });


  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Badge_LP.geometry}
          material={materials.Badge_mat_01}
          ref={badgeRef}
          position={[0, 0, -69.251]}
          rotation={[Math.PI / 2, 0, -Math.PI / 6]}
          scale={0.71}
          onPointerOver={handleHover}
          onClick={handleHover}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Frame_LP001.geometry}
          material={materials.Badge_mat_01}
        />
        <group
          name="Text"
          position={[0, 0.069, -24.348]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={[0.8, 0.8, 1]}
          ref={textRef}
        >
          <Text
            fontSize={12}
            maxWidth={100}
            font="/RobotoCondensed-Bold.ttf"
            lineHeight={1}
            letterSpacing={0.02}
            textAlign={"center"}
            anchorX="center"
            anchorY="middle"
            material={materials.Text_mat_01}
            position={[0, 58, -2.246]}
            rotation={[-Math.PI, 0, -Math.PI]}
          >
            SamHuber
          </Text>
          <Text
            maxWidth={100}
            material={materials.Text_mat_01}
            font="/RobotoCondensed-Bold.ttf"
            fontSize={10}
            position={[0.589, 65.891, 2.414]}
          >
            Total Points
          </Text>
          <Text
             font="/RobotoCondensed-Bold.ttf"
            fontSize={18}
            material={materials.Text_mat_01}
            position={[0, 45.891, 2.414]}
          >
            1200
          </Text>
        </group>
        <group position={[0, 0.926, 5.824]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Bonus.geometry}
            material={materials.Text_mat_01}
            position={[26.579, 0.738, -22.94]}
            scale={0.147}
          />
           <Text
            color='black'
            fontSize={3}
            maxWidth={100}
            font="/RobotoCondensed-Bold.ttf"
            lineHeight={1}
            letterSpacing={0.02}
            textAlign={"center"}
            anchorX="center"
            anchorY="middle"
            position={[30.519, 1, -18.556]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            +750
          </Text>
          <RoundedPlane
            width={10}
            height={5}
            radius={0.5}
            position={[30.519, 0.735, -18.556]}
            rotation={[-Math.PI / 2, 0, 0]}
            material={materials.Text_mat_01}
          />
          
          <Text
            fontSize={3}
            maxWidth={100}
            font="/RobotoCondensed-Regular.ttf"
            lineHeight={1}
            letterSpacing={0.02}
            textAlign={"center"}
            anchorX="center"
            anchorY="middle"
            material={materials.Text_mat_01}
            position={[-27.8, 0.738, -23.044]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            SamHuber
          </Text>

          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Instagram.geometry}
            position={[-24.321, 0.738, -17.047]}
            scale={[0.339, 0, 0.339]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Twitter.geometry}
            position={[-34.094, 0.738, -17.045]}
            scale={[0.339, 0, 0.339]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.youtube.geometry}
            position={[-29.207, 0.738, -17.046]}
            scale={[0.339, 0, 0.339]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/Badge_03.glb");
