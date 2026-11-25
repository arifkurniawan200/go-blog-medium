import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges, Html } from '@react-three/drei';
import * as THREE from 'three';
import { createSymbolTexture, getToonGradientMap } from './toonUtils';
import type { SkillCoin } from '../../data/portfolio';

const OUTLINE = '#1A1C2C';

/* =====================================================================
   WARP PIPE (ICONIC GREEN PIPE)
   ===================================================================== */
interface WarpPipeProps {
  position: [number, number, number];
  height?: number;
  scale?: number;
  label?: string;
  onClick?: () => void;
}

export function WarpPipe({ position, height = 2.1, scale = 1, label, onClick }: WarpPipeProps) {
  const gradientMap = useMemo(() => getToonGradientMap(), []);
  const [hovered, setHovered] = useState(false);

  return (
    <group
      position={position}
      scale={hovered && onClick ? scale * 1.05 : scale}
      onClick={onClick}
      onPointerOver={() => onClick && setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Pipe Shaft */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.72, 0.72, height, 20]} />
        <meshToonMaterial color="#00A800" gradientMap={gradientMap} />
        <Edges threshold={25} color={OUTLINE} />
      </mesh>
      {/* Pipe Lip */}
      <mesh position={[0, height + 0.16, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.88, 0.88, 0.42, 20]} />
        <meshToonMaterial color="#00C400" gradientMap={gradientMap} />
        <Edges threshold={25} color={OUTLINE} />
      </mesh>
      {/* Dark Pipe Opening */}
      <mesh position={[0, height + 0.38, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.66, 20]} />
        <meshBasicMaterial color="#0A1F0A" />
      </mesh>

      {label && hovered && (
        <Html position={[0, height + 1.1, 0]} center distanceFactor={14}>
          <div className="px-3 py-1 bg-mario-ink text-mario-coin font-arcade text-[10px] rounded-lg border-2 border-white whitespace-nowrap shadow-toon-sm">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

/* =====================================================================
   QUESTION BLOCK "?" (BOUNCES & EMITS COIN PARTICLES ON CLICK)
   ===================================================================== */
interface QuestionBlockProps {
  position: [number, number, number];
  isHit?: boolean;
  onHit?: () => void;
}

export function QuestionBlock3D({ position, isHit = false, onHit }: QuestionBlockProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const bumpVel = useRef(0);
  const bumpOffset = useRef(0);
  const [hovered, setHovered] = useState(false);

  const gradientMap = useMemo(() => getToonGradientMap(), []);
  const qTex = useMemo(
    () => createSymbolTexture('?', '#FBD000', '#FFFFFF', '#1A1C2C', false),
    []
  );
  const usedTex = useMemo(
    () => createSymbolTexture('✓', '#C84C0C', '#FBD000', '#1A1C2C', false),
    []
  );

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (bumpOffset.current > 0 || bumpVel.current > 0) {
      bumpOffset.current += bumpVel.current * dt;
      bumpVel.current -= 28 * dt;
      if (bumpOffset.current <= 0) {
        bumpOffset.current = 0;
        bumpVel.current = 0;
      }
    }

    if (meshRef.current) {
      const idleBob = isHit ? 0 : Math.sin(state.clock.elapsedTime * 3.2 + position[0]) * 0.06;
      meshRef.current.position.y = position[1] + bumpOffset.current + idleBob;
      const s = hovered ? 1.08 : 1;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, s, dt * 10));
    }
  });

  const handleClick = () => {
    bumpVel.current = 6.5;
    if (onHit) onHit();
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      castShadow
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1.15, 1.15, 1.15]} />
      <meshToonMaterial map={isHit ? usedTex : qTex} gradientMap={gradientMap} />
      <Edges threshold={20} color={OUTLINE} />
    </mesh>
  );
}

/* =====================================================================
   COLLECTIBLE TECH STACK COIN (SPINNING + HOVER TOOLTIP)
   ===================================================================== */
interface CollectibleCoin3DProps {
  skill: SkillCoin;
  position: [number, number, number];
  collected: boolean;
  onCollect: (skillId: string) => void;
}

