import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES, SKILLS, WORLD_SECTIONS } from './data/portfolio';
import {
  getInitialLanguage,
  getPortfolioContent,
  type Language
} from './data/i18n';
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
import { ParticleOverlay, type ParticleBurst } from './components/ui/ParticleOverlay';
import { FloatingControls } from './components/ui/FloatingControls';

gsap.registerPlugin(ScrollTrigger);

// Lazy-load heavy 3D WebGL bundle for mobile Lighthouse performance
const MarioWorldScene = lazy(() => import('./components/scene/MarioWorldScene'));

function getEventCoords(event?: React.MouseEvent<HTMLElement>) {
  if (event && (event.clientX > 0 || event.clientY > 0)) {
    return { x: event.clientX, y: event.clientY };
  }
  return {
    x: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 400,
    y: typeof window !== 'undefined' ? window.innerHeight * 0.42 : 300
  };
}

export default function App() {
  const { isMobile, prefersReducedMotion, classicMode, setClassicMode } = usePerformanceMode();

  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const content = useMemo(() => getPortfolioContent(language), [language]);

  const [gameStarted, setGameStarted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false); // Default OFF
  const [activeSectionId, setActiveSectionId] = useState<string>(WORLD_SECTIONS[0].id);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [bonusScore, setBonusScore] = useState(0);
  const [scrollScore, setScrollScore] = useState(0);
  const [warpLabel, setWarpLabel] = useState<string | null>(null);
  const [starPower, setStarPower] = useState(false);
  const [jumpTrigger, setJumpTrigger] = useState(0);
  const [bursts, setBursts] = useState<ParticleBurst[]>([]);

  const [hitServices, setHitServices] = useState<Record<string, boolean>>({});
  const [collectedSkills, setCollectedSkills] = useState<Record<string, boolean>>({});
  const [wavedFlags, setWavedFlags] = useState<Record<string, boolean>>({});

  const scrollProgressRef = useRef(0);
  const starTimerRef = useRef<number | null>(null);
  const burstIdRef = useRef(1);
  const celebratedAllCoinsRef = useRef(false);

  const coinsCount = Object.values(collectedSkills).filter(Boolean).length;
  const totalScore = scrollScore + bonusScore;

  const activeWorld = useMemo(() => {
    const match = content.worldSections.find((s) => s.id === activeSectionId);
    return match ? match.worldLabel : content.worldSections[0].worldLabel;
  }, [activeSectionId, content.worldSections]);

  // Persist language choice and sync HTML lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem('ak_portfolio_lang', language);
    } catch {
      // Ignore storage write errors
    }
  }, [language]);

  const spawnBurst = useCallback(
    (x: number, y: number, label?: string, variant: ParticleBurst['variant'] = 'coin') => {
      if (prefersReducedMotion) return;
      const id = burstIdRef.current++;
      setBursts((prev) => [...prev.slice(-10), { id, x, y, label, variant }]);
      window.setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id));
      }, 950);
    },
    [prefersReducedMotion]
  );

  // Trigger 1-UP celebration when all 10 tech coins are collected
  useEffect(() => {
    if (coinsCount === SKILLS.length && !celebratedAllCoinsRef.current) {
      celebratedAllCoinsRef.current = true;
      soundFX.playOneUp();
      setJumpTrigger((n) => n + 1);
      if (typeof window !== 'undefined') {
        spawnBurst(
          window.innerWidth * 0.5,
          window.innerHeight * 0.36,
          content.ui.popups.allCoins,
          'fireworks'
        );
      }
    }
  }, [coinsCount, content.ui.popups.allCoins, spawnBurst]);

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
    let lastProgressUpdate = 0;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
          setScrollScore(Math.round(self.progress * 1500));
          const now = performance.now();
          if (now - lastProgressUpdate > 45 || self.progress === 0 || self.progress === 1) {
            lastProgressUpdate = now;
            setScrollProgress(self.progress);
          }
        }
      });

      WORLD_SECTIONS.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 45%',
          end: 'bottom 45%',
          onEnter: () => setActiveSectionId(sec.id),
          onEnterBack: () => setActiveSectionId(sec.id)
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // Konami Code Easter Egg (↑ ↑ ↓ ↓ ← → ← → B A)
  useKonamiCode(() => {
    setStarPower(true);
    setBonusScore((s) => s + 1000);
    setJumpTrigger((n) => n + 1);
    soundFX.playStarPower();
    if (typeof window !== 'undefined') {
      spawnBurst(window.innerWidth * 0.5, window.innerHeight * 0.4, '★ +1000 ★', 'fireworks');
    }
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

  const handleChangeLanguage = useCallback(
    (nextLang: Language, event?: React.MouseEvent<HTMLButtonElement>) => {
      if (nextLang === language) return;
      setLanguage(nextLang);
      soundFX.playSwitch();
      const nextContent = getPortfolioContent(nextLang);
      const { x, y } = getEventCoords(event);
      spawnBurst(x, y + 18, nextContent.ui.popups.langSwitched, 'star');
    },
    [language, spawnBurst]
  );

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

      const worldEntry = content.worldSections.find((s) => s.id === sectionId);
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
    [classicMode, content.worldSections, prefersReducedMotion]
  );

  const handlePressStart = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setGameStarted(true);
      setBonusScore((s) => s + 200);
      setJumpTrigger((n) => n + 1);
      soundFX.playStartFanfare();
      const { x, y } = getEventCoords(event);
      spawnBurst(x, y, '+200 START!', 'fireworks');
    },
    [spawnBurst]
  );

  const handleSkipIntro = useCallback(() => {
    setGameStarted(true);
    const expEl = document.getElementById('experience');
    if (expEl) expEl.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleStatBonus = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      soundFX.playCoin();
      setBonusScore((s) => s + 25);
      setJumpTrigger((n) => n + 1);
      const { x, y } = getEventCoords(event);
      spawnBurst(x, y, '+25 ★', 'coin');
    },
    [spawnBurst]
  );

  const handleHitServiceBlock = useCallback(
    (serviceId: string, event?: React.MouseEvent<HTMLButtonElement>) => {
      soundFX.playBlockHit();
      setJumpTrigger((n) => n + 1);
      const { x, y } = getEventCoords(event);
      spawnBurst(x, y, '+100 ★', 'star');
      setHitServices((prev) => {
        if (!prev[serviceId]) {
          setBonusScore((s) => s + 100);
        }
        return { ...prev, [serviceId]: true };
      });
    },
    [spawnBurst]
  );

  const handleHitAllServices = useCallback(
    (event?: React.MouseEvent<HTMLButtonElement>) => {
      soundFX.playBlockHit();
      setJumpTrigger((n) => n + 1);
      const { x, y } = getEventCoords(event);
      spawnBurst(x, y, '+300 POWER-UP!', 'fireworks');
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
    },
    [spawnBurst]
  );

  const handleCollectSkill = useCallback(
    (skillId: string, event?: React.MouseEvent<HTMLButtonElement>) => {
      soundFX.playCoin();
      setJumpTrigger((n) => n + 1);
      const { x, y } = getEventCoords(event);
      spawnBurst(x, y, '+100', 'coin');
      setCollectedSkills((prev) => {
        if (prev[skillId]) return prev;
        setBonusScore((s) => s + 100);
        return { ...prev, [skillId]: true };
      });
    },
    [spawnBurst]
  );

  const handleCollectAllSkills = useCallback(
    (event?: React.MouseEvent<HTMLButtonElement>) => {
      soundFX.playStarPower();
      setJumpTrigger((n) => n + 1);
      const { x, y } = getEventCoords(event);
      spawnBurst(x, y, content.ui.popups.allCoins, 'fireworks');
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
    },
    [content.ui.popups.allCoins, spawnBurst]
  );

  const handleWaveFlag = useCallback(
    (levelId: string, event: React.MouseEvent<HTMLButtonElement>) => {
      soundFX.playFlagpole();
      setJumpTrigger((n) => n + 1);
      const { x, y } = getEventCoords(event);
      spawnBurst(x, y, content.ui.popups.flagBonus, 'star');
      setWavedFlags((prev) => {
        if (!prev[levelId]) {
          setBonusScore((s) => s + 50);
        }
        return { ...prev, [levelId]: true };
      });
    },
    [content.ui.popups.flagBonus, spawnBurst]
  );

  const handleJump = useCallback(() => {
    soundFX.playJump();
  }, []);

  const handleUIJump = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      soundFX.playJump();
      setJumpTrigger((n) => n + 1);
      setBonusScore((s) => s + 10);
      const { x, y } = getEventCoords(event);
      spawnBurst(x, y - 16, content.ui.popups.jumpBoing, 'coin');
    },
    [content.ui.popups.jumpBoing, spawnBurst]
  );

  const handleCelebrate = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      soundFX.playOneUp();
      setJumpTrigger((n) => n + 1);
      setBonusScore((s) => s + 50);
      const { x, y } = getEventCoords(event);
      spawnBurst(x, y - 20, content.ui.popups.fireworks, 'fireworks');
      if (typeof window !== 'undefined') {
        window.setTimeout(() => {
          spawnBurst(window.innerWidth * 0.3, window.innerHeight * 0.32, '★', 'fireworks');
        }, 160);
        window.setTimeout(() => {
          spawnBurst(window.innerWidth * 0.72, window.innerHeight * 0.28, '★', 'fireworks');
        }, 320);
      }
    },
    [content.ui.popups.fireworks, spawnBurst]
  );

  // Keep wavedFlags referenced cleanly
  void wavedFlags;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Game-style Loading Screen */}
      <LoadingScreen
        content={content}
        onComplete={() => {}}
        onSkipToContent={handleSkipIntro}
      />

      {/* Global Interactive Mario Particle & Score Burst Layer */}
      <ParticleOverlay bursts={bursts} disabled={prefersReducedMotion} />

      {/* Warp Pipe Section Transition Overlay */}
      <WarpTransition
        activeLabel={warpLabel}
        transitLabel={content.ui.warp.transitLabel}
      />

      {/* Konami Code Star Power Notification */}
      <KonamiBanner
        active={starPower}
        title={content.ui.konami.title}
        subtitle={content.ui.konami.subtitle}
      />

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
            jumpTrigger={jumpTrigger}
            sceneLabels={content.ui.scene}
            hitServices={hitServices}
            collectedSkills={collectedSkills}
            onHitServiceBlock={(id) => handleHitServiceBlock(id)}
            onCollectSkill={(id) => handleCollectSkill(id)}
            onJump={handleJump}
            onJumpToSection={handleWarpNavigate}
          />
        </Suspense>
      )}

      {/* Fixed Arcade Game HUD & Menu Navigation (with ID/EN Switcher) */}
      <GameHUD
        content={content}
        language={language}
        score={totalScore}
        coinsCount={coinsCount}
        activeWorld={activeWorld}
        activeSectionId={activeSectionId}
        scrollProgress={scrollProgress}
        soundEnabled={soundEnabled}
        classicMode={classicMode}
        starPower={starPower}
        onChangeLanguage={handleChangeLanguage}
        onToggleSound={handleToggleSound}
        onToggleClassicMode={handleToggleClassicMode}
        onNavigate={handleWarpNavigate}
      />

      {/* Floating Interactive Mario Quick-Action Dock & Mini World Map */}
      <FloatingControls
        content={content}
        scrollProgress={scrollProgress}
        activeSectionId={activeSectionId}
        classicMode={classicMode}
        onJump={handleUIJump}
        onCelebrate={handleCelebrate}
        onNavigate={handleWarpNavigate}
      />

      {/* Semantic Real HTML Portfolio Content (SEO + Screen Reader + Recruiter Friendly) */}
      <main id="main-content" className="relative z-10">
        <TitleHero
          content={content}
          gameStarted={gameStarted}
          onPressStart={handlePressStart}
          onNavigate={handleWarpNavigate}
          onStatBonus={handleStatBonus}
        />

        <ServicesSection
          content={content}
          hitServices={hitServices}
          onHitService={handleHitServiceBlock}
          onHitAll={handleHitAllServices}
        />

        <SkillsSection
          content={content}
          collectedSkills={collectedSkills}
          onCollectSkill={handleCollectSkill}
          onCollectAll={handleCollectAllSkills}
        />

        <ExperienceSection content={content} onWaveFlag={handleWaveFlag} />

        <ContactSection
          content={content}
          onInteractSound={() => soundFX.playCoin()}
          onCelebrate={handleCelebrate}
        />
      </main>
    </div>
  );
}
