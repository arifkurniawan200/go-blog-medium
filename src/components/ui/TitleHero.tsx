import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, FastForward, FileText, Mail, Gamepad2, Sparkles } from 'lucide-react';
import type { LocalizedPortfolioContent } from '../../data/i18n';

interface TitleHeroProps {
  content: LocalizedPortfolioContent;
  gameStarted: boolean;
  onPressStart: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onNavigate: (sectionId: string) => void;
  onStatBonus: (event: React.MouseEvent<HTMLButtonElement>) => void;
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

export function TitleHero({
  content,
  gameStarted,
  onPressStart,
  onNavigate,
  onStatBonus
}: TitleHeroProps) {
  const [tipIndex, setTipIndex] = useState(0);
  const tips = content.ui.hero.tips;
  const currentTip = tips[tipIndex % tips.length];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-32 sm:pt-36 pb-16 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-6 items-center">
          {/* Main Title Screen Card */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="lg:col-span-8 toon-panel p-6 sm:p-8 relative overflow-hidden"
          >
            {/* Top Mario Brick Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-2.5 bg-mario-red border-b-2 border-mario-ink" />

            {/* Status Badge + Title */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08, duration: 0.35 }}
              className="flex flex-wrap items-center gap-2.5 mt-1 mb-4"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCFCE7] border-2 border-mario-ink font-arcade text-xs font-bold text-[#14532D]">
                <span className="w-2.5 h-2.5 rounded-full bg-mario-pipe animate-pulse" />
                {content.profile.statusBadge}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-mario-coin/30 border-2 border-mario-ink font-arcade text-xs font-bold text-mario-ink">
                {content.profile.title}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.35 }}
              className="font-pixel text-xs sm:text-sm text-mario-red mb-2"
            >
              {content.ui.hero.playerPrefix} · {content.profile.name.toUpperCase()}
            </motion.p>

            <motion.h1
              key={`headline-${content.lang}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="font-pixel text-2xl sm:text-4xl lg:text-[2.6rem] leading-[1.35] text-mario-ink mb-4"
            >
              {content.profile.headline}
            </motion.h1>

            <motion.p
              key={`desc-${content.lang}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="text-base sm:text-lg text-slate-700 font-semibold leading-relaxed max-w-2xl mb-6"
            >
              {content.profile.description}
            </motion.p>

            {/* Primary Game & Recruiter CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              {!gameStarted ? (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.06, y: -3 }}
                  whileTap={{ scale: 0.94, y: 2 }}
                  onClick={onPressStart}
                  className="toon-btn-gold toon-shimmer animate-pulse-ring !px-6 !py-3 !text-sm"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{content.ui.hero.pressStart}</span>
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('services')}
                  className="toon-btn-green toon-shimmer !px-6 !py-3 !text-sm"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>{content.ui.hero.enterWorld}</span>
                </motion.button>
              )}

              <motion.button
                type="button"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('experience')}
                className="toon-btn-red !px-5 !py-3"
              >
                <FileText className="w-4 h-4" />
                <span>{content.profile.ctaPrimary.label}</span>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('contact')}
                className="toon-btn-white !px-5 !py-3"
              >
                <Mail className="w-4 h-4" />
                <span>{content.profile.ctaSecondary.label}</span>
              </motion.button>
            </div>

            {/* Recruiter Fast-Track + Controls Legend */}
            <div className="mt-5 pt-4 border-t-2 border-dashed border-mario-ink/20 flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-slate-600">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-1 rounded bg-slate-100 border border-mario-ink/30 font-arcade text-[11px] text-mario-ink">
                  {content.ui.hero.scrollBadge}
                </span>
                <span>{content.ui.hero.scrollDesc}</span>
                <span className="hidden sm:inline text-slate-400">·</span>
                <span className="hidden sm:inline px-2 py-1 rounded bg-slate-100 border border-mario-ink/30 font-arcade text-[11px] text-mario-ink">
                  {content.ui.hero.keysBadge}
                </span>
                <span className="hidden sm:inline">{content.ui.hero.keysDesc}</span>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('experience')}
                className="inline-flex items-center gap-1 text-mario-skyDark hover:underline font-arcade text-xs min-h-[44px] px-2 cursor-pointer"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>{content.ui.skipToContent}</span>
              </button>
            </div>
          </motion.div>

          {/* Right Interactive Tip Card (leaves room for 3D AK Character & Pipe on desktop) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col items-end justify-end self-end pb-4 pointer-events-none">
            <motion.button
              type="button"
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setTipIndex((i) => (i + 1) % tips.length)}
              className="pointer-events-auto text-left toon-panel px-4 py-3.5 bg-mario-ink/92 text-white border-white max-w-[270px] cursor-pointer"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-pixel text-[10px] text-mario-coin flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {content.ui.hero.tipHeader}
                </span>
                <span className="font-pixel text-[9px] text-slate-400">
                  {(tipIndex % tips.length) + 1}/{tips.length}
                </span>
              </div>
              <div className="min-h-[58px]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`${content.lang}-${tipIndex}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-slate-200 leading-relaxed"
                  >
                    {currentTip}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="mt-2 font-arcade text-[10px] text-mario-coin/90">
                {content.ui.hero.tipNextHint}
              </div>
            </motion.button>
          </div>
        </div>

        {/* INTERACTIVE SCOREBOARD STATS BAR */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 mt-6"
          aria-label="Key Career Statistics"
        >
          {content.stats.map((stat, idx) => {
            const colors = [
              'bg-mario-coin text-mario-ink',
              'bg-mario-red text-white',
              'bg-mario-pipe text-white',
              'bg-mario-skyDark text-white'
            ];
            return (
              <motion.button
                key={stat.id}
                type="button"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + idx * 0.07, type: 'spring', stiffness: 280, damping: 20 }}
                whileHover={{ y: -6, scale: 1.03, rotate: idx % 2 === 0 ? -0.8 : 0.8 }}
                whileTap={{ scale: 0.94, y: 0 }}
                onClick={onStatBonus}
                title={content.ui.hero.statClickHint}
                className="toon-panel p-4 flex flex-col justify-between text-left cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2 py-0.5 rounded-md border-2 border-mario-ink font-pixel text-[9px] ${colors[idx % colors.length]}`}
                  >
                    {content.ui.hero.statBadge}
                  </span>
                  <span
                    className="font-pixel text-xs text-mario-coinDark inline-block transition-transform duration-300 group-hover:rotate-180 group-hover:scale-125"
                    aria-hidden="true"
                  >
                    ★
                  </span>
                </div>
                <div className="font-pixel text-2xl sm:text-3xl text-mario-ink">
                  <AnimatedStatNumber target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-arcade text-xs sm:text-sm font-bold text-slate-700 mt-1.5">
                  {stat.label}
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
