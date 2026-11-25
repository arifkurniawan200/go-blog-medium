import { useMemo, useRef, type MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';
import { createSymbolTexture, getToonGradientMap } from './toonUtils';

export interface CharacterMotionState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  facing: number;
  jumping: boolean;
}

interface AKCharacterProps {
  positionRef: MutableRefObject<CharacterMotionState>;
  starPower: boolean;
}

const OUTLINE_COLOR = '#1A1C2C';

/**
 * Original low-poly toon hero character with red cap + "AK" emblem,
 * red shirt, blue overalls, and playful procedural walk/jump animations.
 */
export function AKCharacter({ positionRef, starPower }: AKCharacterProps) {
  const rootRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const starHaloRef = useRef<THREE.Mesh>(null);

  const gradientMap = useMemo(() => getToonGradientMap(), []);
  const akBadgeTex = useMemo(
    () => createSymbolTexture('AK', '#FFFFFF', '#E52521', '#1A1C2C', true),
    []
  );

  const walkPhase = useRef(0);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const p = positionRef.current;

    if (rootRef.current) {
      rootRef.current.position.set(p.x, p.y, 0);
      // Smoothly face direction of travel
      const targetRotY = p.facing >= 0 ? Math.PI * 0.42 : -Math.PI * 0.42;
      rootRef.current.rotation.y = THREE.MathUtils.lerp(
        rootRef.current.rotation.y,
        targetRotY,
        dt * 10
      );
    }

    const speed = Math.abs(p.vx);
    const isMoving = speed > 0.03;

    if (isMoving && !p.jumping) {
      walkPhase.current += dt * (starPower ? 20 : 12);
    } else if (!p.jumping) {
      walkPhase.current = THREE.MathUtils.lerp(walkPhase.current, 0, dt * 8);
    }

    const swing = p.jumping ? 0.75 : Math.sin(walkPhase.current) * (isMoving ? 0.7 : 0.04);
    const bounce = p.jumping
      ? 0
      : Math.abs(Math.sin(walkPhase.current)) * (isMoving ? 0.12 : 0);

    if (leftLegRef.current && rightLegRef.current) {
      leftLegRef.current.rotation.x = swing;
      rightLegRef.current.rotation.x = -swing;
    }
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = p.jumping ? -2.3 : -swing * 0.9;
      rightArmRef.current.rotation.x = p.jumping ? -2.3 : swing * 0.9;
    }

    if (bodyRef.current) {
      bodyRef.current.position.y = bounce + Math.sin(state.clock.elapsedTime * 3) * 0.025;
      // Squash & stretch when jumping
      const stretchY = p.jumping ? 1.12 : 1.0;
      const squashXZ = p.jumping ? 0.92 : 1.0;
      bodyRef.current.scale.set(
        THREE.MathUtils.lerp(bodyRef.current.scale.x, squashXZ, dt * 12),
        THREE.MathUtils.lerp(bodyRef.current.scale.y, stretchY, dt * 12),
        THREE.MathUtils.lerp(bodyRef.current.scale.z, squashXZ, dt * 12)
      );
    }

    if (starHaloRef.current && starPower) {
      starHaloRef.current.rotation.y += dt * 4.5;
      starHaloRef.current.rotation.z += dt * 2.5;
    }
  });

  const shirtColor = starPower ? '#FBD000' : '#E52521';
  const overallColor = starPower ? '#FF5E00' : '#2563EB';

  return (
    <group ref={rootRef} name="ak-hero-character">
      <group ref={bodyRef}>
        {/* Boots & Legs */}
        <mesh ref={leftLegRef} position={[-0.22, 0.34, 0]} castShadow>
          <capsuleGeometry args={[0.14, 0.28, 6, 10]} />
          <meshToonMaterial color="#6B3A1E" gradientMap={gradientMap} />
          <Edges threshold={25} color={OUTLINE_COLOR} />
        </mesh>
        <mesh ref={rightLegRef} position={[0.22, 0.34, 0]} castShadow>
          <capsuleGeometry args={[0.14, 0.28, 6, 10]} />
          <meshToonMaterial color="#6B3A1E" gradientMap={gradientMap} />
          <Edges threshold={25} color={OUTLINE_COLOR} />
        </mesh>

        {/* Torso (Blue Overalls) */}
        <mesh position={[0, 0.9, 0]} castShadow>
          <boxGeometry args={[0.74, 0.72, 0.48]} />
          <meshToonMaterial color={overallColor} gradientMap={gradientMap} />
          <Edges threshold={20} color={OUTLINE_COLOR} />
        </mesh>

        {/* Red Shirt Upper Chest */}
        <mesh position={[0, 1.16, 0]} castShadow>
          <boxGeometry args={[0.78, 0.28, 0.5]} />
          <meshToonMaterial color={shirtColor} gradientMap={gradientMap} />
          <Edges threshold={20} color={OUTLINE_COLOR} />
        </mesh>

        {/* Golden Overall Buttons */}
        <mesh position={[-0.18, 0.96, 0.26]}>
          <sphereGeometry args={[0.06, 10, 10]} />
          <meshToonMaterial color="#FBD000" gradientMap={gradientMap} />
        </mesh>
        <mesh position={[0.18, 0.96, 0.26]}>
          <sphereGeometry args={[0.06, 10, 10]} />
          <meshToonMaterial color="#FBD000" gradientMap={gradientMap} />
        </mesh>

        {/* Arms + White Gloves */}
        <mesh ref={leftArmRef} position={[-0.52, 1.0, 0]} castShadow>
          <capsuleGeometry args={[0.12, 0.34, 6, 10]} />
          <meshToonMaterial color={shirtColor} gradientMap={gradientMap} />
          <Edges threshold={25} color={OUTLINE_COLOR} />
        </mesh>
        <mesh ref={rightArmRef} position={[0.52, 1.0, 0]} castShadow>
          <capsuleGeometry args={[0.12, 0.34, 6, 10]} />
          <meshToonMaterial color={shirtColor} gradientMap={gradientMap} />
          <Edges threshold={25} color={OUTLINE_COLOR} />
        </mesh>

        {/* Head */}
        <mesh position={[0, 1.66, 0]} castShadow>
          <sphereGeometry args={[0.42, 16, 16]} />
          <meshToonMaterial color="#FFCC99" gradientMap={gradientMap} />
        </mesh>

        {/* Friendly Eyes */}
        <mesh position={[-0.13, 1.69, 0.36]}>
          <sphereGeometry args={[0.055, 10, 10]} />
          <meshBasicMaterial color="#1A1C2C" />
        </mesh>
        <mesh position={[0.13, 1.69, 0.36]}>
          <sphereGeometry args={[0.055, 10, 10]} />
          <meshBasicMaterial color="#1A1C2C" />
        </mesh>

        {/* Playful Rounded Nose */}
        <mesh position={[0, 1.6, 0.42]}>
          <sphereGeometry args={[0.085, 10, 10]} />
          <meshToonMaterial color="#F7B787" gradientMap={gradientMap} />
        </mesh>

        {/* Red Cap Dome */}
        <mesh position={[0, 1.92, -0.02]} castShadow>
          <sphereGeometry args={[0.44, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.56]} />
          <meshToonMaterial color={shirtColor} gradientMap={gradientMap} />
        </mesh>

        {/* Cap Brim */}
        <mesh position={[0, 1.92, 0.3]} rotation={[0.12, 0, 0]} castShadow>
          <boxGeometry args={[0.68, 0.08, 0.38]} />
          <meshToonMaterial color={shirtColor} gradientMap={gradientMap} />
          <Edges threshold={20} color={OUTLINE_COLOR} />
        </mesh>

        {/* Original "AK" White Emblem on Cap Front */}
        <mesh position={[0, 2.08, 0.38]} rotation={[-0.25, 0, 0]}>
          <circleGeometry args={[0.15, 20]} />
          <meshBasicMaterial map={akBadgeTex} />
        </mesh>

        {/* Konami Star Power Invincible Aura */}
        {starPower && (
          <mesh ref={starHaloRef} position={[0, 1.15, 0]}>
            <octahedronGeometry args={[1.25, 0]} />
            <meshBasicMaterial color="#FBD000" wireframe transparent opacity={0.8} />
          </mesh>
        )}
      </group>
    </group>
  );
}