export function CollectibleCoin3D({
  skill,
  position,
  collected,
  onCollect
}: CollectibleCoin3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const gradientMap = useMemo(() => getToonGradientMap(), []);
  const badgeTex = useMemo(
    () => createSymbolTexture(skill.shortCode, '#FBD000', '#1A1C2C', '#B45309', true),
    [skill.shortCode]
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * (hovered ? 4.2 : 1.9);
    groupRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 2.8 + position[0]) * 0.16;
    const targetScale = collected ? 0.55 : hovered ? 1.25 : 1.0;
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 8)
    );
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={() => onCollect(skill.id)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.56, 0.56, 0.15, 20]} />
        <meshToonMaterial
          color={collected ? '#FDE68A' : '#FBD000'}
          gradientMap={gradientMap}
          transparent={collected}
          opacity={collected ? 0.55 : 1}
        />
        <Edges threshold={25} color={OUTLINE} />
      </mesh>
      <mesh position={[0, 0, 0.085]}>
        <circleGeometry args={[0.45, 20]} />
        <meshBasicMaterial map={badgeTex} />
      </mesh>
      <mesh position={[0, 0, -0.085]} rotation={[0, Math.PI, 0]}>
        <circleGeometry args={[0.45, 20]} />
        <meshBasicMaterial map={badgeTex} />
      </mesh>

      {hovered && (
        <Html position={[0, 1.05, 0]} center distanceFactor={14}>
          <div className="px-3 py-1.5 bg-mario-ink text-white rounded-xl border-2 border-mario-coin shadow-toon-sm text-center whitespace-nowrap pointer-events-none">
            <div className="font-arcade text-[11px] text-mario-coin">{skill.name}</div>
            <div className="text-[10px] text-slate-200 font-sans">
              {collected ? 'Collected!' : 'Click to collect (+100)'}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

/* =====================================================================
   ORIGINAL POWER-UP MUSHROOM
   ===================================================================== */
export function PowerUpMushroom3D({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const gradientMap = useMemo(() => getToonGradientMap(), []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.abs(Math.sin(state.clock.elapsedTime * 3)) * 0.22;
    ref.current.rotation.y = state.clock.elapsedTime * 1.1;
  });

  return (
    <group ref={ref} position={position}>
      {/* Stem */}
      <mesh position={[0, 0.26, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.34, 0.5, 14]} />
        <meshToonMaterial color="#FFF3D6" gradientMap={gradientMap} />
      </mesh>
      {/* Cap */}
      <mesh position={[0, 0.58, 0]} castShadow>
        <sphereGeometry args={[0.52, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
        <meshToonMaterial color="#E52521" gradientMap={gradientMap} />
      </mesh>
      {/* White Spots */}
      {(
        [
          [0, 0.94, 0.24],
          [0.32, 0.78, 0.2],
          [-0.32, 0.78, 0.2],
          [0, 0.82, -0.34]
        ] as [number, number, number][]
      ).map(([sx, sy, sz], idx) => (
        <mesh key={idx} position={[sx, sy, sz]}>
          <sphereGeometry args={[0.13, 10, 10]} />
          <meshToonMaterial color="#FFFFFF" gradientMap={gradientMap} />
        </mesh>
      ))}
    </group>
  );
}

/* =====================================================================
   GOAL FLAGPOLE & MINI BRICK CASTLE FORTRESS
   ===================================================================== */
export function GoalFlagpoleAndCastle({ position }: { position: [number, number, number] }) {
  const flagRef = useRef<THREE.Mesh>(null);
  const gradientMap = useMemo(() => getToonGradientMap(), []);

  useFrame((state) => {
    if (flagRef.current) {
      flagRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 4) * 0.18;
    }
  });

  return (
    <group position={position}>
      {/* Flagpole Base Block */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.9, 1.1]} />
        <meshToonMaterial color="#C84C0C" gradientMap={gradientMap} />
        <Edges threshold={20} color={OUTLINE} />
      </mesh>

      {/* Tall Pole */}
      <mesh position={[0, 4.4, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 7.6, 12]} />
        <meshToonMaterial color="#E2E8F0" gradientMap={gradientMap} />
      </mesh>

      {/* Golden Top Orb */}
      <mesh position={[0, 8.3, 0]} castShadow>
        <sphereGeometry args={[0.3, 14, 14]} />
        <meshToonMaterial color="#FBD000" gradientMap={gradientMap} />
      </mesh>

      {/* Waving Pennant Flag */}
      <mesh ref={flagRef} position={[0.72, 7.35, 0]} castShadow>
        <boxGeometry args={[1.35, 0.85, 0.08]} />
        <meshToonMaterial color="#E52521" gradientMap={gradientMap} />
        <Edges threshold={20} color={OUTLINE} />
      </mesh>

      {/* Mini Castle Fortress Behind Flagpole */}
      <group position={[4.6, 0, -2.4]}>
        {/* Main Castle Body */}
        <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.4, 4.4, 3.6]} />
          <meshToonMaterial color="#C84C0C" gradientMap={gradientMap} />
          <Edges threshold={20} color={OUTLINE} />
        </mesh>
        {/* Upper Tower */}
        <mesh position={[0, 5.2, 0]} castShadow>
          <boxGeometry args={[2.5, 1.8, 2.4]} />
          <meshToonMaterial color="#D95B16" gradientMap={gradientMap} />
          <Edges threshold={20} color={OUTLINE} />
        </mesh>
        {/* Battlements */}
        {[-1.6, 0, 1.6].map((bx, i) => (
          <mesh key={i} position={[bx, 4.65, 1.55]} castShadow>
            <boxGeometry args={[0.8, 0.55, 0.6]} />
            <meshToonMaterial color="#C84C0C" gradientMap={gradientMap} />
            <Edges threshold={20} color={OUTLINE} />
          </mesh>
        ))}
        {/* Castle Arch Doorway */}
        <mesh position={[0, 1.15, 1.83]}>
          <boxGeometry args={[1.4, 2.3, 0.1]} />
          <meshBasicMaterial color="#1A1C2C" />
        </mesh>
        {/* Golden Castle Flag */}
        <mesh position={[0, 6.7, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 1.3, 8]} />
          <meshToonMaterial color="#FBD000" gradientMap={gradientMap} />
        </mesh>
        <mesh position={[0.45, 7.1, 0]}>
          <boxGeometry args={[0.85, 0.5, 0.06]} />
          <meshToonMaterial color="#FBD000" gradientMap={gradientMap} />
          <Edges threshold={20} color={OUTLINE} />
        </mesh>
      </group>
    </group>
  );
}

