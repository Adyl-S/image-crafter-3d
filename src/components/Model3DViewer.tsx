
import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface Model3DViewerProps {
  imageUrl: string;
}

const ImagePlane = ({ imageUrl }: { imageUrl: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(imageUrl);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};

export const Model3DViewer = ({ imageUrl }: Model3DViewerProps) => {
  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden border">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ImagePlane imageUrl={imageUrl} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};
