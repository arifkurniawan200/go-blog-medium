import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES, SKILLS, WORLD_SECTIONS } from './data/portfolio';
import { soundFX } from './utils/sound';
import { useKonamiCode } from './hooks/useKonamiCode';
import { usePerformanceMode } from './hooks/usePerformanceMode';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { GameHUD } from './components/ui/GameHUD';
import { TitleHero } from './components/ui/TitleHero';
import { ServicesSection } from './components/ui/ServicesSection';
import { SkillsSection } from './components/ui/SkillsSection';
import { ExperienceSection } from './components/ui/ExperienceSection';
import { ContactSection } from './components/ui/ContactSection';
import { ClassicBackdrop } from './components/ui/ClassicBackdrop';
import { WarpTransition } from './components/ui/WarpTransition';
import { KonamiBanner } from './components/ui/KonamiBanner';

gsap.registerPlugin(ScrollTrigger);

// Lazy-load heavy 3D WebGL bundle for mobile Lighthouse performance
const MarioWorldScene = lazy(() => import('./components/scene/MarioWorldScene'));

export default function App() {
  const { isMobile, prefersReducedMotion, classicMode, setClassicMode } = usePerformanceMode();

  const [gameStarted, setGameStarted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false); // Default OFF
  const [activeWorld, setActiveWorld] = useState<string>(WORLD_SECTIONS[0].worldLabel);
  const [bonusScore, setBonusScore] = useState(0);
  const [scrollScore, setScrollScore] = useState(0);
  const [warpLabel, setWarpLabel] = useState<string | null>(null);
  const [starPower, setStarPower] = useState(false);

  const [hitServices, setHitServices] = useState<Record<string, boolean>>({});
  const [collectedSkills, setCollectedSkills] = useState<Record<string, boolean>>({});

  const scrollProgressRef = useRef(0);
  const starTimerRef = useRef<number | null>(null);

  const coinsCount = Object.values(collectedSkills).filter(Boolean).length;
  const totalScore = scrollScore + bonusScore;

  // Auto-reveal service cards in Classic Mode for instant low-friction reading
  useEffect(() => {
    if (classicMode) {
      setHitServices(
        SERVICES.reduce<Record<string, boolean>>((acc, s) => {
          acc[s.id] = true;
          return acc;
        }, {})
      );
    }
  }, [classicMode]);

  // GSAP ScrollTrigger: sync scroll progress to 3D World & active HUD World stage
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
          setScrollScore(Math.round(self.progress * 1500));
        }
      });

      WORLD_SECTIONS.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 45%',
          end: 'bottom 45%',
          onEnter: () => setActiveWorld(sec.worldLabel),
          onEnterBack: () => setActiveWorld(sec.worldLabel)
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // Konami Code Easter Egg (↑ ↑ ↓ ↓ ← → ← → B A)
  useKonamiCode(() => {
    setStarPower(true);
    setBonusScore((s) => s + 1000);
    soundFX.playStarPower();
    if (starTimerRef.current) window.clearTimeout(starTimerRef.current);
    starTimerRef.current = window.setTimeout(() => {
      setStarPower(false);
    }, 10000);
  });

  useEffect(() => {
    return () => {
      if (starTimerRef.current) window.clearTimeout(starTimerRef.current);
    };
  }, []);

  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundFX.enabled = next;
      if (next) soundFX.playCoin();
      return next;
    });
  }, []);

  const handleToggleClassicMode = useCallback(() => {
    setClassicMode(!classicMode);
    soundFX.playJump();
  }, [classicMode, setClassicMode]);

  const handleWarpNavigate = useCallback(
    (sectionId: string) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const worldEntry = WORLD_SECTIONS.find((s) => s.id === sectionId);
      const label = worldEntry ? worldEntry.worldLabel : sectionId.toUpperCase();

      if (prefersReducedMotion || classicMode) {
        el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        return;
      }

      soundFX.playPipeWarp();
      setWarpLabel(label);
      window.setTimeout(() => {
        el.scrollIntoView({ behavior: 'auto' });
      }, 210);
      window.setTimeout(() => {
        setWarpLabel(null);
      }, 540);
    },
    [classicMode, prefersReducedMotion]
  );

  const handlePressStart = useCallback(() => {
    setGameStarted(true);
    setBonusScore((s) => s + 200);
    soundFX.playStartFanfare();
  }, []);

  const handleSkipIntro = useCallback(() => {
    setGameStarted(true);
    const expEl = document.getElementById('experience');
    if (expEl) expEl.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleHitServiceBlock = useCallback((serviceId: string) => {
    soundFX.playBlockHit();
    setHitServices((prev) => {
      if (!prev[serviceId]) {
        setBonusScore((s) => s + 100);
      }
      return { ...prev, [serviceId]: true };
    });
  }, []);

  const handleHitAllServices = useCallback(() => {
    soundFX.playBlockHit();
    setHitServices((prev) => {
      const next = { ...prev };
      let newlyUnlocked = 0;
      SERVICES.forEach((svc) => {
        if (!next[svc.id]) {
          next[svc.id] = true;
          newlyUnlocked += 1;
        }
      });
      if (newlyUnlocked > 0) setBonusScore((s) => s + newlyUnlocked * 100);
      return next;
    });
  }, []);

  const handleCollectSkill = useCallback((skillId: string) => {
    soundFX.playCoin();
    setCollectedSkills((prev) => {
      if (prev[skillId]) return prev;
      setBonusScore((s) => s + 100);
      return { ...prev, [skillId]: true };
    });
  }, []);

  const handleCollectAllSkills = useCallback(() => {
    soundFX.playStarPower();
    setCollectedSkills((prev) => {
      const next = { ...prev };
      let added = 0;
      SKILLS.forEach((sk) => {
        if (!next[sk.id]) {
          next[sk.id] = true;
          added += 1;
        }
      });
      if (added > 0) setBonusScore((s) => s + added * 100);
      return next;
    });
  }, []);

  const handleJump = useCallback(() => {
    soundFX.playJump();
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Game-style Loading Screen */}
      <LoadingScreen onComplete={() => {}} onSkipToContent={handleSkipIntro} />

      {/* Warp Pipe Section Transition Overlay */}
      <WarpTransition activeLabel={warpLabel} />

      {/* Konami Code Star Power Notification */}
      <KonamiBanner active={starPower} />

      {/* 3D Toon World (Lazy-loaded) OR Lightweight 2D Classic Mode */}
      {classicMode ? (
        <ClassicBackdrop />
      ) : (
        <Suspense fallback={<ClassicBackdrop />}>
          <MarioWorldScene
            scrollProgressRef={scrollProgressRef}
            gameStarted={gameStarted}
            isMobile={isMobile}
            starPower={starPower}
            hitServices={hitServices}
            collectedSkills={collectedSkills}
            onHitServiceBlock={handleHitServiceBlock}
            onCollectSkill={handleCollectSkill}
            onJump={handleJump}
            onJumpToSection={handleWarpNavigate}
          />
        </Suspense>
      )}

      {/* Fixed Arcade Game HUD & Menu Navigation */}
      <GameHUD
        score={totalScore}
        coinsCount={coinsCount}
        activeWorld={activeWorld}
        soundEnabled={soundEnabled}
        classicMode={classicMode}
        starPower={starPower}
        onToggleSound={handleToggleSound}
        onToggleClassicMode={handleToggleClassicMode}
        onNavigate={handleWarpNavigate}
      />

      {/* Semantic Real HTML Portfolio Content (SEO + Screen Reader + Recruiter Friendly) */}
      <main id="main-content" className="relative z-10">
        <TitleHero
          gameStarted={gameStarted}
          onPressStart={handlePressStart}
          onNavigate={handleWarpNavigate}
        />

        <ServicesSection
          hitServices={hitServices}
          onHitService={handleHitServiceBlock}
          onHitAll={handleHitAllServices}
        />

        <SkillsSection
          collectedSkills={collectedSkills}
          onCollectSkill={handleCollectSkill}
          onCollectAll={handleCollectAllSkills}
        />

        <ExperienceSection />

        <ContactSection onInteractSound={() => soundFX.playCoin()} />
      </main>
    </div>
  );
}
