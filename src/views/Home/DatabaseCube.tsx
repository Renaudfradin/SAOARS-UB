"use client";

import React, { useEffect } from "react";
import type { Object3D } from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";

const MODEL = "/models/cube.gltf";

function CubeModel() {
  const gltf = useGLTF(MODEL);
  const { actions } = useAnimations(gltf.animations, gltf.scene);

  useEffect(() => {
    gltf.scene.traverse((node: Object3D) => {
      if (node.name === "Camera") node.visible = false;
    });
  }, [gltf.scene]);

  useEffect(() => {
    const action = actions?.CubeAction;
    if (!action) return undefined;
    action.reset().fadeIn(0.2).play();
    return () => {
      action.fadeOut(0.2);
    };
  }, [actions]);

  return <primitive object={gltf.scene} />;
}

export default function DatabaseCube() {
  return (
    <Canvas
      className="overview__canvas"
      camera={{ zoom: 5, position: [13, 5, -10] }}
      gl={{ alpha: true, antialias: true }}
    >
      <OrbitControls enableZoom={false} enablePan={false} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <CubeModel />
    </Canvas>
  );
}

useGLTF.preload(MODEL);