/* =====================================================================
   TOON CLOUDS, ROLLING HILLS & ELEVATED WORLD PATHWAY
   ===================================================================== */
export function FluffyCloud({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  const gradientMap = useMemo(() => getToonGradientMap(), []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.7 + position[0]) * 0.25;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.95, 14, 14]} />
        <meshToonMaterial color="#FFFFFF" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[-0.85, -0.15, 0]}>
        <sphereGeometry args={[0.72, 12, 12]} />
        <meshToonMaterial color="#FFFFFF" gradientMap={gradientMap} />
      </mesh>
      <mesh position={[0.85, -0.15, 0]}>
        <sphereGeometry args={[0.75, 12, 12]} />
        <meshToonMaterial color="#FFFFFF" gradientMap={gradientMap} />
      </mesh>
    </group>
  );
}

export function RollingHill({
  position,
  radius = 3.2,
  height = 4.6,
  color = '#22C55E'
}: {
  position: [number, number, number];
  radius?: number;
  height?: number;
  color?: string;
}) {
  const gradientMap = useMemo(() => getToonGradientMap(), []);
  return (
    <mesh position={position} receiveShadow>
      <capsuleGeometry args={[radius, height, 8, 16]} />
      <meshToonMaterial color={color} gradientMap={gradientMap} />
    </mesh>
  );
}

export function WorldGroundTrack({ length = 110 }: { length?: number }) {
  const gradientMap = useMemo(() => getToonGradientMap(), []);
  return (
    <group position={[length / 2 - 12, 0, 0]}>
      {/* Bright Green Grass Top */}
      <mesh position={[0, -0.22, 0]} receiveShadow>
        <boxGeometry args={[length, 0.44, 5.4]} />
        <meshToonMaterial color="#00B800" gradientMap={gradientMap} />
        <Edges threshold={25} color={OUTLINE} />
      </mesh>
      {/* Brick Earth Base */}
      <mesh position={[0, -1.75, 0]} receiveShadow>
        <boxGeometry args={[length, 2.65, 5.2]} />
        <meshToonMaterial color="#C84C0C" gradientMap={gradientMap} />
        <Edges threshold={25} color={OUTLINE} />
      </mesh>
    </group>
  );
}
