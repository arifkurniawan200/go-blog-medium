import { useEffect, useMemo, useRef, type MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { AKCharacter, type CharacterMotionState } from './AKCharacter';
import {
  CollectibleCoin3D,
  FluffyCloud,
  GoalFlagpoleAndCastle,
  PowerUpMushroom3D,
  QuestionBlock3D,
  RollingHill,
  WarpPipe,
  WorldGroundTrack
} from './WorldProps';
import { SERVICES, SKILLS } from '../../data/portfolio';

export interface SceneLabels {
  warpStart: string;
  warpSkills: string;
  warpLevels: string;
  coinCollected: string;
  coinClickToCollect: string;
}

export interface MarioWorldSceneProps {
  scrollProgressRef: MutableRefObject<number>;
  gameStarted: boolean;
  isMobile: boolean;
  starPower: boolean;
  jumpTrigger: number;
  sceneLabels: SceneLabels;
  hitServices: Record<string, boolean>;
  collectedSkills: Record<string, boolean>;
  onHitServiceBlock: (serviceId: string) => void;
  onCollectSkill: (skillId: string) => void;
  onJump: () => void;
  onJumpToSection: (sectionId: string) => void;
}

const TRACK_END_X = 78;

function InnerMarioWorld({
  scrollProgressRef,
  gameStarted,
  isMobile,
  starPower,
  jumpTrigger,
  sceneLabels,
  hitServices,
  collectedSkills,
  onHitServiceBlock,
  onCollectSkill,
  onJump,
  onJumpToSection
}: MarioWorldSceneProps) {
  const { camera } = useThree();

  const characterRef = useRef<CharacterMotionState>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    facing: 1,
    jumping: false
  });

  const keysRef = useRef({ left: false, right: false });
  const pointerParallaxRef = useRef({ x: 0, y: 0 });
  const keyboardOffsetRef = useRef(0);
  const introOffsetRef = useRef({ camZ: 6.2, camY: 2.8, charY: -1.4 });
  const prevTargetX = useRef(0);

  // External UI Jump trigger (from Floating Jump button, ? blocks, coin taps, etc.)
  useEffect(() => {
    if (jumpTrigger > 0) {
      characterRef.current.vy = starPower ? 12.2 : 9.6;
      characterRef.current.jumping = true;
    }
  }, [jumpTrigger, starPower]);

  // Subtle mouse parallax on desktop for extra 3D depth
  useEffect(() => {
    if (isMobile) return;
    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      pointerParallaxRef.current.x = nx * 0.75;
      pointerParallaxRef.current.y = -ny * 0.35;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [isMobile]);

  // Trigger dramatic zoom-out from warp pipe when user clicks "PRESS START"
  useEffect(() => {
    if (gameStarted) {
      gsap.to(introOffsetRef.current, {
        camZ: isMobile ? 13.5 : 11.2,
        camY: 4.3,
        charY: 0,
        duration: 1.35,
        ease: 'back.out(1.25)'
      });
    } else {
      introOffsetRef.current = { camZ: isMobile ? 9.5 : 7.8, camY: 3.1, charY: 0 };
    }
  }, [gameStarted, isMobile]);

  // Optional desktop keyboard controls (← → / A D walk, Space jump)
  useEffect(() => {
    if (isMobile) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = true;
      }
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = true;
      }
      if (e.code === 'Space' && !characterRef.current.jumping) {
        if (gameStarted && document.activeElement === document.body) {
          e.preventDefault();
          characterRef.current.vy = starPower ? 12.2 : 9.8;
          characterRef.current.jumping = true;
          onJump();
        }
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = false;
      }
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = false;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [gameStarted, isMobile, onJump, starPower]);

  const clouds = useMemo(() => {
    const count = isMobile ? 7 : 15;
    return Array.from({ length: count }, (_, i) => ({
      pos: [i * 7.2 - 6, 6.2 + (i % 3) * 1.4, -7 - (i % 4) * 2.5] as [number, number, number],
      scale: 0.85 + (i % 3) * 0.25
    }));
  }, [isMobile]);

  const hills = useMemo(() => {
    const count = isMobile ? 6 : 12;
    return Array.from({ length: count }, (_, i) => ({
      pos: [i * 9 - 8, -1.6, -8.5 - (i % 2) * 3.5] as [number, number, number],
      radius: 2.8 + (i % 3) * 0.9,
      height: 3.4 + (i % 2) * 2.2,
      color: i % 2 === 0 ? '#16A34A' : '#22C55E'
    }));
  }, [isMobile]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const c = characterRef.current;

    // Keyboard micro-movement around scroll anchor
    const moveSpeed = starPower ? 11 : 6.2;
    if (keysRef.current.right) {
      keyboardOffsetRef.current = Math.min(8, keyboardOffsetRef.current + moveSpeed * dt);
    }
    if (keysRef.current.left) {
      keyboardOffsetRef.current = Math.max(-8, keyboardOffsetRef.current - moveSpeed * dt);
    }
    if (!keysRef.current.left && !keysRef.current.right) {
      keyboardOffsetRef.current = THREE.MathUtils.lerp(keyboardOffsetRef.current, 0, dt * 1.6);
    }

    const scrollTargetX = scrollProgressRef.current * TRACK_END_X;
    const targetX = THREE.MathUtils.clamp(
      scrollTargetX + keyboardOffsetRef.current,
      -2,
      TRACK_END_X + 2
    );

    const dx = targetX - c.x;
    c.vx = dx / Math.max(dt, 0.016);
    if (Math.abs(dx) > 0.015) {
      c.facing = dx >= 0 ? 1 : -1;
    }
    c.x = THREE.MathUtils.lerp(c.x, targetX, Math.min(1, dt * (starPower ? 12 : 7.5)));

    // Small automatic celebratory hop when crossing milestone positions via scroll
    if (
      !c.jumping &&
      Math.abs(targetX - prevTargetX.current) > 1.4 &&
      Math.floor(targetX / 16) !== Math.floor(prevTargetX.current / 16)
    ) {
      c.vy = 7.2;
      c.jumping = true;
    }
    prevTargetX.current = targetX;

    // Jump gravity physics
    if (c.jumping) {
      c.y += c.vy * dt;
      c.vy -= 26 * dt;
      if (c.y <= 0) {
        c.y = 0;
        c.vy = 0;
        c.jumping = false;
      }
    } else {
      c.y = introOffsetRef.current.charY;
    }

    // Smooth Mario 3D World elevated camera follow + gentle pointer parallax
    const desktopXOffset = isMobile ? 0 : -2.6;
    const camTargetX = c.x + desktopXOffset + (gameStarted ? 1.2 : 0) + pointerParallaxRef.current.x;
    const camTargetY =
      introOffsetRef.current.camY +
      c.y * 0.25 +
      Math.sin(state.clock.elapsedTime * 0.6) * 0.1 +
      pointerParallaxRef.current.y;
    const camTargetZ = introOffsetRef.current.camZ;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, camTargetX, dt * 5);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, camTargetY, dt * 5);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, camTargetZ, dt * 5);
    camera.lookAt(c.x + desktopXOffset + 0.6, 1.75, 0);
  });

  return (
    <>
      <color attach="background" args={['#5C94FC']} />
      <fog attach="fog" args={['#5C94FC', 22, 62]} />

      {/* Cheerful bright Mario-style illumination */}
      <hemisphereLight args={['#FFFFFF', '#22C55E', 0.85]} />
      <directionalLight
        position={[16, 26, 20]}
        intensity={0.95}
        castShadow={!isMobile}
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-12, 10, -10]} intensity={0.4} color="#BAE6FD" />

      {/* Ground Pathway & Scenery */}
      <WorldGroundTrack length={120} />

      {clouds.map((cl, idx) => (
        <FluffyCloud key={idx} position={cl.pos} scale={cl.scale} />
      ))}

      {hills.map((h, idx) => (
        <RollingHill
          key={idx}
          position={h.pos}
          radius={h.radius}
          height={h.height}
          color={h.color}
        />
      ))}

      {/* Starting Intro Warp Pipe (Hero) */}
      <WarpPipe
        position={[-2.6, 0, -0.6]}
        height={2.2}
        label={sceneLabels.warpStart}
        onClick={() => onJumpToSection('services')}
      />

      {/* Hero Character "AK" */}
      <AKCharacter positionRef={characterRef} starPower={starPower} />

      {/* WORLD 1-1: SERVICES — 3 Interactive "?" Blocks + Power-Up Mushroom */}
      <group position={[15, 0, -0.5]}>
        {SERVICES.map((svc, idx) => (
          <QuestionBlock3D
            key={svc.id}
            position={[idx * 2.8, 3.2, 0]}
            isHit={Boolean(hitServices[svc.id])}
            onHit={() => onHitServiceBlock(svc.id)}
          />
        ))}
        <PowerUpMushroom3D position={[2.8, 3.9, 0]} />
      </group>

      {/* Warp Pipe between Services & Skills */}
      <WarpPipe
        position={[26, 0, -0.7]}
        height={2.0}
        label={sceneLabels.warpSkills}
        onClick={() => onJumpToSection('skills')}
      />

      {/* WORLD 1-2: TECH STACK — 10 Collectible Spinning Coins */}
      <group position={[30, 0, -0.4]}>
        {SKILLS.map((skill, idx) => (
          <CollectibleCoin3D
            key={skill.id}
            skill={skill}
            position={[idx * 1.9, idx % 2 === 0 ? 2.4 : 3.4, 0]}
            collected={Boolean(collectedSkills[skill.id])}
            onCollect={onCollectSkill}
            collectedLabel={sceneLabels.coinCollected}
            clickToCollectLabel={sceneLabels.coinClickToCollect}
          />
        ))}
      </group>

      {/* Warp Pipe between Skills & Experience */}
      <WarpPipe
        position={[52, 0, -0.7]}
        height={2.3}
        label={sceneLabels.warpLevels}
        onClick={() => onJumpToSection('experience')}
      />

      {/* WORLD 1-3: EXPERIENCE MILESTONE PIPES */}
      {[56, 61, 66].map((px, i) => (
        <WarpPipe
          key={px}
          position={[px, 0, -1.6]}
          height={1.4 + i * 0.45}
          scale={0.85}
          label={`LEVEL 1-${i + 1}`}
          onClick={() => onJumpToSection('experience')}
        />
      ))}

      {/* WORLD 1-4: GOAL POLE & FINAL CASTLE (CONTACT) */}
      <GoalFlagpoleAndCastle position={[76, 0, -0.4]} />
    </>
  );
}

export default function MarioWorldScene(props: MarioWorldSceneProps) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-auto" aria-hidden="true">
      <Canvas
        shadows={!props.isMobile}
        dpr={props.isMobile ? [1, 1.25] : [1, 1.75]}
        camera={{ position: [0, 3.2, 9.5], fov: 46, near: 0.1, far: 120 }}
        gl={{ antialias: !props.isMobile, powerPreference: 'high-performance' }}
      >
        <InnerMarioWorld {...props} />
      </Canvas>
    </div>
  );
}
