import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, FastForward, FileText, Mail, Gamepad2 } from 'lucide-react';
import { PROFILE, STATS } from '../../data/portfolio';

interface TitleHeroProps {
  gameStarted: boolean;
  onPressStart: () => void;
  onNavigate: (sectionId: string) => void;
}

function AnimatedStatNumber({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let raf = 0;
    const duration = 900;
    const start = performance.now();

    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return (
    <span>
      {val}
      {suffix}
    </span>
  );
}

export function TitleHero({ gameStarted, onPressStart, onNavigate }: TitleHeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-32 sm:pt-36 pb-16 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-6 items-center">
          {/* Main Title Screen Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 toon-panel p-6 sm:p-8 relative overflow-hidden"
          >
            {/* Top Mario Brick Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-2.5 bg-mario-red border-b-2 border-mario-ink" />

            {/* Status Badge + Title */}
            <div className="flex flex-wrap items-center gap-2.5 mt-1 mb-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCFCE7] border-2 border-mario-ink font-arcade text-xs font-bold text-[#14532D]">
                <span className="w-2.5 h-2.5 rounded-full bg-mario-pipe animate-pulse" />
                {PROFILE.statusBadge}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-mario-coin/30 border-2 border-mario-ink font-arcade text-xs font-bold text-mario-ink">
                {PROFILE.title}
              </span>
            </div>

            <p className="font-pixel text-xs sm:text-sm text-mario-red mb-2">
              PLAYER 1 · {PROFILE.name.toUpperCase()}
            </p>

            <h1 className="font-pixel text-2xl sm:text-4xl lg:text-[2.6rem] leading-[1.35] text-mario-ink mb-4">
              {PROFILE.headline}
            </h1>

            <p className="text-base sm:text-lg text-slate-700 font-semibold leading-relaxed max-w-2xl mb-6">
              {PROFILE.description}
            </p>

            {/* Primary Game & Recruiter CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              {!gameStarted ? (
                <button
                  type="button"
                  onClick={onPressStart}
                  className="toon-btn-gold !px-6 !py-3 !text-sm animate-bounce"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>PRESS START</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="toon-btn-green !px-6 !py-3 !text-sm"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>ENTER WORLD 1-1 →</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onNavigate('experience')}
                className="toon-btn-red !px-5 !py-3"
              >
                <FileText className="w-4 h-4" />
                <span>{PROFILE.ctaPrimary.label}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="toon-btn-white !px-5 !py-3"
              >
                <Mail className="w-4 h-4" />
                <span>{PROFILE.ctaSecondary.label}</span>
              </button>
            </div>

            {/* Recruiter Fast-Track + Controls Legend */}
            <div className="mt-5 pt-4 border-t-2 border-dashed border-mario-ink/20 flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-slate-600">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-1 rounded bg-slate-100 border border-mario-ink/30 font-arcade text-[11px] text-mario-ink">
                  SCROLL
                </span>
                <span>to explore World</span>
                <span className="hidden sm:inline text-slate-400">·</span>
                <span className="hidden sm:inline px-2 py-1 rounded bg-slate-100 border border-mario-ink/30 font-arcade text-[11px] text-mario-ink">
                  ← → / SPACE
                </span>
                <span className="hidden sm:inline">to run &amp; jump</span>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('experience')}
                className="inline-flex items-center gap-1 text-mario-skyDark hover:underline font-arcade text-xs min-h-[44px] px-2 cursor-pointer"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Skip to Content</span>
              </button>
            </div>
          </motion.div>

          {/* Right Spacer (leaves clean room for 3D AK Character & Pipe on desktop) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col items-end justify-end self-end pb-4 pointer-events-none">
            <div className="toon-panel px-4 py-3 bg-mario-ink/90 text-white border-white max-w-[260px]">
              <div className="font-pixel text-[10px] text-mario-coin mb-1">TIP · WORLD 1-0</div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Hit <strong>? Blocks</strong> for Services, collect <strong>10 Coins</strong> in Skills, or try the classic <strong>Konami Code</strong>!
              </p>
            </div>
          </div>
        </div>

        {/* SCOREBOARD STATS BAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 mt-6"
          aria-label="Key Career Statistics"
        >
          {STATS.map((stat, idx) => {
            const colors = ['bg-mario-coin', 'bg-mario-red text-white', 'bg-mario-pipe text-white', 'bg-mario-skyDark text-white'];
            return (
              <div
                key={stat.id}
                className="toon-panel p-4 flex flex-col justify-between hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2 py-0.5 rounded-md border-2 border-mario-ink font-pixel text-[9px] ${colors[idx % colors.length]}`}
                  >
                    +STAT
                  </span>
                  <span className="font-pixel text-xs text-mario-coinDark" aria-hidden="true">
                    ★
                  </span>
                </div>
                <div className="font-pixel text-2xl sm:text-3xl text-mario-ink">
                  <AnimatedStatNumber target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-arcade text-xs sm:text-sm font-bold text-slate-700 mt-1.5">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
