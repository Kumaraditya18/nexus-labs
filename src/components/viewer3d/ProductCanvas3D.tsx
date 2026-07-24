'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { ExplodedComponent, ProductMaterial } from '@/data/products';
import { Layers, RotateCcw, Box } from 'lucide-react';

interface ProductCanvas3DProps {
  category?: string;
  materials?: ProductMaterial[];
  explodedComponents?: ExplodedComponent[];
  accentColor?: string;
  className?: string;
  initialExploded?: boolean;
}

export default function ProductCanvas3D({
  category = 'Audio',
  materials = [],
  explodedComponents = [],
  accentColor = '#ffffff',
  className = '',
  initialExploded = false
}: ProductCanvas3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState(false);
  const [exploded, setExploded] = useState(initialExploded);
  const [selectedMaterialIdx, setSelectedMaterialIdx] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activePart, setActivePart] = useState<string | null>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const partsRef = useRef<{ mesh: THREE.Mesh | THREE.Group; initialY: number; targetY: number }[]>([]);
  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  const buildModelGroup = useCallback((parentGroup: THREE.Group, cat: string, matColorHex: string) => {
    while (parentGroup.children.length > 0) {
      parentGroup.remove(parentGroup.children[0]);
    }
    partsRef.current = [];

    const baseColor = new THREE.Color(matColorHex);
    
    // High-Precision Studio Physical Material Shading (Photorealistic Metal & Glass)
    const primaryMat = new THREE.MeshPhysicalMaterial({
      color: baseColor,
      metalness: 0.92,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
      wireframe: wireframe
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
      roughness: 0.05,
      transmission: 0.92,
      thickness: 0.8,
      ior: 1.5,
      wireframe: wireframe
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(accentColor),
      metalness: 0.8,
      roughness: 0.2,
      wireframe: wireframe
    });

    const cushionMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1c1c21'),
      roughness: 0.8,
      metalness: 0.1,
      wireframe: wireframe
    });

    if (cat === 'Audio') {
      // Headphone / Earbud Assembly
      const headbandGeo = new THREE.TorusGeometry(1.6, 0.14, 32, 128, Math.PI);
      const headbandMesh = new THREE.Mesh(headbandGeo, primaryMat);
      headbandMesh.rotation.x = Math.PI / 2;
      headbandMesh.position.y = 1.2;

      // Left Earcup
      const cupGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.45, 64);
      const leftCup = new THREE.Mesh(cupGeo, glassMat);
      leftCup.position.set(-1.6, 0, 0);
      leftCup.rotation.z = Math.PI / 2;

      // Left Cushion
      const cushionGeo = new THREE.TorusGeometry(0.82, 0.18, 24, 64);
      const leftCushion = new THREE.Mesh(cushionGeo, cushionMat);
      leftCushion.position.set(-1.4, 0, 0);
      leftCushion.rotation.y = Math.PI / 2;

      // Right Earcup
      const rightCup = new THREE.Mesh(cupGeo, glassMat);
      rightCup.position.set(1.6, 0, 0);
      rightCup.rotation.z = Math.PI / 2;

      // Right Cushion
      const rightCushion = new THREE.Mesh(cushionGeo, cushionMat);
      rightCushion.position.set(1.4, 0, 0);
      rightCushion.rotation.y = Math.PI / 2;

      // Beryllium Transducer Drivers
      const driverGeo = new THREE.TorusGeometry(0.55, 0.08, 24, 64);
      const leftDriver = new THREE.Mesh(driverGeo, accentMat);
      leftDriver.position.set(-1.65, 0, 0);
      leftDriver.rotation.y = Math.PI / 2;

      const rightDriver = new THREE.Mesh(driverGeo, accentMat);
      rightDriver.position.set(1.65, 0, 0);
      rightDriver.rotation.y = Math.PI / 2;

      parentGroup.add(headbandMesh, leftCup, leftCushion, rightCup, rightCushion, leftDriver, rightDriver);

      partsRef.current = [
        { mesh: headbandMesh, initialY: 1.2, targetY: 1.2 },
        { mesh: leftCup, initialY: 0, targetY: 0 },
        { mesh: leftCushion, initialY: 0, targetY: 0 },
        { mesh: rightCup, initialY: 0, targetY: 0 },
        { mesh: rightCushion, initialY: 0, targetY: 0 },
        { mesh: leftDriver, initialY: 0, targetY: 0 },
        { mesh: rightDriver, initialY: 0, targetY: 0 }
      ];
    } else if (cat === 'Wearables') {
      const ringGeo = new THREE.TorusGeometry(1.4, 0.35, 48, 128);
      const ringMesh = new THREE.Mesh(ringGeo, primaryMat);

      const sensorGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.08, 32);
      const sensorMesh = new THREE.Mesh(sensorGeo, accentMat);
      sensorMesh.position.y = 1.4;

      parentGroup.add(ringMesh, sensorMesh);
      partsRef.current = [
        { mesh: ringMesh, initialY: 0, targetY: 0 },
        { mesh: sensorMesh, initialY: 1.4, targetY: 1.4 }
      ];
    } else {
      const baseGeo = new THREE.BoxGeometry(3.4, 0.18, 2.3);
      const baseMesh = new THREE.Mesh(baseGeo, primaryMat);

      const topGeo = new THREE.BoxGeometry(3.2, 0.05, 2.1);
      const topMesh = new THREE.Mesh(topGeo, glassMat);
      topMesh.position.y = 0.18;

      const logoGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.02, 32);
      const logoMesh = new THREE.Mesh(logoGeo, accentMat);
      logoMesh.position.y = 0.22;

      parentGroup.add(baseMesh, topMesh, logoMesh);
      partsRef.current = [
        { mesh: baseMesh, initialY: 0, targetY: 0 },
        { mesh: topMesh, initialY: 0.18, targetY: 0.18 },
        { mesh: logoMesh, initialY: 0.22, targetY: 0.22 }
      ];
    }
  }, [category, accentColor, wireframe]);

  useEffect(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    rendererRef.current = renderer;

    containerRef.current.appendChild(renderer.domElement);

    // 3-Point Studio Lighting Rig for Realistic Metal Reflections
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 10, 7);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe2e8f0, 1.5);
    fillLight.position.set(-5, -2, -5);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffffff, 2.0, 20);
    rimLight.position.set(0, 5, -3);
    scene.add(rimLight);

    // Ground Shadow Receiver Disc
    const shadowDiscGeo = new THREE.PlaneGeometry(6, 6);
    const shadowDiscMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.25
    });
    const shadowDisc = new THREE.Mesh(shadowDiscGeo, shadowDiscMat);
    shadowDisc.rotation.x = -Math.PI / 2;
    shadowDisc.position.y = -2.2;
    scene.add(shadowDisc);

    const group = new THREE.Group();
    groupRef.current = group;
    scene.add(group);

    buildModelGroup(group, category, materials[selectedMaterialIdx]?.colorHex || accentColor);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (groupRef.current) {
        if (autoRotate && !isDraggingRef.current) {
          groupRef.current.rotation.y += 0.006;
        }
        // Micro-float animation for studio presence
        groupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.08;
      }

      partsRef.current.forEach((part) => {
        part.mesh.position.y += (part.targetY - part.mesh.position.y) * 0.08;
      });

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
      }
    };
  }, [category, materials, selectedMaterialIdx, accentColor, autoRotate, buildModelGroup]);

  useEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => (m.wireframe = wireframe));
        } else {
          child.material.wireframe = wireframe;
        }
      }
    });
  }, [wireframe]);

  useEffect(() => {
    if (!groupRef.current) return;
    const hex = materials[selectedMaterialIdx]?.colorHex || accentColor;
    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material && child.material.name !== 'accent') {
        if ('color' in child.material) {
          child.material.color.set(hex);
        }
      }
    });
  }, [selectedMaterialIdx, materials, accentColor]);

  useEffect(() => {
    partsRef.current.forEach((part, idx) => {
      if (exploded) {
        const offset = (idx - Math.floor(partsRef.current.length / 2)) * 0.9;
        part.targetY = part.initialY + offset;
      } else {
        part.targetY = part.initialY;
      }
    });
  }, [exploded]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !groupRef.current) return;
    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    groupRef.current.rotation.y += deltaX * 0.01;
    groupRef.current.rotation.x += deltaY * 0.01;

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className={`relative overflow-hidden select-none ${className}`}>
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/10 z-10 backdrop-blur-xl">
        <button
          onClick={() => setExploded(!exploded)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
            exploded ? 'bg-white text-black font-bold' : 'text-zinc-300 hover:text-white'
          }`}
          title="Toggle Exploded Assembly View"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{exploded ? 'Assembled' : 'Explode'}</span>
        </button>

        <button
          onClick={() => setWireframe(!wireframe)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
            wireframe ? 'bg-white text-black font-bold' : 'text-zinc-300 hover:text-white'
          }`}
          title="Toggle X-Ray Wireframe Mode"
        >
          <Box className="w-3.5 h-3.5" />
          <span>{wireframe ? 'Shaded' : 'Wireframe'}</span>
        </button>

        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-2 rounded-full text-xs font-mono transition-all ${
            autoRotate ? 'text-white bg-white/10' : 'text-zinc-400 hover:text-white'
          }`}
          title="Toggle Auto Orbit Rotation"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin-slow' : ''}`} />
        </button>
      </div>

      {materials.length > 0 && (
        <div className="absolute top-4 right-4 flex flex-col gap-2 p-2.5 rounded-2xl glass-panel border border-white/10 z-10">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest px-1">Material Finish</span>
          <div className="flex items-center gap-2">
            {materials.map((mat, idx) => (
              <button
                key={mat.id}
                onClick={() => setSelectedMaterialIdx(idx)}
                className={`w-6 h-6 rounded-full border-2 transition-all transform hover:scale-110 ${
                  selectedMaterialIdx === idx ? 'border-white scale-110 shadow-lg' : 'border-white/20'
                }`}
                style={{ backgroundColor: mat.colorHex }}
                title={mat.name}
              />
            ))}
          </div>
        </div>
      )}

      {exploded && explodedComponents.length > 0 && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 max-w-xs z-10">
          {explodedComponents.map((comp) => (
            <div
              key={comp.id}
              onClick={() => setActivePart(activePart === comp.id ? null : comp.id)}
              className={`p-3 rounded-xl text-left text-xs transition-all cursor-pointer border ${
                activePart === comp.id
                  ? 'bg-white text-black shadow-lg font-medium'
                  : 'bg-black/70 backdrop-blur-md border-white/10 text-zinc-300 hover:border-white/30'
              }`}
            >
              <div className="font-semibold flex items-center justify-between">
                <span>{comp.name}</span>
                <span className="text-[9px] font-mono opacity-80 uppercase">{comp.material}</span>
              </div>
              <p className="text-[11px] opacity-90 mt-1 leading-snug">{comp.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
